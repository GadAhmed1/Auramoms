


import orderModel from "../models/ordermodel.js"; // استيراد نموذج الطلب
import paypal from '@paypal/checkout-server-sdk'; // استيراد مكتبة PayPal
import Stripe from 'stripe'; // استيراد مكتبة Stripe
import userModel from "../models/userModel.js"; // استيراد نموذج المستخدم
import dotenv from "dotenv";
dotenv.config();
// إعداد بيئة PayPal باستخدام البيئة الحية
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// إعداد Stripe باستخدام المفتاح السري
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// دالة لإنشاء طلب جديد باستخدام PayPal أو Stripe
const placeOrder = async (req, res) => {
    const { userId, items, amount, address, paymentMethod } = req.body;

    if (!userId || !items || !amount || !address || !paymentMethod) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        let order;

        if (paymentMethod === 'paypal') {
            const request = new paypal.orders.OrdersCreateRequest();
            request.prefer('return=representation');
            request.requestBody({
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: amount
                    }
                }]
            });
            order = await client.execute(request); // إرسال الطلب إلى PayPal

        } else if (paymentMethod === 'stripe') {
            order = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100), // Stripe يتعامل بالسنتات
                currency: 'USD',
                payment_method_types: ['card'],
            });
        } else {
            return res.status(400).json({ success: false, message: "Invalid payment method" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentStatus: 'Pending',
            paypalOrderId: paymentMethod === 'paypal' ? order.result.id : null,
            stripeOrderId: paymentMethod === 'stripe' ? order.id : null,
        });

        await newOrder.save();

        user.orders.push(newOrder._id);
        await user.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} }, { new: true });

        res.json({
            success: true,
            id: paymentMethod === 'paypal' ? order.result.id : order.id,
            approveLink: order.result.links.find(link => link.rel === 'approve').href,
            clientSecret: paymentMethod === 'stripe' ? order.client_secret : null,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error in placeOrder", error });
    }
};

// دالة للتحقق من نجاح عملية الدفع لـ PayPal أو Stripe
const verifyOrder = async (req, res) => {
    const { orderID, paymentMethod } = req.body;

    try {
        let capture;

        if (paymentMethod === 'paypal') {
            const request = new paypal.orders.OrdersCaptureRequest(orderID);
            capture = await client.execute(request);
        } else if (paymentMethod === 'stripe') {
            capture = await stripe.paymentIntents.retrieve(orderID);
            if (capture.status !== 'succeeded') {
                return res.status(400).json({ success: false, message: "Payment not completed" });
            }
        } else {
            return res.status(400).json({ success: false, message: "Invalid payment method" });
        }

        const order = await orderModel.findOne({
            $or: [
                { paypalOrderId: paymentMethod === 'paypal' ? orderID : null },
                { stripeOrderId: paymentMethod === 'stripe' ? orderID : null }
            ]
        });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.paymentStatus = 'Paid';
        await order.save();

        res.json({ success: true, status: 'success', details: capture });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error verifying order', error });
    }
};

// دالة لجلب جميع الطلبات الخاصة بمستخدم معين
const userOrders = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        const orders = await orderModel.find({ userId });
        const paidOrders = orders.filter(order => order.paymentStatus === 'Paid');
        const unpaidOrders = orders.filter(order => order.paymentStatus !== 'Paid');

        res.json({
            success: true,
            paidOrders,
            unpaidOrders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error in userOrders", error: err });
    }
};

const allOrders = async (req, res) => {
    try {
        // جلب جميع الطلبات من قاعدة البيانات
        const orders = await orderModel.find();

        // تقسيم الطلبات إلى مدفوعة وغير مدفوعة
        const paidOrders = orders.filter(order => order.paymentStatus === 'Paid');
        const unpaidOrders = orders.filter(order => order.paymentStatus !== 'Paid');

        // إرجاع جميع الطلبات مصنفة
        res.json({
            success: true,
            paidOrders,
            unpaidOrders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error in allOrders", error: err });
    }
}

export { placeOrder, verifyOrder, userOrders  , allOrders};
