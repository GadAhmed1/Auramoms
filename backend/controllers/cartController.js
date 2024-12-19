import userModel from "../models/userModel.js";
const addtoCart = async (req, res) => {
  try {
    const { userId, itemId, itemImage, itemName, itemPrice } = req.body;

    if (!userId || !itemId || !itemName || !itemPrice) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {
        _id: itemId,
        image: itemImage,
        name: itemName,
        price: itemPrice,
        quantity: 1,
      };
    } else {
      cartData[itemId].quantity += 1;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(500)
        .json({ success: false, message: "Error updating cart data" });
    }

    res.json({
      success: true,
      message: "Item added to cart",
      cartData: updatedUser.cartData,
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

const removeCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and Item ID are required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData;

    if (!cartData[itemId]) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    if (cartData[itemId].quantity > 1) {
      cartData[itemId].quantity -= 1;
    } else {
      delete cartData[itemId];
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(500)
        .json({ success: false, message: "Error updating cart data" });
    }

    res.json({
      success: true,
      message: "Item removed from cart successfully",
      cartData: updatedUser.cartData,
    });
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const cartData = userData.cartData || {};

    return res.status(200).json({
      success: true,
      cartData,
    });
  } catch (err) {
    console.error("Error fetching cart data:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve cart data. Please try again later.",
    });
  }
};

export { addtoCart, removeCart, getCart };
