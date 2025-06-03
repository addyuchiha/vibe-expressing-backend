import mongoose, { Schema, Document } from 'mongoose';

interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    timestamp: Date;
    type: 'credit' | 'debit';
    description: string;
}

const transactionSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ['credit', 'debit'], required: true },
    description: { type: String, required: true },
});

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;