import express from "express";
import {createOrder} from "../controllers/paymentController.js";
import { verifyUser} from "../middlewares/authMiddleware.js";
import { verifyPayment } from "../controllers/paymentController.js";


console.log("✅ paymentRoute loaded");


const paymentRouter=express.Router();



paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/verify",verifyUser,verifyPayment);

export default paymentRouter;