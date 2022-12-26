import express from "express";
import {
	createOrder,
	deleteOrder,
	getAllOrders,
	getUserOrder,
	updateOrder,
} from "../controllers/orderController.js";
import { protect, verifyAdmin } from "../middleware/authMiddlewareHandler.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(verifyAdmin, getAllOrders);
router
	.route("/:id")
	.get(protect, getUserOrder)
	.patch(protect, updateOrder)
	.delete(protect, deleteOrder);

export default router;
