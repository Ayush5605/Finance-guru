import admin from '../config/firebase.js';
import User from "../models/userModel.js";

export const verifyUser=async(req,res,next)=>{

    


    try{
        const authheader=req.headers.authorization;

        if(!authheader || !authheader.startsWith("bearer ")){
            return res.status(401).json({message:"No token provided"});
        }

        const token=authheader.split(" ")[1];
        const decoded=await admin.auth().verifyIdToken(token);
        const user=await User.findOne({uid:decoded.uid})

        if(!user){
            return res.status(401).json({messaage:"User not found"});
        }
        req.user={
            uid:user.uid,
            id:user._id,
            email:user.email,
            isPremium:user.isPremium,
            name:user.name
        }

        
        next();
    }catch(err){
        console.log("Auth Error :",err);
        return res.status(403).json({message:"Invalid or expired token"});
    }

}