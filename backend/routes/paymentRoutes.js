import express from "express";
import { checkToken } from "../middleware/auth.js";
import {paymentPost , getAllPayments} from "../controllers/paymentController.js";

const paymentRouter = express.Router();


paymentRouter.post("/proccess", checkToken, paymentPost);
paymentRouter.get("/allPayments", getAllPayments);

export default paymentRouter;