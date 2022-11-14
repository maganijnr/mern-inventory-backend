import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/connectDb.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

//Error
app.use(errorHandler);

//Run server
const startServer = async () => {
	try {
		await connectDb();

		app.listen(process.env.PORT, () => {
			console.log(`Server is running on ${process.env.PORT}`);
		});
	} catch (error) {
		conosc.error(error && error.message);
	}
};

startServer();
