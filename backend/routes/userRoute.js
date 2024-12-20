import express from "express";
import {
  getAllUsers,
  loginUSER,
  logout,
  registerUSER,
} from "../controllers/UserControllers.js";
import dotenv from "dotenv";
// import { addFav, removeFavProduct, showFavProducts } from "../controllers/ProductCotroller.js";
// import { checkToken } from "../middleware/auth.js";
dotenv.config();

const userROUTE = express.Router();

userROUTE.post("/login", loginUSER);

userROUTE.post("/register", registerUSER);

userROUTE.get("/all_users", getAllUsers);

userROUTE.post("/logout", logout);

// userROUTE.get("/favourites/list", checkToken, showFavProducts);

// userROUTE.post("/favourites/remove", checkToken, removeFavProduct);

// userROUTE.post("/favourites/add", checkToken, addFav);

export default userROUTE;
