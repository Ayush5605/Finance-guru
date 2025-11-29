import express from 'express';
import { verifyUser } from '../middlewares/authMiddleware.js';

import {
    addExpense,
    getExpense,
    updateExpense,
    deleteExpense
} from "../controllers/expenseController.js";

const router=express.Router();

router.post("/add",verifyUser,addExpense);
router.get("/transactions",verifyUser,getExpense);
router.put("/update/:id",verifyUser,updateExpense);
router.delete("/delete/:id",verifyUser,deleteExpense);

export default router;