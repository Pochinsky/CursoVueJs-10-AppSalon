import express from "express";
import {
  createService,
  getServiceById,
  getServices,
  updateService,
  deleteService,
} from "../controllers/ServicesController.js";

const router = express.Router();

router.post("/", createService);
router.get("/", getServices);
router.get("/:id", getServiceById);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
