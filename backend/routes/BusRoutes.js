import express from "express";
import {
  addBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus
} from "../controllers/BusController.js";
import { verifyToken, authorize } from "../middlewares/VerifyToken.js";
import { ROLES } from "../constants/RoleConstants.js";

const router = express.Router();

// CRUD endpoints
router.post("/", verifyToken, authorize([ROLES.ADMIN]), addBus);          // Create
router.get("/", verifyToken, authorize([ROLES.ADMIN, ROLES.USER]), getAllBuses); // Read all
router.get("/:id", verifyToken, authorize([ROLES.ADMIN, ROLES.USER]), getBusById); // Read one
router.put("/:id", verifyToken, authorize([ROLES.ADMIN]), updateBus);     // Update
router.delete("/:id", verifyToken, authorize([ROLES.ADMIN]), deleteBus);  // Delete

export default router;
