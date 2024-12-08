import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, itemImage, itemName, itemPrice } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = user.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {
        image: itemImage,
        name: itemName,
        price: itemPrice,
        quantity: 1,
      };
    } else {
      cartData[itemId].quantity += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding item to cart", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = user.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId].quantity > 1) {
        cartData[itemId].quantity -= 1;
      } else {
        delete cartData[itemId];
      }
    } else {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing item from cart", error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = user.cartData || {};
    res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching cart", error: error.message });
  }
};

export { addToCart, removeFromCart, getCart };
