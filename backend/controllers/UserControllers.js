import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const createAccessToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUSER = async (req, res) => {
  const emailregex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  const { firstname, lastname, email, password, country, phone } = req.body;

  try {
    if (!firstname || !lastname || !email || !password || !country || !phone) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }

    const exists = await userModel.findOne({ email }).exec();
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "The user is already existing" });
    }

    if (!validator.isEmail(email) || !emailregex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be more than 8 characters",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      country,
      phone,
    });

    const user = await newUser.save();

    const accessToken = createAccessToken(user._id);

    res.cookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({
      success: true,
      accessToken: accessToken,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: hashedPassword,
      country: user.country,
      phone: user.phone,
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in Register", error });
  }
};

const loginUSER = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email }).exec();
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "The credentials are incorrect" });
    }

    const accessToken = createAccessToken(user._id);

    res.cookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({
      success: true,
      accessToken: accessToken,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      country: user.country,
      phone: user.phone,
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in Login", error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password").lean();
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};

export { loginUSER, registerUSER, getAllUsers, logout };
