import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadImage = async (file) => {
  if (!file?.path) return null;

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
      folder: "uploads/",
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Failed to upload image to Cloudinary");
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, color } = req.body;

    const imagePaths = {
      image: req.files?.image ? await uploadImage(req.files.image[0]) : "null",
      image2: req.files?.image2 ? await uploadImage(req.files.image2[0]) : "null",
      image3: req.files?.image3 ? await uploadImage(req.files.image3[0]) : "null",
      image4: req.files?.image4 ? await uploadImage(req.files.image4[0]) : "null",
      image5: req.files?.image5 ? await uploadImage(req.files.image5[0]) : "null",
    };

    const newProduct = await productModel.create({
      name,
      description,
      price,
      category,
      color,
      ...imagePaths,
    });

    res.status(201).json({ success: true, message: "Product uploaded successfully", data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to upload product", error: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to list products", error: error.message });
  }
};

const fetchProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (product) {
      res.json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching product details", error: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete product", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (updatedProduct) {
      res.json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update product", error: error.message });
  }
};

// const addFav = async (req, res) => {
//   try {
//     const { userId, itemId, itemImage, itemName, itemPrice } = req.body;

//     await userModel.updateOne(
//       { _id: userId },
//       { $set: { [`favorites.${itemId}`]: { image: itemImage, name: itemName, price: itemPrice } } }
//     );

//     res.json({ success: true, message: "Added to favorites" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to add to favorites", error: error.message });
//   }
// };

// const showFavProducts = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.body.userId).populate("favorites");
//     if (user) {
//       res.json({ success: true, message: "Favorites retrieved successfully", favorites: user.favorites });
//     } else {
//       res.status(404).json({ success: false, message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to retrieve favorites", error: error.message });
//   }
// };

// const removeFavProduct = async (req, res) => {
//   try {
//     const { userId, itemId } = req.body;
//     const user = await userModel.findById(userId);
//     if (!user || !user.favorites[itemId]) {
//       return res.status(404).json({ success: false, message: "Item not found in favorites" });
//     }
//     delete user.favorites[itemId];
//     await user.save();
//     res.json({ success: true, message: "Item removed from favorites successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to remove item from favorites", error: error.message });
//   }
// };

export { addProduct, updateProduct, fetchProductById, listProduct, removeProduct};
