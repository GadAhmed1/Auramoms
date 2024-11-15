import express from "express"; // استيراد مكتبة Express لإنشاء تطبيق ويب
import dotenv from "dotenv"; // استيراد dotenv لتحميل المتغيرات البيئية من ملف .env
import { connection } from "./config/db.js"; // استيراد دالة الاتصال بقاعدة البيانات
import cors from "cors"; // استيراد CORS للتعامل مع طلبات المصادر المتعددة
import cookieParser from "cookie-parser"; // استيراد cookie-parser لتحليل الكوكيز في الطلبات
import userROUTE from "./routes/userRoute.js"; // استيراد مسارات المستخدمين
import productRouter from "./routes/productRoutes.js"; // استيراد مسارات المنتجات
import cartRouter from "./routes/cartRoute.js"; // استيراد مسارات عربة التسوق
import { fileURLToPath } from 'url'; // استيراد وحدة لتحليل مسار URL الحالي
import { dirname, join } from 'path'; // استيراد dirname و join من مكتبة path للتعامل مع المسارات
import path from "path"; // استيراد مكتبة path للتعامل مع مسارات الملفات
import helmet from "helmet"; // استيراد helmet لتعزيز الأمان عبر ضبط رؤوس HTTP
import morgan from "morgan"; // استيراد morgan لتسجيل الطلبات HTTP
import compression from 'compression'; // استيراد compression لضغط الردود HTTP لتسريع الأداء
import { checkToken } from "./middleware/auth.js"; // استيراد middleware للتحقق من التوكن
import corsOptions from "./config/Cors_Options.js"; // استيراد خيارات CORS المحددة
import orderRouter from "./routes/orderRoute.js";

// الحصول على مسار الملف والمجلد الحالي
const __filename = fileURLToPath(import.meta.url); // الحصول على المسار الكامل للملف الحالي
const __dirname = dirname(__filename); // الحصول على المجلد الحالي الذي يحتوي على الملف

// تحميل المتغيرات البيئية من ملف .env
dotenv.config(); // تحميل القيم من .env إلى process.env

// تهيئة تطبيق Express
const app = express(); // إنشاء تطبيق Express
const PORT = 4000; // تحديد رقم المنفذ من المتغيرات البيئية أو تعيينه إلى 4000

// الاتصال بقاعدة البيانات
connection(); // استدعاء دالة الاتصال بقاعدة البيانات 

// Middleware - مقسمة لسهولة القراءة
// إعدادات الأمان والأداء
app.use(helmet()); // استخدام helmet لضبط رؤوس HTTP لزيادة الأمان
app.use(compression()); // استخدام compression لضغط الردود لتقليل حجم البيانات المنقولة
app.use(morgan("common")); // استخدام morgan لتسجيل الطلبات HTTP بالتنسيق "common"

// إعدادات تحليل الطلبات
app.use(express.json()); // تمكين تحليل JSON من الجسم المرسل في الطلبات
app.use(cookieParser()); // تمكين تحليل الكوكيز من الطلبات
app.use(cors(corsOptions)); // تمكين CORS باستخدام الخيارات المخصصة المحددة في corsOptions

// إعدادات المسارات الثابتة
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));// مسارات التطبيق
app.use("/users", userROUTE); // مسار للمستخدمين باستخدام userROUTE
app.use("/products", productRouter); // مسار للمنتجات باستخدام productRouter
app.use("/carts", cartRouter); // مسار لعربات التسوق باستخدام cartRouter
app.use("/orders", orderRouter);

// مسار محمي باستخدام checkToken middleware
app.get('/protected', checkToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user }); // رد JSON عند الوصول بنجاح مع بيانات المستخدم
});

app.all("*", (req, res) => {
    res.status(404); 
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html")); 
    } else if (req.accepts("json")) { 
        res.json({ message: "404 Not Found" });
    } else { 
        res.sendFile(path.join(__dirname, "views", "index.html"));
    }
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // بدء تشغيل الخادم وإعلام المستخدم بأن السيرفر يعمل
});



