import express from "express";
import {
	createCart,
	deleteCartItem,
	getUserCart,
	updateCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddlewareHandler.js";

const router = express.Router();

router.route("/").post(protect, createCart);
router
	.route("/:id")
	.get(protect, getUserCart)
	.delete(protect, deleteCartItem)
	.patch(protect, updateCart);

export default router;
