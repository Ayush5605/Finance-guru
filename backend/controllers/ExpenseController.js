import Expense from "../models/Expense.js";

export const addExpense=async(req,res)=>{
    try{
        const{amount,type,category,note,date}=req.body;
        const userId=req.user.uid;

        if(!amount || !type){
            return res.status(400).json({message:"Amount and type are required"});
        }

        const newTransaction=new Expense({
            userId,
            amount:parseFloat(amount),
            type:type.toLowerCase(),
            category:category || "",
            note:note || "",
            date:date ? new Date(date) : new Date()
        })

        await newTransaction.save();
       
        res.status(201).json({message:"Transaction added ",expense:newTransaction});
    }catch(err){
        console.error("Add expense error:", err);
        res.status(500).json({message:"Failed to add expense", error:err.message});

    }
};

export const getExpense=async(req,res)=>{
    try{
        const userId=req.user.uid;
        const expenses=await Expense.find({userId}).sort({date:-1});
        res.status(200).json(expenses);

    }catch(err){
        console.error("Get expense error:", err);
        res.status(500).json({message:"Failed to get expenses", error:err.message});

    }
};


export const deleteExpense=async(req,res)=>{
    try{
        const{id}=req.params;
        await Expense.findOneAndDelete({_id:id,userId:req.user.uid});
        res.json({message:"deleted successfully"});

    }catch(err){
        res.status(500).json({message:"failed to delete expense"});
    }
};

export const updateExpense=async(req,res)=>{
    try{
        const{id}=req.params;

        const updated=await Expense.findOneAndUpdate(
            
               { _id:id,userId:req.user.uid},
                req.body,
                {new:true}
            
        );
        res.status(200).json(updated);
    }catch(err){
        res.status(500).json({message:"failed to update expense"});
    }
}