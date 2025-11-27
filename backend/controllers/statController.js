import Expense from "../models/Expense";

export const getStats=async(req,res)=>{


    try{
    const userId=req.params;

    const records=await Expense.find({userId});

    let income=0;
    let expenses=0;

    records.forEach((item)=>{
        if(item.type==="Income") income+=item.amount;
        else if(item.type==="Expense") expenses+=item.amount
    })


    res.json({
        income,
        expenses,
        balance:income-expenses
    })
}catch(err){
    res.status(500).json({error:"Server Error"});
}
}