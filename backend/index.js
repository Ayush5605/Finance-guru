import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
dotenv.config();

import connectDB from './config/db.js';
import expenseRoutes from './routes/expenseRoutes.js';
import AIroutes from './routes/AIroutes.js';
import authRoutes from './routes/authRoutes.js';
import statRoutes from './routes/statRoute.js';
import payementRoute from './routes/payementRoute.js';

const app=express();
app.use(cors());
app.use(express.json());


connectDB();

app.get("/",(req,res)=>{
    res.send("Welcome to finance guru");
})

app.use("/api/expenses",expenseRoutes);
app.use("/api/AI",AIroutes);
app.use("/api/auth",authRoutes);
app.use("/api",statRoutes);
app.use('/api/payment',payementRoute);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})