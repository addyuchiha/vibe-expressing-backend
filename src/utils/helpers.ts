export const formatTimestamp = (timestamp: Date): string => {
    return timestamp.toISOString();
};

export const calculateDuration = (start: Date, end: Date): number => {
    return Math.floor((end.getTime() - start.getTime()) / 1000); // duration in seconds
};

export const isValidEventType = (type: string): boolean => {
    const validTypes = ['silence', 'cringe'];
    return validTypes.includes(type);
};