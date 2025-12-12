import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import studentRoutes from "./routes/studentRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

import mongoSanitize from "express-mongo-sanitize";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Source - https://stackoverflow.com/q
// Posted by Ahmed Gamal, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-12, License - CC BY-SA 4.0

app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: { ...req.query },
    writable: true,
    configurable: true,
    enumerable: true,
  });
  next();
});

// removes mongodb operators like $gt, $ne, $or!!
app.use(
  mongoSanitize({
    sanitizeQuery: false, 
    replaceWith: "_",
  })
);

app.use("/api/students", studentRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/results", resultRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

