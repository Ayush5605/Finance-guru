import Expense from "../models/Expense.js";

export const addExpense=async(req,res)=>{
    try{
        const expense=await Expense.create({
            ...req.body,
            userId:req.user.uid,
        });

        res.json(expense);
    }catch(err){
        res.status(500).json({message:"Failed to add expense"});

    }
};

export const getExpenses=async(req,res)=>{
    try{
        const expenses=(await Expense.find({userId:req.user.uid})).toSorted({date:-1});
        res.json(expenses);

    }catch(err){
        res.status(500).json({message:"Failed to get expenses"});

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
        res.json(updated);
    }catch(err){
        res.status(500).json({message:"failed to update expense"});
    }
}