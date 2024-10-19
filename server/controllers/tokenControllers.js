import jwt from "jsonwebtoken"; // استيراد مكتبة JSON Web Token للتعامل مع التوكنات
import dotenv from "dotenv"; // استيراد مكتبة dotenv لتحميل المتغيرات البيئية من ملف .env
dotenv.config(); // تحميل المتغيرات البيئية

// دالة لإنشاء Access Token بناءً على معرف المستخدم
const createAccessToken = (id) => {
    // التحقق من وجود سر التشفير في المتغيرات البيئية
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables"); // في حال عدم وجود سر التشفير
    }
    // إنشاء وتوقيع Access Token باستخدام المعرف وسر التشفير، وصلاحيته 20 دقيقة
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "20m" });
};

// دالة لإنشاء Refresh Token بناءً على معرف المستخدم
const createRefreshToken = (id) => {
    // التحقق من وجود سر التشفير الخاص بالـ Refresh Token في المتغيرات البيئية
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("REFRESH_TOKEN_SECRET is not defined in environment variables"); // في حال عدم وجود سر التشفير
    }
    // إنشاء وتوقيع Refresh Token باستخدام المعرف وسر التشفير، وصلاحيته 20 يومًا
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "20d" });
};

// دالة لتحديث Access Token باستخدام Refresh Token
const refreshAccessToken = (refreshToken) => {
    // التحقق من وجود سر التشفير الخاص بالـ Refresh Token في المتغيرات البيئية
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("REFRESH_TOKEN_SECRET is not defined in environment variables"); // في حال عدم وجود سر التشفير
    }

    let decoded; // متغير لحفظ البيانات المستخرجة من الـ Refresh Token
    try {
        // التحقق من صلاحية الـ Refresh Token واستخراج المعرف
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        // في حالة حدوث خطأ (مثل انتهاء الصلاحية أو كون التوكن غير صالح)
        throw new Error("Invalid or expired refresh token");
    }

    // توليد Access Token جديد باستخدام المعرف المستخرج من Refresh Token
    return createAccessToken(decoded._id);
}

// دالة لتجديد الـ Access Token بناءً على الطلب
const refreshToken = (req, res) => {
    console.log(req.body); // طباعة محتويات الطلب لأغراض التصحيح
    const { refreshToken } = req.body; // استخراج الـ Refresh Token من محتويات الطلب

    // في حال عدم وجود Refresh Token في الطلب
    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh Token is required" }); // إرجاع رسالة خطأ
    }

    try {
        // توليد Access Token جديد باستخدام Refresh Token المقدم
        const newAccessToken = refreshAccessToken(refreshToken);
        res.json({ accessToken: newAccessToken }); // إرجاع التوكن الجديد في الرد
    } catch (error) {
        // في حالة وجود خطأ أثناء توليد التوكن الجديد
        return res.status(403).json({ message: error.message });
    }
};

// تصدير الدوال لاستخدامها في أماكن أخرى في المشروع
export { createAccessToken, createRefreshToken, refreshAccessToken, refreshToken }
