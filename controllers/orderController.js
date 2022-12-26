import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";

const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find();

	if (orders) {
		res.status(201).json(orders);
	} else {
		res.status(400);
		throw new Error("No orders");
	}
});

const createOrder = asyncHandler(async (req, res) => {
	const newOrderItem = new Order(req.body);

	const savedOrderItem = await newOrderItem.save();

	if (savedOrderItem) {
		res.status(201).json(savedOrderItem);
	} else {
		res.status(400);
		throw new Error("Unable to create order");
	}
});

const getUserOrder = asyncHandler(async (req, res) => {
	const userId = req.params.id;

	const userOrder = await Order.findOne({ userId });

	if (userOrder) {
		res.status(201).json(userOrder);
	} else {
		res.status(400);
		throw new Error("No order Found");
	}
});

const deleteOrder = asyncHandler(async (req, res) => {
	const orderId = req.params.id;

	const order = await Order.findByIdAndDelete(orderId);

	if (order) {
		res.json("Order deleted successfully");
	} else {
		res.status(400);
		throw new Error("Order does not exist");
	}
});

const updateOrder = asyncHandler(async (req, res) => {
	const orderId = req.params.id;

	const updatedOrder = await Order.findByIdAndUpdate(
		{ _id: orderId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (updatedOrder) {
		res.status(200).json("Order updated successfully");
	} else {
		res.status(400);
		throw new Error("Order not found");
	}
});

export { createOrder, getAllOrders, getUserOrder, updateOrder, deleteOrder };
