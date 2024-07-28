import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Teachers from "./screens/Teachers";
import Classes from "./screens/Classes";
import Subjects from "./screens/Subjects";
import Attendance from "./screens/Attendance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </Router>
  );
}

export default App;
