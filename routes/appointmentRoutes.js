import express from "express";
import {
  createAppointment,
  getAppointmentsByDate,
  getAppointmentById,
  updateAppointment,
} from "../controllers/appointmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getAppointmentsByDate)
  .post(authMiddleware, createAppointment);

router
  .route("/:id")
  .get(authMiddleware, getAppointmentById)
  .put(authMiddleware, updateAppointment);

export default router;
