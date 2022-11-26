import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	getTotalProducts,
	updateProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddlewareHandler.js";
import { upload } from "../utils/fileUpload.js";

const router = express.Router();

router.route("/").post(protect, createProduct).get(getAllProducts);
router.route("/totalProducts").get(getTotalProducts);
router
	.route("/:id")
	.get(protect, getProductById)
	.delete(protect, deleteProduct)
	.patch(protect, updateProduct);

export default router;

//upload.array("image")
