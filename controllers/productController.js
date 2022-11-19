import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

const createProduct = asyncHandler(async (req, res) => {
	const { name, price, description, countInStock, image, category } = req.body;

	// Validation
	if ((!name || !countInStock || !price || !description, !category)) {
		res.status(400);
		throw new Error("Please fill in all fields");
	}

	// Create Product
	const product = await Product.create({
		user: req.user.id,
		name,
		countInStock,
		price,
		description,
		category,
		image,
	});

	res.status(201).json(product);
});

const getAllProducts = asyncHandler(async (req, res) => {
	const pageSize = 10;
	const page = Number(req.query.pageNumber) || 1;
	const q = req.query.q
		? {
				name: {
					$regex: req.query.q,
					$options: "i",
				},
		  }
		: {};

	const category = req.query.category
		? {
				category: {
					$regex: req.query.category,
					$options: "i",
				},
		  }
		: {};

	//Get numbe of products
	const count = await Product.count({ ...q, ...category });
	const products = await Product.find({ ...q, ...category })
		.sort("-createdAt")
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	if (products) {
		res.json({ products, page, pages: Math.ceil(count / pageSize) });
	} else {
		res.status(400);
		throw new Error("No products found");
	}
});

const getProductById = asyncHandler(async (req, res) => {
	const productId = req.params.id;

	const product = await Product.findById(productId);

	if (product) {
		res.json(product);
	} else {
		res.status(400);
		throw new Error("Product does not exist");
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	const productId = req.params.id;

	const product = await Product.findByIdAndDelete(productId);

	if (product) {
		res.json("Product deleted successfully");
	} else {
		res.status(400);
		throw new Error("Product does not exist");
	}
});

const updateProduct = asyncHandler(async (req, res) => {
	const productId = req.params.id;

	const updatedProduct = await Product.findByIdAndUpdate(
		{ _id: productId },
		req.body,
		{ new: true, runValidators: true }
	);

	if (updatedProduct) {
		res.status(200).json("Product updated successfully");
	} else {
		res.status(400);
		throw new Error("Product not found");
	}
});
export {
	createProduct,
	getAllProducts,
	getProductById,
	deleteProduct,
	updateProduct,
};
