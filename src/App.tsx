import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "../src/pages/Board";
import Login from "../src/pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/common/Layout";
import "./App.css";
import Index from "./pages/Index";
import Project from "./pages/Project";
import Login_yj from "./pages/Login_yj";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 임시주석처리용용 */}
        <Route path="/login" element={<Login_yj />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login_yj />} />
        {/* 임시주석처리용용 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Login_yj />} />
          <Route path="/board" element={<Board />} />
          <Route path="/index" element={<Index />} />
          <Route path="/project" element={<Project />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
