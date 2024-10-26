import express from "express";

import { checkToken } from "../middleware/auth.js";
import { allOrders, placeOrder, userOrders, verifyOrder } from "../controllers/ordersControllers.js";

const orderRouter = express.Router();

orderRouter.post("/place", checkToken, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/allorders", allOrders);
orderRouter.get("/userOrders", checkToken, userOrders);

export default orderRouter;