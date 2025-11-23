import express from 'express';
import { verifyUser } from '../middlewares/authMiddleware.js';

import {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
} from "../controllers/expenseController.js";

const router=express.Router();

router.post("/add",verifyUser,addExpense);
router.get("/",verifyUser,getExpenses);
router.put("update/:id",verifyUser,updateExpense);
router.delete("/delete/:id",verifyUser,deleteExpense);

export default router;