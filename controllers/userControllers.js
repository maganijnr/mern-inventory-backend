import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const updateUserData = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const user = await User.findById(userId);

	if (user) {
		const { _id, name, email, photo, bio } = user;

		user.name = req.body.name || name;
		user.email = req.body.email || email;
		user.photo = req.body.photo || photo;
		user.bio = req.body.bio || bio;

		const updateUser = await user.save();

		res.json({
			_id: updateUser._id,
			name: updateUser.name,
			email: updateUser.email,
			bio: updateUser.bio,
			photo: updateUser.photo,
		});
	} else {
		res.status(400);
		throw new Error("User not found");
	}
});

const changePassword = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const user = await User.findById(userId);

	const { oldPassword, password } = req.body;

	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}

	if (!oldPassword || !password) {
		res.status(400);
		throw new Error("Old and new password required");
	}

	//check if old password macth password in db
	const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

	if (!isPasswordCorrect) {
		res.status(400);
		throw new Error("Old password is incorrect");
	}

	if (user && isPasswordCorrect) {
		user.password = password;
		await user.save();

		res.status(200).json("Password updated successfully");
	} else {
		res.status(400);
		throw new Error("Old password is incorrect");
	}
});

const getUserData = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const user = await User.findById(userId);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			bio: user.bio,
			photo: user.photo,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

const loginStatus = asyncHandler(async (req, res) => {
	const token = req.cookies.token;

	if (!token) {
		return res.json(false);
	}

	const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
	if (verified) {
		return res.json(true);
	} else {
		return res.json(false);
	}
});

export { getUserData, loginStatus, updateUserData, changePassword };
