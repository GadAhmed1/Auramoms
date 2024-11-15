import express from "express";
import { addProduct, fetchProductById, listProduct, removeProduct, updateProduct } from "../controllers/ProductCotroller.js";
import upload from "../controllers/upload.js";

const productRouter = express.Router();


productRouter.post('/add', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 }
]), addProduct);

productRouter.get("/list", listProduct);
productRouter.get("/:id", fetchProductById);

productRouter.put("/update/:id", updateProduct)
productRouter.post("/remove", removeProduct);

export default productRouter;