import QuizResult from "../models/QuizResult.js";
import Quiz from "../models/Quiz.js";
import mongoose from "mongoose";

// submit quiz result
export const submitQuizResult = async (req, res) => {
  try {
    const { studentId, quizId, score } = req.body;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ error: "Invalid quizId" });
    }

    const result = new QuizResult({ studentId, quizId, score });
    await result.save();

    res.json({ message: "Result submitted", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get report by quizId
export const getReport = async (req, res) => {
  try {
    const { quizId, from, to } = req.query;

    const filter = {};
    if (quizId) filter.quizId = quizId;
    if (from || to) filter.dateTaken = {};
    if (from) filter.dateTaken.$gte = new Date(from);
    if (to) filter.dateTaken.$lte = new Date(to);

    const results = await QuizResult.find(filter)
      .populate("studentId") // this works here
      .populate("quizId");

    const stats = {
      count: results.length,
      avgScore:
        results.reduce((sum, r) => sum + r.score, 0) /
        (results.length || 1),
      maxScore: results.reduce((m, r) => Math.max(m, r.score), 0),
      minScore: results.reduce((m, r) => Math.min(m, r.score), 100),
    };

    res.json({ stats, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Leaderboards (top N per quiz) with populated students
export const getLeaderboards = async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;
  
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const leaderboards = await QuizResult.aggregate([
      // join quizzes
      {
        $lookup: {
          from: "quizzes",
          localField: "quizId",
          foreignField: "_id",
          as: "quiz",
        },
      },
      { $unwind: "$quiz" },

      // join students
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },
      { $unwind: "$student" },

      // sort by score descending
      // index :)
      { $sort: { quizId: 1, score: -1 } },

      // group by quiz
      {
        $group: {
          _id: "$quizId",
          quiz: { $first: "$quiz" },
          top: {
            $push: {
              attemptId: "$_id",
              student: "$student",
              score: "$score",
              dateTaken: "$dateTaken",
            },
          },
        },
      },

      // take top N
      {
        $project: {
          quiz: 1,
          top: { $slice: ["$top", limit] },
        },
      },
    ]);

    res.json({ leaderboards });
    
    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    res.status(500).json({ error: err.message });
    await session.abortTransaction();
    session.endSession();
    throw err
  }

};


// Delete results for a quiz
export const deleteResultsByQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ error: "Invalid quizId" });
    }

    const result = await QuizResult.deleteMany({ quizId });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
