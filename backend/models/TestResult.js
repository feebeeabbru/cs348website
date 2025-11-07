import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  dateTaken: { type: Date, default: Date.now },
});

export default mongoose.model("TestResult", testResultSchema);

