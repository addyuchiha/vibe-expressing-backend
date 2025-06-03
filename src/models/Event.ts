import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
    userId: string;
    type: 'silence' | 'cringe';
    duration: number;
    timestamp: Date;
}

const eventSchema: Schema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, enum: ['silence', 'cringe'], required: true },
    duration: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Event = mongoose.model<IEvent>('Event', eventSchema);

export default Event;