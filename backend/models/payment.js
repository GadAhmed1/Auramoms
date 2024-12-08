import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    totalAmount: { type: Number, required: true },
    payerInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        country: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
        },
    },
    items: [
        {
            productID: { type: mongoose.Schema.Types.ObjectId },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    paymentStatus: {
        type: String, required: true,
        enum: ['pending', 'completed', 'failed', 'refunded', 'canceled'],
        default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("order", paymentSchema);

export default Payment;
