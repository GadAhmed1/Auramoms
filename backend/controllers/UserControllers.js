import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config(); // تحميل المتغيرات البيئية من ملف .env
const createAccessToken = (id) => {
    // التحقق من وجود سر التشفير في المتغيرات البيئية
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables"); // في حال عدم وجود سر التشفير
    }
    // إنشاء وتوقيع Access Token باستخدام المعرف وسر التشفير، وصلاحيته 20 دقيقة
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// دالة لتسجيل المستخدمين الجدد
const registerUSER = async (req, res) => {
    // تعريف نمط التحقق من صحة البريد الإلكتروني باستخدام تعبير منتظم
    const emailregex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

    // استخراج البيانات المرسلة من الطلب (body)
    const { firstname, lastname, email, password, country, phone } = req.body;

    try {
        // التحقق من أن جميع الحقول قد تم ملؤها
        if (!firstname || !lastname || !email || !password || !country || !phone) {
            return res.status(400).json({ message: "Please fill out all fields" });
        }

        // التحقق مما إذا كان البريد الإلكتروني مسجل بالفعل
        const exists = await userModel.findOne({ email }).exec();
        if (exists) {
            return res
                .status(400)
                .json({ success: false, message: "The user is already existing" });
        }

        // التحقق من صحة البريد الإلكتروني
        if (!validator.isEmail(email) || !emailregex.test(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Please enter a valid email!" });
        }

        // التحقق من أن كلمة المرور لا تقل عن 8 أحرف
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Password must be more than 8 characters",
                });
        }

        // إنشاء تشفير لكلمة المرور
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // إنشاء مستخدم جديد باستخدام النموذج الخاص بالمستخدم
        const newUser = new userModel({
            firstname,
            lastname,
            email,
            password: hashedPassword, // حفظ كلمة المرور المشفرة
            country,
            phone,
        });

        // حفظ المستخدم الجديد في قاعدة البيانات
        const user = await newUser.save();

        // إنشاء رموز الوصول والتحديث (Access Token & Refresh Token)
        const accessToken = createAccessToken(user._id);

        // تخزين رمز التحديث في الكوكي
        res.cookie("jwt", {
            httpOnly: true, // جعل الكوكي غير قابل للوصول من جهة العميل
            secure: true, // إرسال الكوكي فقط عبر HTTPS
            sameSite: "None", // السماح بالطلبات المتعددة المنشأ
        });

        // إرسال البيانات الخاصة بالمستخدم ورموز الوصول
        res.json({
            success: true,
            accessToken: accessToken,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: hashedPassword,
            country: user.country,
            phone: user.phone,
        });
    } catch (error) {
        // في حالة حدوث خطأ أثناء التسجيل
        console.log(error);
        res.status(500).json({ success: false, message: "Error in Register", error });
    }
};

// دالة لتسجيل الدخول
const loginUSER = async (req, res) => {
    // استخراج البيانات المرسلة من الطلب
    const { email, password } = req.body;

    try {
        // التحقق من أن جميع الحقول قد تم ملؤها
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // البحث عن المستخدم بالبريد الإلكتروني
        const user = await userModel.findOne({ email }).exec();
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "User not found!" });
        }

        // التحقق من صحة كلمة المرور
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, message: "The credentials are incorrect" });
        }

        // إنشاء رموز الوصول والتحديث (Access Token & Refresh Token)
        const accessToken = createAccessToken(user._id);

        // تخزين رمز التحديث في الكوكي
        res.cookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        // إرسال البيانات الخاصة بالمستخدم ورموز الوصول
        res.json({
            success: true,
            accessToken: accessToken,
            email: user.email,
        });
    } catch (error) {
        // في حالة حدوث خطأ أثناء تسجيل الدخول
        console.log(error);
        res.status(500).json({ success: false, message: "Error in Login", error });
    }
};

// دالة لجلب جميع المستخدمين
const getAllUsers = async (req, res) => {
    try {
        // البحث عن جميع المستخدمين مع إخفاء كلمة المرور
        const users = await userModel.find().select("-password").lean();
        if (!users.length) {
            return res.status(404).json({ message: "No users found" });
        }
        // إرسال قائمة المستخدمين
        res.json(users);
    } catch (error) {
        // في حالة حدوث خطأ أثناء جلب المستخدمين
        console.log(error);
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// دالة لتسجيل الخروج
const logout = (req, res) => {
    try {
        // مسح الكوكي الخاصة بالـ JWT
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });


        // إرسال رسالة تأكيد بنجاح عملية تسجيل الخروج
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error); // في حالة حدوث خطأ أثناء تسجيل الخروج
    }
};

export { loginUSER, registerUSER, getAllUsers, logout };
