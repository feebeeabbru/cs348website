import express from "express";
import {
  getAllQuizzes,
  addQuiz,
  editQuiz,
  deleteQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

router.get("/", getAllQuizzes);
router.post("/", addQuiz);
router.put("/:id", editQuiz);
router.delete("/:id", deleteQuiz);

export default router;
