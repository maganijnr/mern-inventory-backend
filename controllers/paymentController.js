import Stripe from "stripe";
import asyncHandler from "express-async-handler";

const stripe = Stripe(process.env.STRIPE_KEY);

const makePayment = asyncHandler(async (req, res) => {
	stripe.charges.create(
		{
			source: req.body.tokenId,
			amount: req.body.amount,
			currency: "usd",
		},
		(stripeErrr, stripeRes) => {
			if (stripeErrr) {
				res.status(500);
				throw new Error(stripeErrr);
			} else {
				res.status(200).json(stripeRes);
			}
		}
	);
});

export { makePayment };
