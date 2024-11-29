import orderModel from "../models/ordermodel.js";
import paypal from "@paypal/checkout-server-sdk";
import Stripe from "stripe";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const createPaypalOrder = async (amount) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "GBP",
                    value: amount,
                },
            },
        ],
    });
    return await client.execute(request);
};

const createStripeOrder = async (amount) => {
    return await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "GBP",
        payment_method_types: ["card"],
    });
};

const placeOrder = async (req, res) => {
    const { userId, items, amount, paymentMethod } = req.body;

    if (!userId || !items || !amount || !paymentMethod) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const user = await userModel.findById(userId).select("orders cartData");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let paymentResponse, approveLink = null, clientSecret = null;

        switch (paymentMethod) {
            case "paypal":
                paymentResponse = await createPaypalOrder(amount);
                approveLink = paymentResponse.result.links.find((link) => link.rel === "approve")?.href || null;
                break;
            case "stripe":
                paymentResponse = await createStripeOrder(amount);
                clientSecret = paymentResponse.client_secret;
                break;
            default:
                return res.status(400).json({ success: false, message: "Invalid payment method" });
        }

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            paymentStatus: "Pending",
            status: "Product Loading",
            date: new Date(),
            ...(paymentMethod === "paypal" && { paypalOrderId: paymentResponse.result.id }),
            ...(paymentMethod === "stripe" && { stripeOrderId: paymentResponse.id }),
        });

        const savedOrder = await newOrder.save();

        user.orders.push(savedOrder._id);
        user.cartData = {};
        await user.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            orderId: savedOrder._id,
            approveLink,
            clientSecret,
        });
    } catch (error) {
        console.error("Error in placeOrder:", error);
        res.status(500).json({ success: false, message: "An error occurred while placing the order", error: error.message });
    }
};

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

const userOrders = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        const orders = await orderModel.find({ userId })
            .populate({
                path: 'items.productId',
                select: 'name image price'
            });

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
        const orders = await orderModel.find()
            .populate({
                path: 'items.productId', // ربط العناصر بالنموذج Product
                select: 'name image price' // اختيار الحقول التي تريد إرجاعها (الاسم، الصورة، السعر)
            });

        // تقسيم الطلبات إلى مدفوعة وغير مدفوعة
        const paidOrders = orders.filter(order => order.paymentStatus === 'Paid');
        const unpaidOrders = orders.filter(order => order.paymentStatus !== 'Paid');

        // إرجاع الطلبات مع تفاصيل المنتجات
        res.json({
            success: true,
            paidOrders,
            unpaidOrders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error in allOrders", error: err });
    }
};




export { placeOrder, verifyOrder, userOrders, allOrders };
