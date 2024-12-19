import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, uniqe: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: Number, required: true },
    cartData: { type: Object, default:{}},
    favorites: { type: Object, default: {} },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'order' }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model("Users", userSchema);

export default userModel;
