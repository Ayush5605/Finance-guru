import express from "express";
import {createOrder} from "../controllers/paymentController.js";
import { verifyUser} from "../middlewares/authMiddleware.js";


console.log("✅ paymentRoute loaded");


const paymentRouter=express.Router();



paymentRouter.post("/create-order", createOrder);

export default paymentRouter;