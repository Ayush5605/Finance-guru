import express from "express";
import User from "../models/userModel.js";
import admin from "firebase-admin";
import { getMe, signup,login } from "../controllers/authController.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/signup",signup);
   
// LOGIN ROUTE (same as signup)
router.post("/login", login);
    

router.get("/me",verifyUser,getMe)

export default router;
