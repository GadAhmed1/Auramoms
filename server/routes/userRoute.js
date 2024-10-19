import express from "express";
import { getAllUsers, loginUSER, logout, registerUSER } from "../controllers/UserControllers.js";
import dotenv from 'dotenv';
dotenv.config();

const userROUTE = express.Router();


// Define a route for user login
userROUTE.post("/login", loginUSER);

// Define a route for user registration
userROUTE.post("/register", registerUSER);

// Define a route for get all users
userROUTE.get("/all_users", getAllUsers);

// Define a route for user Logout
userROUTE.post("/logout",logout)


export default userROUTE;