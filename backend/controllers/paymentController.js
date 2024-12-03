import Payment from "../models/payment.js";

const paymentPost = async (req, res) => {
    const {
        orderID,
        payerID,
        paymentID,
        paymentSource,
        billingToken,
        status,
        payer,
        purchase_units,
        create_time,
        update_time,
    } = req.body;

    try {
        const payment = new Payment({
            orderID,
            payerID,
            paymentID,
            paymentSource,
            billingToken,
            status,
            payer,
            purchase_units,
            create_time,
            update_time,
        });
        await payment.save();
        res.status(201).json({ message: 'Payment processed successfully', payment });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Failed to process payment', error });
    }
};

export default paymentPost;