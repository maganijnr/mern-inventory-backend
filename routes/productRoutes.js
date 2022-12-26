import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from "../controllers/productController.js";
import { protect, verifyAdmin } from "../middleware/authMiddlewareHandler.js";

const router = express.Router();

router.route("/").post(verifyAdmin, createProduct).get(getAllProducts);
router
	.route("/:id")
	.get(protect, getProductById)
	.delete(verifyAdmin, deleteProduct)
	.patch(verifyAdmin, updateProduct);

export default router;
