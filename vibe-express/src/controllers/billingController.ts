import { Request, Response } from 'express';
import { createCharge } from '../services/stripeService';
import Transaction from '../models/Transaction';

// Function to handle billing for monetized moments
export const handleBilling = async (req: Request, res: Response) => {
    const { amount, userId, description } = req.body;

    try {
        // Create a charge using Stripe
        const charge = await createCharge(amount, userId, description);

        // Save transaction details in the database
        const transaction = new Transaction({
            userId,
            amount,
            description,
            stripeChargeId: charge.id,
            createdAt: new Date(),
        });

        await transaction.save();

        res.status(201).json({ message: 'Billing successful', transaction });
    } catch (error) {
        console.error('Billing error:', error);
        res.status(500).json({ message: 'Billing failed', error: error.message });
    }
};

// Function to fetch transaction history for a user
export const getTransactionHistory = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        res.status(500).json({ message: 'Error fetching transaction history', error: error.message });
    }
};