import express from "express";
import {  refreshToken } from "../controllers/tokenControllers.js";

const app_jwt = express.Router();

app_jwt.get("/refreshtoken", refreshToken)


export default app_jwt;