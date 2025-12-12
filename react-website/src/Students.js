import { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleAdd = async () => {
    await axios.post("http://localhost:5000/api/students", { name, email });
    setName(""); setEmail("");
    fetchStudents();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Students</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={handleAdd}>Add Student</button>

      <ul>
        {students.map(s => <li key={s._id}>{s.name} ({s.email})</li>)}
      </ul>
    </div>
  );
}
