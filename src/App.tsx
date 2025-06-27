import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import "./App.css";
import Index from "./pages/Index";
import Project from "./pages/Project";
//import BoardForm from "./components/common/Board/BoardForm";
import Notice from "./pages/notice/Notice";
import Community from "./pages/community/Community";

import Board from "./pages/anonBoard/AnonBoard";
import AnonBoardCreatePage from "./pages/anonBoard/AnonBoardCreatePage";
import AnonBoardDetailPage from "./pages/anonBoard/AnonBoardDetailPage";
import Login1 from "./pages/Login1";
import SignUp from "./pages/SSignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login1 />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />

          {/** 공지사항 */}
          <Route path="/admin/notice" element={<Notice />} />
          
          { /** 익명 게시판 */}
          <Route path="/board" element={<Board />} />
          <Route path="/anon/create" element={<AnonBoardCreatePage />} />
          <Route path="/anon/:id" element={<AnonBoardDetailPage />} />
          { /** 프로젝트 */}
          <Route path="/project" element={<Project />} />
          { /** 커뮤니티 */}
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//<Route path="/notice/:id" element={<BoardForm mode="view" resourcePath="notice" /> }/>