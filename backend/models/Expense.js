import mongoose from "mongoose";

const expenseSchema=new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },

        title:{
            type:String,
           required:true,
           trim:true,      
  },

  amount:{
    type:Number,
    required:true,
    min:0,
  },
  category:{
    type:String,
    required:true,
    enum:[
        "Food",
        "Travel",
        "Shopping",
        "Bills",
        "Entertainment",
        "Health",
        "Education",
        "Other",

    ],
    default:"Other",
  },

  date:{
    type:Date,
    default:Date.now,
  },

  notes:{
    type:String,
    trim:true,
  },
        },
        {timestampstrue}

);

export default mongoose.model("Expense",expenseSchema);