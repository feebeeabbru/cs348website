import express from "express";
import {
  submitQuizResult,
  getReport,
  getLeaderboards,
  deleteResultsByQuiz,
} from "../controllers/resultController.js";

const router = express.Router();

router.post("/submit", submitQuizResult);
router.get("/report", getReport);
router.get("/leaderboards", getLeaderboards);
router.delete("/quizzes/:quizId", deleteResultsByQuiz);

export default router;
