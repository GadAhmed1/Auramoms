import AllowedOrigins from "./AllowedOrigins.js"; // استيراد قائمة النطاقات المسموح لها بالوصول

// إعداد خيارات الـ CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (AllowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log(callback(new Error("Not allowed by CORS")));

    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
export default corsOptions; // تصدير إعدادات CORS لاستخدامها في أماكن أخرى
