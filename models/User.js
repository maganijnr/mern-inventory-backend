import mongoose from "mongoose";

const userModel = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Enter a valid Email",
			],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: 6,
		},

		photo: {
			type: String,
			required: [true, "Photo is required"],
			default:
				"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fdefault-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-image209162840&psig=AOvVaw07-DU4BHf3dVrZn9T3I5rw&ust=1668259303136000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKDxy6ucpvsCFQAAAAAdAAAAABAE",
		},
		bio: {
			type: String,
			maxLength: 300,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userModel);

export default User;
