import mongoose from "mongoose";

const expenseSchema=new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        amount:{
            type:Number,
            required:true,
            min:0,
            default:0,
        },
        category:{
            type:String,
            required:false,
            trim:true,
        },
        type:{
            type:String,
            required:true,
            enum:["income", "expense"],
        },
        date:{
            type:Date,
            default:Date.now,
        },
        note:{
            type:String,
            trim:true,
        },
    },
    {timestamps:true}
);

export default mongoose.model("Expense",expenseSchema);