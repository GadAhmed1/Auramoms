import userModel from "../models/userModel.js";

const addtoCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = {
                image: req.body.itemImage,
                name: req.body.itemName,
                price: req.body.itemPrice,
                quantity: 1,
            };
        } else {
            cartData[req.body.itemId].quantity += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added Cart" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "error cart" });
    }
};

const removeCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData;

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

        res.json({ success: true, message: "Item updated in cart successfully" });
    } catch (err) {
        console.error("Error removing item from cart:", err);
        res.status(500).json({ success: false, message: "Error updating item in cart" });
    }
};

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "not got Cart" });
    }
}

export { addtoCart, removeCart, getCart };
