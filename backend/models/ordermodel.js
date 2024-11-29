import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({


    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true
    },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    amount: { type: Number, required: true, min: 0 },
    status: {
        type: String,
        enum: ['Product Loading', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Product Loading'
    },
    date: {
        type: Date,
        default: Date.now,
        index: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
