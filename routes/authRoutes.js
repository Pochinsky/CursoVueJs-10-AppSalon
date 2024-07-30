import express from "express";
import {
  register,
  verifyAccount,
  login,
  forgotPassword,
  user,
  verifyPasswordResetToken,
  updatePassword,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify/:token", verifyAccount);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router
  .route("/forgot-password/:token")
  .get(verifyPasswordResetToken)
  .post(updatePassword);

// private routes
router.get("/user", authMiddleware, user);

export default router;
