import express from "express";
import { makePayment } from "../controllers/paymentController";
import { protect } from "../middleware/authMiddlewareHandler";

const router = express.Router();

router.route("/pay").post(protect, makePayment);

export default router;
