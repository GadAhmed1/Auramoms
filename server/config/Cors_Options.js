import AllowedOrigins from "./AllowedOrigins.js"; // استيراد قائمة النطاقات المسموح لها بالوصول

// إعداد خيارات الـ CORS
const corsOptions = {
  origin: (origin, callback) => {
    // التحقق مما إذا كان النطاق المرسل في الطلب موجود في قائمة النطاقات المسموح بها
    if (AllowedOrigins.AllowedOrigins.indexOf(origin) !== -1 || !origin) {
      // إذا كان النطاق مسموحاً أو لم يكن هناك أصل (الطلبات المحلية)
      callback(null, true); // السماح بالوصول
    } else {
      // إذا كان النطاق غير مسموح
      callback(new Error("Not allowed by CORS")); // رفض الطلب بسبب سياسة الـ CORS
    }
  },
  credentials: 'include', // السماح بإرسال الكوكي والمعلومات المعتمدة في الطلبات عبر CORS
  optionsSuccessStatus: 200, // حالة النجاح للطلبات OPTIONS
};

export default (corsOptions); // تصدير إعدادات CORS لاستخدامها في أماكن أخرى
