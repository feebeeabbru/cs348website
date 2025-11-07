import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tests/history?sortBy=${sortBy}`)
      .then(res => setHistory(res.data));
  }, [sortBy]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Test History</h2>
      <select onChange={e => setSortBy(e.target.value)}>
        <option value="date">Sort by Date</option>
        <option value="score">Sort by Score</option>
      </select>

      <table border="1" cellPadding="6" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
            <th>Date Taken</th>
          </tr>
        </thead>
        <tbody>
          {history.map(r => (
            <tr key={r._id}>
              <td>{r.username}</td>
              <td>{r.score}</td>
              <td>{new Date(r.dateTaken).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
