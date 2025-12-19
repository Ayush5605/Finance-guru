import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
import Expenses from "../models/Expense.js";

const genAI=new GoogleGenerativeAI(process.env.AI_API_KEY);

export const analyzewithAI=async(req,res)=>{


    try{
        const {query}=req.body;
        const userId=req.user.uid;
        const expenses=await Expenses.find({userId}).lean();
    const model=genAI.getGenerativeModel({model:"gemini-pro"});

    const prompt=`You are an AI financial assistant. The user has a list of expenses in JSON format 
and a question about their spending. Analyze the expenses, look for patterns, 
monthly totals, category totals, unusual spending, and give helpful suggestions.

Respond in short,simple bullet points

User question:
${query}

User expenses (array of objects with title, amount, category, date):
${JSON.stringify(expenses)}
`;

const result=await model.generateContent(prompt);
res.json({answer:result.response.text()});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"AI Analysis failed"});
    }

}