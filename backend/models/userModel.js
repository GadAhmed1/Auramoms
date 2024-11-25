import mongoose from "mongoose";

// Create a new Mongoose schema for the user model
const userSchema = new mongoose.Schema({
    // Define the properties of the user document
    firstname: { type: String, required: true }, // Name field, required
    lastname: { type: String, required: true }, // Name field, required
    email: { type: String, required: true, uniqe: true }, // Email field, required
    password: { type: String, required: true }, // Password field, required
    country: { type: String, required: true }, // Password field, required
    phone: { type: Number, required: true }, // Password field, required
    cartData: { type: Object, default: {} }, // Cart data field, default to an empty object
    favorites: { type: Object, default: {} }, // Cart data field, default to an empty object
    // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'order' }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true });

// Get the existing user model or create a new one if it doesn't exist
const userModel = mongoose.models.user || mongoose.model("Users", userSchema);

// Export the user model for use in other parts of the application
export default userModel;