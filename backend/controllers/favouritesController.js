import userModel from "../models/userModel.js";

const addToFavorites = async (req, res) => {
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

    let favorites = userData.favorites || {};

    if (!favorites[itemId]) {
      favorites[itemId] = {
        _id: itemId,
        image: itemImage,
        name: itemName,
        price: itemPrice,
      };
    } else {
      return res.status(400).json({
        success: false,
        message: "Item is already in favorites",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { favorites },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(500)
        .json({ success: false, message: "Error updating favorites data" });
    }

    res.json({
      success: true,
      message: "Item added to favorites",
      favorites: updatedUser.favorites,
    });
  } catch (err) {
    console.error("Error adding to favorites:", err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

const removeFromFavorites = async (req, res) => {
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

    const favorites = userData.favorites;

    if (!favorites[itemId]) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in favorites" });
    }

    delete favorites[itemId];

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { favorites },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(500)
        .json({ success: false, message: "Error updating favorites data" });
    }

    res.json({
      success: true,
      message: "Item removed from favorites successfully",
      favorites: updatedUser.favorites,
    });
  } catch (err) {
    console.error("Error removing item from favorites:", err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

const getFavorites = async (req, res) => {
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

    const favorites = userData.favorites || {};

    return res.status(200).json({
      success: true,
      favorites,
    });
  } catch (err) {
    console.error("Error fetching favorites data:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve favorites data. Please try again later.",
    });
  }
};

export { addToFavorites, removeFromFavorites, getFavorites };
