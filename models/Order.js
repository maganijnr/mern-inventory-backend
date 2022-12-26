import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
	{
		userId: { type: String, required: true },
		products: [
			{
				productId: { type: String },
				quantity: { type: Number, default: 1 },
			},
		],
		amount: { type: Number, required: true },
		address: {
			type: String,
			required: [true, "Please add product quantity"],
		},
		status: { type: String, default: "pending" },
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
