import express from 'express';
import Expense from "../models/Expense.js";
import { getStats } from '../controllers/statController.js';

const statRoutes=express.Router();

statRoutes.get("/stats/:userId",getStats);

export default statRoutes;
    




