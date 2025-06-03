import { Request, Response } from 'express';
import Event from '../models/Event';

// Log a vibe event
export const logEvent = async (req: Request, res: Response) => {
    const { type, duration } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        const newEvent = new Event({
            userId,
            type,
            duration,
            timestamp: new Date(),
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event logged successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error logging event', error });
    }
};

// Fetch event logs for a user session
export const getEventLogs = async (req: Request, res: Response) => {
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        const events = await Event.find({ userId }).sort({ timestamp: -1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event logs', error });
    }
};

// Fetch stats for a user session
export const getEventStats = async (req: Request, res: Response) => {
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        const stats = await Event.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 },
                    totalDuration: { $sum: '$duration' },
                },
            },
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event stats', error });
    }
};