import express from "express";
import { getAllUsers, loginUSER, logout, registerUSER } from "../controllers/UserControllers.js";
import dotenv from 'dotenv';
import { addFav, removeFavProduct, showFavProducts } from "../controllers/ProductCotroller.js";
import { checkToken } from "../middleware/auth.js";
import { forgotPassword, resetPassword } from "../controllers/auth.js";
dotenv.config();

const userROUTE = express.Router();


userROUTE.post("/login", loginUSER);

userROUTE.post("/register", registerUSER);

userROUTE.get("/all_users", getAllUsers);

userROUTE.post("/logout", logout);

userROUTE.get("/favourites/list", checkToken, showFavProducts);

userROUTE.delete("/favourites/remove", checkToken, removeFavProduct);

userROUTE.post("/favourites/add", checkToken, addFav);

userROUTE.post('/forgot-password', forgotPassword);

userROUTE.post('/reset-password', resetPassword);
export default userROUTE;