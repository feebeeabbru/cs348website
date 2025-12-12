import { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
    const [leaderboards, setLeaderboards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    "http://localhost:5000/api/results/leaderboards?limit=3"
                );
                setLeaderboards(res.data.leaderboards || []);
            } catch (err) {
                setError(err.message || "Failed to load leaderboards");
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, []);

    if (loading) return <div style={{ padding: 20 }}>Loading leaderboards...</div>;
    if (error) return <div style={{ padding: 20 }}>Error: {error}</div>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Leaderboards (Top 3 per quiz)</h2>
            {leaderboards.length === 0 && <p>No data available.</p>}

            {leaderboards.map((l) => (
                <div key={l.quiz._id} style={{ marginBottom: 20 }}>
                    <h3>{l.quiz.title}</h3>
                    <ol>
                        {l.top.map((item) => (
                            <li key={item.attemptId}>
                                <strong>{item.student?.name || "Unknown"}</strong> — {item.score}
                                <div style={{ fontSize: 12, color: "#666" }}>
                                    {new Date(item.dateTaken).toLocaleString()}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            ))}
        </div>
    );
}