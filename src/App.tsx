import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "../src/pages/Board";
import Signup from "./pages/Signup";
import Layout from "./layout/Layout";
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
          
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
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
