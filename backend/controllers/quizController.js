import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";
import QuizResult from "../models/QuizResult.js";

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new quiz
export const addQuiz = async (req, res) => {
  try {
    const { title, date, duration } = req.body;

    if (!title || !date || !duration) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const quiz = new Quiz({
      title: title.trim(),
      date: new Date(date),
      duration: Number(duration),
    });

    await quiz.save();
    res.json(quiz);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Quiz title already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

// Edit quiz
export const editQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid quiz ID" });
    }

    const { title, date, duration } = req.body;

    const quiz = await Quiz.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        date: new Date(date),
        duration: Number(duration),
      },
      { new: true, runValidators: true }
    );

    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Quiz title already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

// Delete quiz + cascade delete results
export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid quiz ID" });
    }

    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const result = await QuizResult.deleteMany({ quizId: id });

    res.json({
      message: `Quiz deleted. ${result.deletedCount} associated results removed.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
