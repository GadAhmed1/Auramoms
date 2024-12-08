import Payment from "../models/payment.js";

const paymentPost = async (req, res) => {
    try {
        const { payerID, paymentID, orderID, totalAmount, payerInfo, items, paymentStatus } = req.body;

        const newOrder = new Payment({
            payerID,
            paymentID,
            orderID,
            totalAmount,
            payerInfo,
            items,
            paymentStatus,
        });

        await newOrder.save();
        console.log("Order saved: ");
        console.log("Request body: ", req.body);


        res.status(200).json({ success: true, newOrder });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: 'Error saving order', error });
    }

};
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json({success: true ,  payments });
    } catch (error) {
        console.error("Error fetching payments: ", error);
        res.status(500).json({ message: 'Error fetching payments', error }); // في حال حدوث خطأ
    }
};



export { paymentPost, getAllPayments };
