import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecords, saveAttendance } from "../controllers/attendance.controller.js";


const router = express.Router();

router.post("/", protectRoute, saveAttendance)
router.get("/getRecords", protectRoute, getRecords)

export default router;