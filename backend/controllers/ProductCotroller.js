import productModel from "../models/productModel.js"; // استيراد نموذج المنتج من ملف النموذج
import fs from "fs"; // استيراد مكتبة fs للتعامل مع نظام الملفات
import multer from 'multer'; // استيراد مكتبة multer للتعامل مع تحميل الملفات
import path from 'path'; // استيراد مكتبة path للتعامل مع مسارات الملفات
import userModel from "../models/userModel.js";

// إعدادات multer لتحديد مكان تخزين الملفات واسمها
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // تحديد مسار التخزين للملفات المحملة (تأكد من عدم بدء المسار بـ "/")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // إنشاء اسم فريد لكل ملف لتجنب تكرار الأسماء
  },
});

// فلترة الملفات لتحديد نوعية الملفات المسموح بها (الصور فقط)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/; // تحديد الأنواع المسموح بها (JPEG, JPG, PNG, GIF)
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase()); // التحقق من الامتداد
  const mimetype = allowedTypes.test(file.mimetype); // التحقق من نوع MIME
  if (extname && mimetype) {
    cb(null, true); // إذا كان الملف مسموحًا به، استمر
  } else {
    cb(new Error('Only images (jpeg, jpg, png, gif) are allowed')); // إذا لم يكن مسموحًا به، ارجع بخطأ
  }
};

// إعداد multer مع التخزين والفلاتر
const upload = multer({
  storage: storage, // تحديد إعدادات التخزين
  limits: { fileSize: 1024 * 1024 * 5 }, // الحد الأقصى لحجم الملف 5 ميجابايت
  fileFilter: fileFilter, // تطبيق فلتر الملفات
}).fields([ // تحديد الحقول المتعددة للتحميل
  { name: 'image', maxCount: 1 },   // حقل الصورة الأولى
  { name: 'image2', maxCount: 1 },  // حقل الصورة الثانية
  { name: 'image3', maxCount: 1 },  // حقل الصورة الثالثة
  { name: 'image4', maxCount: 1 },  // حقل الصورة الرابعة
  { name: 'image5', maxCount: 1 },  // حقل الصورة الرابعة
]);

// دالة إضافة منتج
const addProduct = (req, res) => {
  upload(req, res, async (err) => { // استدعاء الدالة لتحميل الملفات
    if (err) { // إذا حدث خطأ أثناء التحميل
      return res.status(400).json({ success: false, message: 'Failed to upload images', error: err.message }); // إرجاع خطأ
    }

    const { name, description, price, category } = req.body; // استخراج البيانات من الجسم

    // اجلب جميع الصور
    const images = {
      image: req.files?.image?.[0]?.filename || '',  // الصورة الأولى
      image2: req.files?.image2?.[0]?.filename || '', // الصورة الثانية
      image3: req.files?.image3?.[0]?.filename || '', // الصورة الثالثة
      image4: req.files?.image4?.[0]?.filename || '', // الصورة الرابعة
      image5: req.files?.image5?.[0]?.filename || '', // الصورة الرابعة
    };



    const product = new productModel({ // إنشاء منتج جديد باستخدام النموذج
      name,
      description,
      price,
      category,
      ...images, // أضف جميع الصور للنموذج
    });

    try {
      await product.save(); // حفظ المنتج في قاعدة البيانات
      res.json({ success: true, message: 'Product Added Successfully', product }); // إرجاع استجابة ناجحة
    } catch (error) { // التعامل مع الأخطاء أثناء الحفظ
      res.status(400).json({ success: false, message: 'Failed to add product', error: error.message }); // إرجاع خطأ
    }
  });
};

// دالة عرض المنتجات
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({}); // استرجاع جميع المنتجات من قاعدة البيانات
    res.json({ success: true, data: products }); // إرجاع استجابة ناجحة مع قائمة المنتجات
  } catch (error) { // التعامل مع الأخطاء أثناء الاسترجاع
    res.status(400).json({ success: false, message: "Failed to list products", error: error.message }); // إرجاع خطأ
  }
};

// دالة إزالة منتج
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id); // العثور على المنتج بناءً على معرفه
    if (!product) { // إذا لم يتم العثور على المنتج
      return res.status(404).json({ success: false, message: "Product not found" }); // إرجاع خطأ
    }

    // حذف الصور المرتبطة بالمنتج
    const images = [product.image, product.image2, product.image3, product.image4]; // تجميع أسماء الصور
    images.forEach(image => {
      const imagePath = path.join('uploads', image); // تحديد المسار الكامل للصورة
      if (fs.existsSync(imagePath)) { // التحقق مما إذا كانت الصورة موجودة
        fs.unlink(imagePath, (err) => { // حذف الصورة من النظام
          if (err) { // التعامل مع الأخطاء أثناء الحذف
            console.error(`Failed to delete image ${image}:`, err); // تسجيل الخطأ في الكونسول
          }
        });
      }
    });

    await productModel.findByIdAndDelete(req.body.id); // حذف المنتج من قاعدة البيانات
    res.json({ success: true, message: "Product Removed Successfully" }); // إرجاع استجابة ناجحة
  } catch (error) { // التعامل مع الأخطاء أثناء الحذف
    res.status(400).json({ success: false, message: "Failed to remove product", error: error.message }); // إرجاع خطأ
  }
};


const addFav = async (req, res) => {
  try {
    const { userId, itemId } = req.body; // استخراج معرف المستخدم ومعرف المنتج من الجسم

    // البحث عن المستخدم
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" }); // إرجاع خطأ إذا لم يتم العثور على المستخدم
    }

    // التحقق مما إذا كان المنتج موجودًا بالفعل في قائمة المفضلة
    if (user.favorites.includes(itemId)) {
      return res.status(400).json({ success: false, message: "Product already in favorites" }); // إرجاع خطأ إذا كان المنتج موجودًا بالفعل
    }

    // إضافة المنتج إلى قائمة المفضلة
    user.favorites.push(itemId);
    await user.save(); // حفظ التغييرات

    res.json({ success: true, message: "Product added to favorites successfully", favorites: user.favorites }); // إرجاع استجابة ناجحة
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to add product to favorites", error: error.message }); // إرجاع خطأ إذا حدثت مشكلة
  }
};
const showFavProducts = async (req, res) => {
  try {
    const { userId } = req.body; // استخراج معرف المستخدم من البارامترات (params)

    // البحث عن المستخدم باستخدام معرفه مع جلب تفاصيل المنتجات المفضلة
    const user = await userModel.findById(userId).populate('favorites');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" }); // إرجاع خطأ إذا لم يتم العثور على المستخدم
    }

    // إرجاع المنتجات المفضلة
    res.json({ success: true, message: "Favorites retrieved successfully", favorites: user.favorites });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to retrieve favorites", error: error.message }); // إرجاع خطأ إذا حدثت مشكلة
  }
};


const removeFavProduct = async (req, res) => {
  try {
    const { userId, itemId } = req.body; // استخراج معرف المستخدم ومعرف المنتج من الـ params

    // البحث عن المستخدم بناءً على معرفه
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" }); // إذا لم يتم العثور على المستخدم
    }

    // التحقق إذا كان المنتج موجودًا في قائمة المفضلة
    const productIndex = user.favorites.indexOf(itemId);
    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in favorites" }); // إذا لم يكن المنتج موجودًا في المفضلة
    }

    // إزالة معرف المنتج من قائمة المفضلة
    user.favorites.splice(productIndex, 1);

    // حفظ التغييرات
    await user.save();

    // إرجاع استجابة ناجحة
    res.json({ success: true, message: "Product removed from favorites successfully" });
  } catch (error) {
    // التعامل مع الأخطاء
    res.status(400).json({ success: false, message: "Failed to remove product from favorites", error: error.message });
  }
};


export { addProduct, listProduct, removeProduct, addFav, showFavProducts, removeFavProduct }; // تصدير الدوال للاستخدام في أماكن أخرى
