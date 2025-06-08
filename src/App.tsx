import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "../src/pages/Board";
import Signup from "./pages/Signup";
import Layout from "./components/common/Layout";
import "./App.css";
import Index from "./pages/Index";
import Project from "./pages/Project";
import Login from "./pages/Login";
import NoticeList from "./pages/NoticeList";
import BoardForm from "./components/common/Board/BoardForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 임시주석처리용용 */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
        {/* 임시주석처리용용 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/board" element={<Board />} />
          <Route path="/index" element={<Index />} />
          <Route path="/project" element={<Project />} />
          <Route path="/notice" element={<NoticeList />} />
          <Route path="/notice/:id" element={<BoardForm mode="view" resourcePath="notice" />}
      />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
