import express from "express";
import { getAllUsers, loginUSER, logout, registerUSER } from "../controllers/UserControllers.js";
import dotenv from 'dotenv';
import { addFav, removeFavProduct, showFavProducts } from "../controllers/ProductCotroller.js";
import { checkToken } from "../middleware/auth.js";
dotenv.config();

const userROUTE = express.Router();


// Define a route for user login
userROUTE.post("/login", loginUSER);

// Define a route for user registration
userROUTE.post("/register", registerUSER);

// Define a route for get all users
userROUTE.get("/all_users", getAllUsers);

// Define a route for user Logout
userROUTE.post("/logout", logout);

userROUTE.get("/favourites/list", checkToken, showFavProducts);
userROUTE.delete("/favourites/remove", checkToken, removeFavProduct);
userROUTE.post("/favourites/add", checkToken, addFav);
export default userROUTE;