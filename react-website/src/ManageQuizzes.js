import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [editId, setEditId] = useState(null); // Track which quiz is being edited
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all quizzes from backend
  const fetchQuizzes = async () => {
    const res = await axios.get("http://localhost:5000/api/quizzes");
    setQuizzes(res.data);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Add new quiz
const handleAdd = async () => {
  if (!title || !date || !duration) return;

  try {
    await axios.post("http://localhost:5000/api/quizzes", { title, date, duration });
    clearForm();
    fetchQuizzes();
  } catch (err) {
    // Axios puts the server response in err.response
    const message = err.response?.data?.error || "Failed to add quiz";
    alert(message); // show a friendly message
  }
};


  // Edit existing quiz
  const handleEdit = async () => {
    if (!title || !date || !duration) return;
    await axios.put(`http://localhost:5000/api/quizzes/${editId}`, { title, date, duration });
    clearForm();
    setEditId(null);
    fetchQuizzes();
  };

  // Delete quiz 
  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this quiz and all associated results? This action cannot be undone.");
    if (!ok) return;

    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5000/api/quizzes/${id}`);
      await fetchQuizzes();
    } catch (err) {
      console.error("Failed to delete quiz:", err);
      alert(err.response?.data?.error || "Failed to delete quiz");
    } finally {
      setDeletingId(null);
    }
  };

  // Clear input form
  const clearForm = () => {
    setTitle("");
    setDate("");
    setDuration("");
  };

  // Load quiz data into form for editing
  const startEdit = (quiz) => {
    setEditId(quiz._id);
    setTitle(quiz.title);
    setDate(new Date(quiz.date).toISOString().split("T")[0]); // format for input[type=date]
    setDuration(quiz.duration);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Quizzes</h2>

      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <input type="number" placeholder="Duration" value={duration} onChange={e => setDuration(e.target.value)} />

      {editId ? (
        <button onClick={handleEdit}>Save Changes</button>
      ) : (
        <button onClick={handleAdd}>Add Quiz</button>
      )}

      <ul style={{ marginTop: 20 }}>
        {quizzes.map(q => (
          <li key={q._id} style={{ marginBottom: 10 }}>
            <strong>{q.title}</strong> - {new Date(q.date).toLocaleDateString()} ({q.duration} min)
            <button style={{ marginLeft: 10 }} onClick={() => startEdit(q)}>Edit</button>
            <button style={{ marginLeft: 5 }} onClick={() => handleDelete(q._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
