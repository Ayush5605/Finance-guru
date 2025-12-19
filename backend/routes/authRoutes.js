import express from "express";
import User from "../models/userModel.js";
import admin from "firebase-admin";

const router = express.Router();


router.post("/signup", async (req, res) => {
    const { token } = req.body;

    try {
        
        const decoded = await admin.auth().verifyIdToken(token);

        
        let user = await User.findOne({ uid: decoded.uid });

        if(user){
            return res.status(400).json({error:"User already exists,please login"});
        }

        user=await User.create({
            uid:decoded.uid,
            email:decoded.email,
            name:decoded.name || "",
            photo:decoded.picture || "",
            createdAt:new Date(),
        });

       

        return res.status(200).json({
            message: "Signup successfull",
            user
            
        });

    } catch (err) {
        return res.status(400).json({ error: "Invalid Firebase Token" });
    }
});

// LOGIN ROUTE (same as signup)
router.post("/login", async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = await admin.auth().verifyIdToken(token);

        let user = await User.findOne({ uid: decoded.uid });

        if (!user) {
            return res.status(404).json({error:"User not found please signup first"});
        }

        user.lastLogin=new Date();
        await user.save();

        return res.status(200).json({message:"Login successfull",user});
            
                
} catch (err) {
        return res.status(400).json({ error: "Invalid Firebase Token" });
    }
});

export default router;
