

import express from "express";
import dotenv from "dotenv";
import { connection } from "./config/db.js"; // استيراد دالة الاتصال بقاعدة البيانات
import cors from "cors"; // استيراد CORS للتعامل مع الطلبات من مصادر مختلفة
import cookieParser from "cookie-parser"; // تحليل الكوكيز من الطلبات الواردة
import userROUTE from "./routes/userRoute.js"; // استيراد مسارات المستخدمين
import corsOptions from "./config/Cors_Options.js"; // استيراد إعدادات CORS
import path from "path"; // للتعامل مع المسارات الخاصة بالملفات والمجلدات
import { fileURLToPath } from 'url'; // وحدة للحصول على اسم الملف في نظام ES modules
import { dirname } from 'path'; // وحدة للحصول على اسم المجلد في نظام ES modules
import helmet from "helmet"; // تعزيز الأمان عن طريق ضبط الرؤوس الخاصة بـ HTTP
import morgan from "morgan"; // أداة لتسجيل الطلبات HTTP
import app_jwt from "./routes/tokenRoute.js"; // استيراد المسارات للتعامل مع الرموز المميزة JWT

// الحصول على مسار الملف والمجلد الحالي في نظام ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// تحميل المتغيرات البيئية من ملف .env
dotenv.config();

const app = express(); // تهيئة تطبيق Express
const PORT = 4000; // تحديد المنفذ الذي سيستمع عليه الخادم

// الاتصال بقاعدة البيانات باستخدام الإعدادات من db.js
connection();

// إعدادات Middleware (البرامج الوسيطة)
app.use(express.json()); // تحليل الجسم الخاص بالطلبات التي تحتوي على JSON
app.use(cors(corsOptions)); // تمكين CORS مع خيارات محددة (مثل السماح بالطلبات من مصادر معينة)
app.use(cookieParser()); // تحليل الكوكيز من الطلبات
app.use(helmet()); // تعزيز الأمان من خلال ضبط رؤوس HTTP
app.use(morgan("common")); // تسجيل الطلبات HTTP باستخدام Morgan بالتنسيق "common"

// مسار للتعامل مع العمليات المتعلقة بالرموز المميزة JWT
app.use("/tokens", app_jwt);

// مسار للتعامل مع العمليات المتعلقة بالمستخدمين
app.use("/users", userROUTE);

// التعامل مع أي مسارات غير معرفة (404 Not Found)
app.all("*", (req, res) => {
    res.status(404); // تعيين كود الحالة إلى 404
    if (req.accepts("html")) {
        // إذا كان العميل يقبل HTML، يتم إرسال صفحة 404 المخصصة
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        // إذا كان العميل يفضل JSON، يتم إرسال استجابة JSON
        res.json("404 NOT FOUND");
    } else {
        // إذا كان العميل يقبل النص العادي، يتم إرسال استجابة نصية
        res.type("txt").send("404 NOT FOUND");
    }
});

// تشغيل الخادم والاستماع على المنفذ المحدد
app.listen(PORT, () => {
    console.log(`Server Running on${PORT}`);
});


// app.delete("/api/users", async (req, res) => {
//     try {
//         // حذف جميع المستخدمين من قاعدة البيانات
//         const result = await userModel.deleteMany({});
//         res.json({ message: "All users deleted successfully", result });
//     } catch (error) {
//         // في حال حدوث خطأ أثناء العملية
//         res.status(500).json({ message: "Failed to delete users", error: error.message });
//     }
// }); لمسح اليوزرز كلهم
