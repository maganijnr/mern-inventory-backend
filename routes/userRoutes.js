import express from "express";
import {
	changePassword,
	getUserData,
	loginStatus,
	updateUserData,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddlewareHandler.js";

const router = express.Router();

router.get("/profile", protect, getUserData);
router.patch("/update-profile", protect, updateUserData);
router.patch("/change-password", protect, changePassword);
router.get("/loggedin", loginStatus);

export default router;
