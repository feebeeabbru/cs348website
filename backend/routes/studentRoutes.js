import express from "express";
import { getAllStudents, addStudent } from "../controllers/studentController.js";
const router = express.Router();

router.get("/", getAllStudents);
router.post("/", addStudent);

export default router;

