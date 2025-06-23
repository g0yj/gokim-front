import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import "./App.css";
import Index from "./pages/Index";
import Project from "./pages/Project";
//import BoardForm from "./components/common/Board/BoardForm";
import Notice from "./pages/Notice";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Board from "./pages/AnonBoard";
import Signup from "./pages/Signup";
import BasicBoardView from "./components/board/BasicBoardView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/notice" element={<Notice />} />
          
          <Route path="/board" element={<Board />} />
          <Route path="/anon/:id" element={<BasicBoardView />} />
          <Route path="/project" element={<Project />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//<Route path="/notice/:id" element={<BoardForm mode="view" resourcePath="notice" /> }/>