import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: { type: Number, required: true },
  dateTaken: { type: Date, default: Date.now },
});

// index for result report
quizResultSchema.index({ quizId: 1, dateTaken: -1 });

// index for leaderboard
quizResultSchema.index({ quizId: 1, score: -1 }); 

export default mongoose.model("QuizResult", quizResultSchema);

