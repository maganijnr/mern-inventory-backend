import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/connectDb.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import * as Cloudinary from "cloudinary";

dotenv.config();
const app = express();

//Middleware
app.use(
	cors({
		origin: ["http://localhost:3000", "https://eubond-mern-admin"],
		credentials: true,
	})
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/uploads", uploadRoutes);

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
