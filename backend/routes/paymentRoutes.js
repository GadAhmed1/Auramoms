import express from "express";
import { checkToken } from "../middleware/auth.js";
import paymentPost from "../controllers/paymentController.js";

const paymentRouter = express.Router();


paymentRouter.post("/proccess", checkToken, paymentPost);

export default paymentRouter;