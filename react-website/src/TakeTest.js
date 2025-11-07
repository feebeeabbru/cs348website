import { useState } from "react";
import axios from "axios";

export default function TakeTest() {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/tests/submit", {
      username,
      score: Number(score),
    });
    setMsg("✅ Test submitted!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Take a Test</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Score (0-100)"
          type="number"
          value={score}
          onChange={e => setScore(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
