import express from "express";
import {
  createAppointment,
  getAppointmentsByDate,
} from "../controllers/appointmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getAppointmentsByDate)
  .post(authMiddleware, createAppointment);

export default router;
