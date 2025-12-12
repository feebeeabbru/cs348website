import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ManageQuizzes from "./ManageQuizzes";
import TakeQuiz from "./TakeQuiz";
import Report from "./Report";
import Students from "./Students";
import Leaderboard from "./Leaderboard";
function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "1em", background: "#f5f5f5" }}>
        <Link to="/">Manage Quizzes</Link> | 
        <Link to="/take">Report Quiz</Link> | 
        <Link to="/report">Quiz Statistics</Link> | 
        <Link to="/leaderboard">Leaderboards</Link> | 
        <Link to="/students">Students</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ManageQuizzes />} />
        <Route path="/take" element={<TakeQuiz />} />
        <Route path="/report" element={<Report />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
