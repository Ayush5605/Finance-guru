import express from 'express';
import { verifyUser } from '../middlewares/authMiddleware.js';
import { analyzewithAI } from '../AI/AIcontroller.js';

const router=express.Router();

router.post("/analyze",verifyUser,analyzewithAI);

export default router;