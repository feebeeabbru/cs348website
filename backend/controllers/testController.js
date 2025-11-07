import TestResult from "../models/TestResult.js";

export const submitTest = async (req, res) => {
  try {
    const { username, score } = req.body;
    const result = new TestResult({ username, score });
    await result.save();
    res.json({ message: "Test submitted successfully", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const { sortBy } = req.query;
    const sortOption =
      sortBy === "score" ? { score: -1 } : { dateTaken: -1 };
    const results = await TestResult.find().sort(sortOption);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

