// /auth routes
import express from "express";
import { register, login } from "../controllers/authController.js";
const router = express.Router();
//this is for the  user register
router.post("/register", register)

//this is for the user login
router.post("/login", login)

export default router;
