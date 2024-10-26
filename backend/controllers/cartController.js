import userModel from "../models/userModel.js"; // استيراد نموذج المستخدم

// دالة لإضافة عنصر إلى سلة التسوق
const addtoCart = async (req, res) => {
    try {
        // البحث عن بيانات المستخدم باستخدام المعرف
        let userData = await userModel.findOne({ _id: req.body.userId });
        // الحصول على بيانات سلة التسوق للمستخدم
        let cartData = await userData.cartData;

        // إذا لم يكن العنصر موجودًا في السلة، أضفه مع عدد 1
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            // إذا كان العنصر موجودًا، زيادة العدد بمقدار 1
            cartData[req.body.itemId] += 1;
        }

        // تحديث بيانات السلة في قاعدة البيانات
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        // إرسال استجابة ناجحة
        res.json({ success: true, message: "Added Cart" });
    } catch (err) {
        console.log(err); // طباعة الخطأ في الكونسول
        // إرسال استجابة بفشل العملية
        res.json({ success: false, message: "error cart" });
    }
};

// دالة لإزالة عنصر من سلة التسوق
const removeCart = async (req, res) => {
    try {
        // البحث عن بيانات المستخدم باستخدام المعرف
        let userData = await userModel.findById(req.body.userId);
        // الحصول على بيانات سلة التسوق للمستخدم
        let cartData = await userData.cartData;

        // إذا كان عدد العنصر أكبر من 0، قلل العدد بمقدار 1
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        // تحديث بيانات السلة في قاعدة البيانات
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        // إرسال استجابة ناجحة
        res.json({ success: true, message: "Removed Cart" });
    } catch (err) {
        console.log(err); // طباعة الخطأ في الكونسول
        // إرسال استجابة بفشل العملية
        res.json({ success: false, message: "not removed Cart" });
    }
}

// دالة للحصول على بيانات سلة التسوق
const getCart = async (req, res) => {
    try {
        // البحث عن بيانات المستخدم باستخدام المعرف
        let userData = await userModel.findById(req.body.userId);
        // الحصول على بيانات سلة التسوق للمستخدم
        let cartData = await userData.cartData;
        // إرسال بيانات السلة مع استجابة ناجحة
        res.json({ success: true, cartData });
    } catch (err) {
        console.log(err); // طباعة الخطأ في الكونسول
        // إرسال استجابة بفشل العملية
        res.json({ success: false, message: "not got Cart" });
    }
}

// تصدير الدوال لاستخدامها في أماكن أخرى
export { addtoCart, removeCart, getCart };
