import razorpay from "../utils/razorpay.js";

export const createOrder=async(req,res)=>{
    try{

        res.json({ message: "Payment route working ✅" });

        // const{amount}=req.body;

        // const order=await razorpay.orders.create({
        //     amount:0.49*100,
        //     currency:"INR",
        //     receipt:`receipt_${Date.now()}`
        // });

        // res.json(order);
    }catch(err){
        res.status(500).json({message:"Order creation failed"});
    }
};