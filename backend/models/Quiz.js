import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
});

export default mongoose.model("Quiz", quizSchema);

