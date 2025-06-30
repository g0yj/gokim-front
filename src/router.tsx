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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children:[
            { index: true, element: <Index /> },
            { path: 'login', element: <Login1 /> },
            { path: 'signup', element: <SignUp /> },
            { path: 'notice', element: <Notice /> },
            { path: 'admin/notice', element: <AdminNotice /> },
            { path: 'anon', element: <AnonBoard /> },
            { path: 'anon/create', element: <AnonBoardCreatePage /> },
            { path: 'anon/:id', element: <AnonBoardDetailPage /> },
            { path: 'community', element: <Community /> },
            { path: 'project', element: <Project /> },
            {
                path: 'project/:projectId',
                element: <ProjectLayout />,
                children:[
                    {
                        path: 'feature/:featureType',
                        element: <FeatureRenderer/>,
                    },
                ],
            },
        ],
    },
    {
        path:'*', element: <NotFoundPage/>
    }
])