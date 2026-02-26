import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency = 'usd', orderId } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    metadata: { orderId }
  });

  res.json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
});
