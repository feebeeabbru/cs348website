import { useEffect, useState } from "react";
import axios from "axios";

export default function TakeQuiz() {
  const [students, setStudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [quizId, setQuizId] = useState("");
  const [score, setScore] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/students").then(res => setStudents(res.data));
    axios.get("http://localhost:5000/api/quizzes").then(res => setQuizzes(res.data));
  }, []);

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/results/submit", { studentId, quizId, score: Number(score) });
    setMsg("Quiz result submitted!");
    setScore("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Take a Quiz</h2>
      <select value={studentId} onChange={e => setStudentId(e.target.value)}>
        <option value="">Select Student</option>
        {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
      </select>
      <select value={quizId} onChange={e => setQuizId(e.target.value)}>
        <option value="">Select Quiz</option>
        {quizzes.map(q => <option key={q._id} value={q._id}>{q.title}</option>)}
      </select>
      <input type="number" placeholder="Score" value={score} onChange={e => setScore(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}
