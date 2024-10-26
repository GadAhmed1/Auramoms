import express from "express";
import { addtoCart, getCart, removeCart } from "../controllers/cartController.js";
import { checkToken } from "../middleware/auth.js";


const cartRouter = express.Router();

cartRouter.post("/add",checkToken, addtoCart);
cartRouter.delete("/remove",checkToken, removeCart);
cartRouter.get("/get",checkToken, getCart);

export default cartRouter;
