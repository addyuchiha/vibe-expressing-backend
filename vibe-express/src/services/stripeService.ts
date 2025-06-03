import Stripe from 'stripe';
import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
});

// Function to create a new Stripe customer
export const createCustomer = async (email: string) => {
  const customer = await stripe.customers.create({ email });
  return customer;
};

// Function to create a payment intent
export const createPaymentIntent = async (amount: number, currency: string) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });
  return paymentIntent;
};

// Function to handle successful payment and save transaction
export const handlePaymentSuccess = async (paymentIntentId: string, userId: string) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
  const transaction = new Transaction({
    userId,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    status: paymentIntent.status,
  });

  await transaction.save();
  return transaction;
};