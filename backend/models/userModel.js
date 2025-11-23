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

        premium:{
            type:Boolean,
        default:false,
        },
        premiumSice:{
            type:Date,
        },
        monthluBudget:{
            type:Number,
            default:0,
        }

        
    },
    {timestamps:true}
);

export default mongoose.model("User",userSchema);