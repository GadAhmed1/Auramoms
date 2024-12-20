import express from "express";
import { checkToken } from "../middleware/auth.js";
import { addToFavorites, getFavorites, removeFromFavorites } from "../controllers/favouritesController.js";

const favoritesRouter = express.Router();

favoritesRouter.post("/add", checkToken, addToFavorites);
favoritesRouter.post("/remove", checkToken, removeFromFavorites);
favoritesRouter.post("/get", checkToken, getFavorites);

export default favoritesRouter;