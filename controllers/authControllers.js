import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

//Register User
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, bio, photo } = req.body;

	//Check for validation
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("All fields are required");
	}

	if (password.length < 6) {
		res.status(400);
		throw new Error("Password is short");
	}

	//Check if user exists already
	const userExist = await User.findOne({ email: email });

	if (userExist) {
		res.status(400);
		throw new Error("User already exist");
	}

	//Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	//Create user
	const createdUser = await User.create({
		name,
		email,
		password: hashedPassword,
		bio,
		photo,
	});

	//Generate token
	const token = jwt.sign(
		{ email: createdUser.email },
		process.env.JWT_SECRET_KEY,
		{ expiresIn: "3h" }
	);

	res.json({
		_id: createdUser._id,
		name: createdUser.name,
		email: createdUser.email,
		bio: createdUser.bio,
		photo: createdUser.photo,
		token: token,
	});
});

//Login User
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	//Check for validation
	if (!email || !password) {
		res.status(400);
		throw new Error("All fields are required");
	}

	if (password.length < 6) {
		res.status(400);
		throw new Error("Password is short");
	}

	//Check if user exists
	const userExist = await User.findOne({ email });

	if (!userExist) {
		res.status(400);
		throw new Error("User does not exist");
	}

	const passwordMatch = await bcrypt.compare(password, userExist.password);

	if (!passwordMatch) {
		res.status(400);
		throw new Error("Invalid email or username");
	}

	const token = jwt.sign(
		{ email: userExist.email },
		process.env.JWT_SECRET_KEY,
		{ expiresIn: "3h" }
	);

	res.json({
		_id: userExist._id,
		name: userExist.name,
		email: userExist.email,
		bio: userExist.bio,
		photo: userExist.photo,
		token: token,
	});
});

export { registerUser, loginUser };
