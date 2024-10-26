import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    }],
    amount: { type: Number, required: true },
    address: { 
        street: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true }
    },
    status: { type: String, default: "Product Loading" },
    date: { type: Date, default: Date.now },
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Paid', 'Failed'], 
        default: 'Pending' 
    }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
