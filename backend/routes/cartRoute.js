import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import { checkToken } from "../middleware/auth.js";


const cartRouter = express.Router();

cartRouter.post("/add",checkToken, addToCart);
cartRouter.delete("/remove",checkToken, removeFromCart);
cartRouter.get("/get",checkToken, getCart);

export default cartRouter;
