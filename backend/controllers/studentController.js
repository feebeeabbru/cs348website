import Student from "../models/Student.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const student = new Student({ name, email });
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

