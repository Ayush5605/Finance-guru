import {razorpay} from "../utils/razorpay.js";

export const createOrder=async(req,res)=>{
    try{
        const order=await razorpay.orders.create({
            amount:49,
            currency:"INR",
            receipt:`receipt_${Date.now}`
        });

        res.json(order);
    }catch(err){
        res.status(500).json({message:"Order creation failed"});
    }
};