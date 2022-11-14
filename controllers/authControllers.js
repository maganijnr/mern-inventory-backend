import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

const generateToken = (id, email) => {
	return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, {
		expiresIn: "1d",
	});
};

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
	const token = generateToken(createdUser._id, createdUser.email);

	//Send HTTP-only cookie
	res.cookie("token", token, {
		path: "/",
		httpOnly: true,
		expires: new Date(Date.now() + 1000 * 86400),
		sameSite: "none",
		secure: true,
	});

	if (createdUser) {
		res.json({
			_id: createdUser._id,
			name: createdUser.name,
			email: createdUser.email,
			bio: createdUser.bio,
			photo: createdUser.photo,
			token: token,
		});
	}
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

	//Compare password
	const passwordMatch = await bcrypt.compare(password, userExist.password);

	if (userExist && passwordMatch) {
		//Generate token
		const token = generateToken(userExist._id, userExist.email);

		//Send HTTP-only cookie
		res.cookie("token", token, {
			path: "/",
			httpOnly: true,
			expires: new Date(Date.now() + 1000 * 86400),
			sameSite: "none",
			secure: true,
		});

		res.json({
			_id: userExist._id,
			name: userExist.name,
			email: userExist.email,
			bio: userExist.bio,
			photo: userExist.photo,
			token: token,
		});
	} else {
		res.status(400);
		throw new Error("Invalid email or username");
	}
});

const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("token", "", {
		path: "/",
		httpOnly: true,
		expires: new Date(0),
		sameSite: "none",
		secure: true,
	});

	return res.status(200).json({ message: "Successfully logged out" });
});

export { registerUser, loginUser, logoutUser };
