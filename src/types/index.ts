// src/types/index.ts

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Event {
    id: string;
    userId: string;
    type: 'silence' | 'cringe';
    duration: number; // duration in seconds
    timestamp: Date;
}

export interface Transaction {
    id: string;
    userId: string;
    amount: number; // amount in cents
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthPayload {
    userId: string;
    username: string;
}

export interface VibeEventLog {
    eventId: string;
    userId: string;
    eventType: 'silence' | 'cringe';
    duration: number;
    timestamp: Date;
}