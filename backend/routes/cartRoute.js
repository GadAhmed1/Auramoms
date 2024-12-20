import express from "express";
import { addtoCart, removeCart, getCart } from "../controllers/cartController.js";
import { checkToken } from "../middleware/auth.js";


const cartRouter = express.Router();

cartRouter.post("/add",checkToken, addtoCart);
cartRouter.post("/remove",checkToken, removeCart);
cartRouter.post("/get",checkToken, getCart);

export default cartRouter;
