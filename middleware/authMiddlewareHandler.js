import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const protect = asyncHandler(async (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			res.status(401);
			throw new Error("Not authorized, please login");
		}

		//Verify the token
		const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

		//Get user from token
		const user = await User.findById({ _id: verified.id }).select(
			"-password"
		);

		if (!user) {
			res.status(401);
			throw new Error("User not found");
		}

		req.user = user;

		next();
	} catch (error) {
		res.status(401);
		throw new Error("Not authorized, please login");
	}
});

const verifyAdmin = asyncHandler(async (req, res, next) => {
	const token = req.cookies.token;
	try {
		// const token = req.cookies.token;

		if (!token) {
			res.status(401);
			throw new Error("Not authorized, please login");
		}

		const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

		const user = await User.findById({ _id: verified.id }).select(
			"-password"
		);

		if (!user) {
			res.status(401);
			throw new Error("User not found");
		}

		if (!user.isAdmin) {
			res.status(401);
			throw new Error("Authorized for admins only");
		}

		req.user = user;

		next();
	} catch (error) {
		res.status(401);
		throw new Error("Authorized for admins only");
	}
});

export { protect, verifyAdmin };
