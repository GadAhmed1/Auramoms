import Payment from "../models/payment.js";

const paymentPost = async (req, res) => {
  try {
    const { payerID, paymentID, orderID, totalAmount, payerInfo, items, paymentStatus } = req.body;

    const newOrder = await Payment.create({
      payerID,
      paymentID,
      orderID,
      totalAmount,
      payerInfo,
      items,
      paymentStatus,
    });

    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving order", error: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching payments", error: error.message });
  }
};

export { paymentPost, getAllPayments };
