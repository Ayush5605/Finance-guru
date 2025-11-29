import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../../api/expenseAPI.js";

import { Input} from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { cn } from "../../../lib/utils.js";

export default function AddExpense({onAdded}){
    const navigate = useNavigate();
    const [amount,setAmount]=useState("");
    const[type,setType]=useState("expense");
    const[category,setCategory]=useState("");
    const[note,setNote]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
            await addExpense({
                amount: parseFloat(amount),
                type,
                category,
                note,
                date: new Date(),
            });

            alert("Expense Added!");
            setAmount("");
            setCategory("");
            setNote("");

            if(onAdded)onAdded();
            
            // Redirect to expense page after successful submission
            navigate("/expenses");
        }catch(err){
            console.log(err);
            alert("Failed to add expense");
        }
    }
    return(

        <div
      className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Finance-Guru
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Add Expenses
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          
         
        </div>


         <LabelInputContainer className="mb-4">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            placeholder="Enter amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </LabelInputContainer>

        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 rounded-md border bg-white dark:bg-zinc-900"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </LabelInputContainer>

        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="Food, Travel, Shopping..."
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </LabelInputContainer>

        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="note">Note</Label>
          <Input
            id="note"
            placeholder="Write something (optional)"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </LabelInputContainer>

       
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
          Add Expense + &rarr;
          <BottomGradient />
        </button>

        <div
          className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          
          
         
        </div>
         
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>



    );
}