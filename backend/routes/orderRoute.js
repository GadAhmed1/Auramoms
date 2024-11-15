import express from "express";

import { checkToken } from "../middleware/auth.js";
import { allOrders, placeOrder, userOrders, verifyOrder } from "../controllers/ordersControllers.js";
import orderModel from "../models/ordermodel.js";

const orderRouter = express.Router();

orderRouter.post("/place", checkToken, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/allorders", allOrders);
orderRouter.get("/userOrders", checkToken, userOrders);
// orderRouter.delete('/deleteAllOrders', async (req, res) => {
//     try {
//         const result = await orderModel.deleteMany({});
//         res.status(200).json({
//             success: true,
//             message: 'All orders have been deleted successfully',
//             deletedCount: result.deletedCount
//         });
//     } catch (error) {
//         console.error('Error deleting orders:', error);
//         res.status(500).json({ success: false, message: 'Failed to delete orders', error });
//     }
// });
export default orderRouter;