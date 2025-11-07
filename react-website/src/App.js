import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TakeTest from "./TakeTest";
import History from "./History";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "1em", background: "#f5f5f5" }}>
        <Link to="/">Take Test</Link> | <Link to="/history">View History</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TakeTest />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
