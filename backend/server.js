import express from "express"; // استيراد مكتبة Express لإنشاء تطبيق ويب
import dotenv from "dotenv"; // استيراد dotenv لتحميل المتغيرات البيئية من ملف .env
import { connection } from "./config/db.js"; // استيراد دالة الاتصال بقاعدة البيانات
import cors from "cors"; // استيراد CORS للتعامل مع طلبات المصادر المتعددة
import cookieParser from "cookie-parser"; // استيراد cookie-parser لتحليل الكوكيز في الطلبات
import session from 'express-session'; // استيراد express-session لإدارة الجلسات
import helmet from "helmet"; // استيراد helmet لتعزيز الأمان عبر ضبط رؤوس HTTP
import morgan from "morgan"; // استيراد morgan لتسجيل الطلبات HTTP
import compression from 'compression'; // استيراد compression لضغط الردود HTTP لتسريع الأداء
import { fileURLToPath } from 'url'; // استيراد وحدة لتحليل مسار URL الحالي
import { dirname, join } from 'path'; // استيراد dirname و join من مكتبة path للتعامل مع المسارات
import path from "path"; // استيراد مكتبة path للتعامل مع مسارات الملفات
import './config/passport.js';
// استيراد المسارات
import userROUTE from "./routes/userRoute.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// استيراد middleware للتحقق من التوكن
import { checkToken } from "./middleware/auth.js";
import corsOptions from "./config/Cors_Options.js";
import passport from "passport";
import router_google from './routes/auth.js';
import userModel from "./models/userModel.js";
dotenv.config(); // تحميل القيم من .env إلى process.env

// إنشاء تطبيق Express
const app = express();
const PORT = 3000;

// إعداد الاتصال بقاعدة البيانات
connection();

// إعداد الجلسات
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// إعدادات الأمان والأداء
app.use(helmet()); // استخدام helmet لضبط رؤوس HTTP لزيادة الأمان
app.use(compression()); // استخدام compression لضغط الردود لتقليل حجم البيانات المنقولة
app.use(morgan("common")); // استخدام morgan لتسجيل الطلبات HTTP بالتنسيق "common"

// إعدادات تحليل الطلبات
app.use(express.json()); // تمكين تحليل JSON من الجسم المرسل في الطلبات
app.use(cookieParser()); // تمكين تحليل الكوكيز من الطلبات
app.use(cors(corsOptions)); // تمكين CORS باستخدام الخيارات المخصصة المحددة في corsOptions

// إعداد Passport.js (إذا كنت تستخدمه)
app.use(passport.initialize());
app.use(passport.session());

// الحصول على مسار الملف والمجلد الحالي
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// إعدادات المسارات الثابتة
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// إعداد المسارات الخاصة بالتطبيق
app.use("/users", userROUTE);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);
app.use('/auth', router_google);
// مسار لوحة التحكم
app.get('/dashboard', (req, res) => {
  // تحقق مما إذا كان المستخدم مصادقًا عليه
  if (req.isAuthenticated()) {
    res.send(`<h1>Welcome, ${req.user.firstname} ${req.user.lastname}!</h1>
                <p>Your email: ${req.user.email}</p>
                <a href="/auth/logout">Logout</a>`);
  } else {
    res.redirect('/auth/google');
  }
});

// app.delete("/delete-all-users", async (req, res) => {
//   try {
//     const result = await userModel.deleteMany({});
//     res.status(200).json({
//       message: "All users deleted successfully",
//       deletedCount: result.deletedCount,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to delete users" });
//   }
// });

// مسار محمي باستخدام checkToken middleware

// app.delete("/delete-google-id", async (req, res) => {
//   try {
//     // إزالة الحقل googleId من جميع المستندات في قاعدة البيانات
//     await userModel.updateMany({}, { $unset: { googleId: "" } });

//     // حذف المؤشر الفريد على googleId إذا كان موجودًا
//     await mongoose.connection.db.collection("users").dropIndex("googleId_1");

//     return res.status(200).json({
//       success: true,
//       message: "googleId has been removed from all documents and index dropped",
//     });
//   } catch (error) {
//     console.error("Error removing googleId:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while removing googleId.",
//     });
//   }
// });
app.get('/protected', checkToken, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});


// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
