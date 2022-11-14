import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const protect = asyncHandler(async (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			res.status(401);
			throw new Error("Not authorized, please l");
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

		// console.log(req.user);
		next();
	} catch (error) {
		res.status(401);
		throw new Error("Not authorized, please login");
	}
});

export { protect };
