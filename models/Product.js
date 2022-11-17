import mongoose from "mongoose";

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			required: [true, "Please add product name"],
		},
		price: {
			type: Number,
			required: [true, "Please add product price"],
			default: 0.0,
		},
		description: {
			type: String,
			required: [true, "Please add product description"],
			maxLength: 300,
		},
		countInStock: {
			type: Number,
			required: [true, "Please add product quantity"],
			default: 1,
		},
		category: {
			type: String,
			required: [true, "Please add product category"],
		},
		image: {
			type: String,
			default:
				"https://www.salcom.com/assets/Uploads/Products/Images/ee6f8cd712/No-Product-Image-v2.PNG",
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
