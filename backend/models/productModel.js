import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    color: { type: String, required: false },
    image: { type: String, required: false }, 
    image2: { type: String, required: false }, 
    image3: { type: String, required: false }, 
    image4: { type: String, required: false }, 
    image5: { type: String, required: false }, 
});

const productModel = mongoose.model.product || mongoose.model("product", productSchema);
export default productModel;