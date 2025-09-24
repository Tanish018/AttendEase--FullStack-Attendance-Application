import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { addStudent, getAllStudents } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/addStudent", protectRoute, addStudent)
router.get("/getAllStudents", protectRoute, getAllStudents)

export default router;