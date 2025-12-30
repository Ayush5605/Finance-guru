import razorpay from "../utils/razorpay.js";

export const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        // Validate amount
        if (!amount || amount <= 0) {
            return res.status(400).json({ 
                error: "Invalid amount. Amount must be greater than 0." 
            });
        }

       
        const amountInPaise = Math.round(amount * 100);

        
        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: `receipt_${Date.now()}_${req.user?.uid || 'user'}`
        });

        res.status(200).json({
            success: true,
            order: order
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ 
            error: "Failed to create order",
            message: error.message || "Internal server error"
        });
    }
};
