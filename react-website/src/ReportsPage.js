import { useEffect, useState } from "react";
import axios from "axios";

export default function ReportsPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState("");
  const [top10, setTop10] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  // Load quizzes
  useEffect(() => {
    axios.get("http://localhost:5000/api/quizzes")
      .then(res => setQuizzes(res.data))
      .catch(err => console.error("Error loading quizzes:", err));
  }, []);

  // Fetch Top Scores
  const fetchTop10 = async () => {
    if (!quizId) return alert("Select a quiz first!");
    try {
      const res = await axios.get(`http://localhost:5000/api/results/top10?quizId=${quizId}`);
      setTop10(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Leaderboard
  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/results/leaderboard");
      setLeaderboard(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quiz Reports</h2>

      {/* Quiz selector */}
      <div style={{ marginBottom: 20 }}>
        <select value={quizId} onChange={e => setQuizId(e.target.value)}>
          <option value="">Select Quiz</option>
          {quizzes.map(q => (
            <option key={q._id} value={q._id}>{q.title}</option>
          ))}
        </select>
        <button onClick={fetchTop10} style={{ marginLeft: 10 }}>Show Top 10 Scores</button>
        <button onClick={fetchLeaderboard} style={{ marginLeft: 10 }}>Show Leaderboard</button>
      </div>

      {/* Top 3 Table */}
      {top10.length > 0 && (
        <>
          <h3>Top 10 Scores</h3>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Student</th>
                <th>Score</th>
                <th>Date Taken</th>
              </tr>
            </thead>
            <tbody>
              {top10.map(r => (
                <tr key={r._id}>
                  <td>{r.studentId?.name || "Unknown"}</td>
                  <td>{r.score}</td>
                  <td>{new Date(r.dateTaken).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Leaderboard Table */}
      {leaderboard.length > 0 && (
        <>
          <h3>Leaderboard (Avg Score)</h3>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Student</th>
                <th>Average Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, i) => (
                <tr key={i}>
                  <td>{entry.student}</td>
                  <td>{entry.avgScore.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
