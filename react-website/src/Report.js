import { useEffect, useState } from "react";
import axios from "axios";

export default function Report() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState("");
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/quizzes")
      .then((res) => setQuizzes(res.data));
  }, []);

  const fetchReport = async () => {
    if (!quizId) {
      setResults([]);
      setStats(null);
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/api/results/report?quizId=${quizId}`
    );

    setResults(res.data.results);
    setStats(res.data.stats);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quiz Report</h2>

      <select value={quizId} onChange={(e) => setQuizId(e.target.value)}>
        <option value="">Select Quiz</option>
        {quizzes.map((q) => (
          <option key={q._id} value={q._id}>
            {q.title}
          </option>
        ))}
      </select>

      <button onClick={fetchReport}>Generate Report</button>

      {stats && (
        <>
          <h3>Statistics</h3>
          <p>Average Score: {stats.avgScore.toFixed(2)}</p>
          <p>Max Score: {stats.maxScore}</p>
          <p>Min Score: {stats.minScore}</p>

          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Student</th>
                <th>Score</th>
                <th>Date Taken</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
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
    </div>
  );
}
