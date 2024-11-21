import userModel from "../models/userModel.js";

const addtoCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
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
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed Cart" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "not removed Cart" });
    }
}

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
