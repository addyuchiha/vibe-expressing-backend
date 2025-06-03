import Event from '../models/Event';

// Function to log a vibe event
export const logEvent = async (eventData: { userId: string; type: 'silence' | 'cringe'; duration: number; timestamp: Date }) => {
    const event = new Event(eventData);
    return await event.save();
};

// Function to fetch event logs for a user
export const getEventLogs = async (userId: string) => {
    return await Event.find({ userId }).sort({ timestamp: -1 });
};

// Function to get stats for a user's events
export const getEventStats = async (userId: string) => {
    const events = await Event.find({ userId });
    const totalEvents = events.length;
    const silenceCount = events.filter(event => event.type === 'silence').length;
    const cringeCount = events.filter(event => event.type === 'cringe').length;

    return {
        totalEvents,
        silenceCount,
        cringeCount,
    };
};