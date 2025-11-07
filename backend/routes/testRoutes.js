import express from "express";
import { submitTest, getHistory } from "../controllers/testController.js";
const router = express.Router();

router.post("/submit", submitTest);
router.get("/history", getHistory);

export default router;

