import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import Login1 from "./pages/Login1";
import SignUp from "./pages/SSignUp";
import Notice from "./pages/notice/Notice";
import AdminNotice from "./pages/notice/AdminNotice";
import AnonBoard from "./pages/anonBoard/AnonBoard";
import AnonBoardCreatePage from "./pages/anonBoard/AnonBoardCreatePage";
import AnonBoardDetailPage from "./pages/anonBoard/AnonBoardDetailPage";
import Project from "./pages/project/Project";
import Community from "./pages/community/Community";
import ProjectLayout from "./pages/project/ProjectLayout";
import FeatureRenderer from "./pages/project/FeatureRenderer";
import NotFoundPage from "./pages/NotFoundPage";
import CommunityBoardPage from "./pages/community/CommunityBoardPage";
import CommunityBoardDetailPage from "./pages/community/CommunityBoardDetailPage";
import CommunityBoardCreatePage from "./pages/community/CommunityBoardCreatePage";
import NoticeDetailPage from "./pages/notice/NoticeDetailPage";

// 모든 라우트 정의
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Index /> },
  
        // 공지사항
        { path: "notice", element: <Notice /> },
        { path: "notice/:id", element: <NoticeDetailPage /> },
        { path: "admin/notice", element: <AdminNotice /> },
  
        // 익명 게시판
        { path: "anon", element: <AnonBoard /> },
        { path: "anon/create", element: <AnonBoardCreatePage /> },
        { path: "anon/:id", element: <AnonBoardDetailPage /> },
  
        // 커뮤니티 게시판 
        { path: "community", element: <Community /> },
        { path: "community/:id", element: <CommunityBoardPage /> },
        { path: "community/board/create", element: <CommunityBoardCreatePage /> },
        { path: "community/board/:boardId", element: <CommunityBoardDetailPage /> },

  
        // 프로젝트 (중첩 쓰는 경우는 Outlet 사용시에 가능)
        { path: "project", element: <Project /> },
        {
          path: "project/:projectId",
          element: <ProjectLayout />,
          children: [
            {
              path: "feature/:featureType",
              element: <FeatureRenderer />,
            },
          ],
        },
      ],
    },
  
    // 레이아웃 제외한 경로
    { path: "/login", element: <Login1 /> },
    { path: "/signup", element: <SignUp /> },
    { path: "*", element: <NotFoundPage /> },
  ]);