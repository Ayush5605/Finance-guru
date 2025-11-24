import express from "express";
import User from "../models/userModel.js";
import admin from "firebase-admin";

const router = express.Router();

// SIGNUP or LOGIN with Firebase Token
router.post("/signup", async (req, res) => {
    const { token } = req.body;

    try {
        // Verify Firebase token
        const decoded = await admin.auth().verifyIdToken(token);

        // Check user in DB
        let user = await User.findOne({ uid: decoded.uid });

        if (!user) {
            user = await User.create({
                uid: decoded.uid,
                email: decoded.email,
                createdAt: new Date(),
            });
        }

        return res.status(200).json({
            message: "User synced",
            user,
            token
        });

    } catch (err) {
        return res.status(400).json({ error: "Invalid Firebase Token" });
    }
});

// LOGIN ROUTE (same as signup)
router.post("/login", async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = await admin.auth().verifyIdToken(token);

        let user = await User.findOne({ uid: decoded.uid });

        if (!user) {
            user = await User.create({
                uid: decoded.uid,
                email: decoded.email,
                createdAt: new Date(),
            });
        } else {
            user.lastLogin = new Date();
            await user.save();
        }

        return res.status(200).json({
            message: "Login successful",
            user,
            token
        });

    } catch (err) {
        return res.status(400).json({ error: "Invalid Firebase Token" });
    }
});

export default router;
