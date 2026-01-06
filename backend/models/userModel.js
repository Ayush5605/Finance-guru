import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        uid:{
            type:String,
            required:true,
            unique:true,
        },

        email:{
            type:String,
            required:true,
            unique:true,

        },
        name:{
            type:String,
        },

        isPremium:{
            type:Boolean,
        default:false,
        },
        premiumSince:{
            type:Date,
        },
        monthlyBudget:{
            type:Number,
            default:0,
        },
        createdAt:{
            type:Date,
            default:Date.now,
        },
        lastLogin:{
            type:Date,
        }

        
    },
    {timestamps:true}
);

export default mongoose.model("User",userSchema);