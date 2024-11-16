import productModel from "../models/productModel.js"; // استيراد نموذج المنتج من ملف النموذج
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
dotenv.config();


// تكوين Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadImage = async (file) => {
  if (!file || !file.path) {
    console.error('No file or path found');
    return null;
  }

  console.log('Uploading image:', file.originalname);

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'auto',
      folder: 'uploads/',
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};


// إضافة منتج جديد
 const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, color } = req.body;

    // تحقق من الملفات المرسلة
    console.log('Files received:', req.files);

    // رفع الصور إلى Cloudinary وتخزين الروابط باستخدام file.path
    const imagePaths = {};
    imagePaths.image = req.files?.image ? await uploadImage(req.files.image[0]) : "null";
    imagePaths.image2 = req.files?.image2 ? await uploadImage(req.files.image2[0]) : "null";
    imagePaths.image3 = req.files?.image3 ? await uploadImage(req.files.image3[0]) : "null";
    imagePaths.image4 = req.files?.image4 ? await uploadImage(req.files.image4[0]) : "null";
    imagePaths.image5 = req.files?.image5 ? await uploadImage(req.files.image5[0]) : "null";

    // إنشاء منتج جديد في MongoDB
    const newProduct = new productModel({
      name,
      description,
      price,
      category,
      color,
      ...imagePaths,
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product uploaded successfully', data: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, message: 'Failed to upload product', error: error.message });
  }
};



const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to list products", error: error.message });
  }
};

const fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);

    if (product) {
      res.json({
        success: true,
        data: product
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product details'
    });
  }
}


const removeProduct = async (req, res) => {
  const { id } = req.body;
  try {
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category , color, price } = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, description,category, color, price },
      { new: true }
    );
    if (updatedProduct) {
      res.json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } else {
      res.json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
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


export { addProduct, updateProduct, fetchProductById, listProduct, removeProduct, addFav, showFavProducts, removeFavProduct }; // تصدير الدوال للاستخدام في أماكن أخرى