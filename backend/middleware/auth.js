import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const checkToken = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again!" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(token_decode.id).select("-password").exec();

    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res.status(401).json({
        success: false,
        message: "User no longer exists. Please register again.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    console.log(err);
    res.status(401).json({ success: false, message: "Invalid token or session expired. Login again!" });
  }
};
