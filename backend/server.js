import express from "express";
import dotenv from "dotenv";
import { connection } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import userROUTE from "./routes/userRoute.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import { checkToken } from "./middleware/auth.js";
import corsOptions from "./config/Cors_Options.js";
import userModel from "./models/userModel.js";
import paymentRouter from "./routes/paymentRoutes.js";
import Payment from "./models/payment.js";

dotenv.config();

const app = express();
const PORT = 3000;

connection();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(helmet());
app.use(compression());
app.use(morgan("common"));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/users", userROUTE);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/payment", paymentRouter);

app.delete("/deleteAllUsers", async (req, res) => {
  try {
    await userModel.deleteMany({});
    res.status(200).json({ success: true, message: "All users deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete users", error: error.message });
  }
});

app.delete("/deletepayments", async (req, res) => {
  try {
    const result = await Payment.deleteMany({});
    res.status(200).json({
      success: true,
      message: "All payments have been deleted.",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete payments.",
      error: error.message,
    });
  }
});

app.get("/protected", checkToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
