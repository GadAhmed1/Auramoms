import express from "express";
import {addProduct, listProduct, removeProduct } from "../controllers/ProductCotroller.js";

const productRouter = express.Router();


productRouter.post("/add", addProduct);
productRouter.get("/list", listProduct);


productRouter.delete("/remove", removeProduct);

export default productRouter;