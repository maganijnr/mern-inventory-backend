import Cart from "../models/Cart.js";
import asyncHandler from "express-async-handler";

const createCart = asyncHandler(async (req, res) => {
	const newCartItem = new Cart(req.body);

	const savedCartItem = await newCartItem.save();

	if (savedCartItem) {
		res.status(201).json(savedCartItem);
	} else {
		res.status(400);
		throw new Error("Unable to add to cart");
	}
});

const getUserCart = asyncHandler(async (req, res) => {
	const userId = req.params.id;

	const userCart = await Cart.findOne({ userId });

	if (userCart) {
		res.status(201).json(userCart);
	} else {
		res.status(400);
		throw new Error("No Cart Found");
	}
});

const deleteCartItem = asyncHandler(async (req, res) => {
	const cartId = req.params.id;

	const CartItem = await Cart.findByIdAndDelete(cartId);

	if (CartItem) {
		res.json("CartItem deleted successfully");
	} else {
		res.status(400);
		throw new Error("CartItem does not exist");
	}
});

const updateCart = asyncHandler(async (req, res) => {
	const cartId = req.params.id;

	const updatedCart = await Cart.findByIdAndUpdate({ _id: cartId }, req.body, {
		new: true,
		runValidators: true,
	});

	if (updatedCart) {
		res.status(200).json("Cart updated successfully");
	} else {
		res.status(400);
		throw new Error("Cart not found");
	}
});

export { createCart, getUserCart, deleteCartItem, updateCart };
