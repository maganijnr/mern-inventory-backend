import mongoose from "mongoose";

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		console.log(`Mongo connected successfully`);
	} catch (error) {
		console.error(error && error.message);
		process.exit(1);
	}
};

export default connectDb;
