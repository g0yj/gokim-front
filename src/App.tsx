import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import "./App.css";
import Index from "./pages/Index";
import Project from "./pages/project/Project";
import Community from "./pages/community/Community";
import Board from "./pages/anonBoard/AnonBoard";
import AnonBoardCreatePage from "./pages/anonBoard/AnonBoardCreatePage";
import AnonBoardDetailPage from "./pages/anonBoard/AnonBoardDetailPage";
import Login1 from "./pages/Login1";
import SignUp from "./pages/SSignUp";
import AdminNotice from "./pages/notice/AdminNotice";
import Notice from "./pages/notice/Notice";
import { router } from "./router";



function App() {
  return <RouterProvider router={router} />;
}

export default App;


/*
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login1 />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />

          
          <Route path="/admin/notice" element={<AdminNotice />} />
          <Route path="/notice" element={<Notice />} />
          
        
          <Route path="/anon" element={<Board />} />
          <Route path="/anon/create" element={<AnonBoardCreatePage />} />
          <Route path="/anon/:id" element={<AnonBoardDetailPage />} />
        
          <Route path="/project" element={<Project />} />
     
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
*/