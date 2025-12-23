import express from "express";
import {createOrder} from "../controllers/payementController.js";
import { verifyUser} from "../middlewares/authMiddleware.js";

const paymentRouter=express.Router();
paymentRouter.post("/create-order",verifyUser,createOrder);

export default paymentRouter;