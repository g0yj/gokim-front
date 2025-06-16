
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
     
      <main className="flex-1">

      <Box sx={{ backgroundColor: '#F3F4F6', minHeight: '100vh', px: 2, py: 3 }}>
        <Outlet />
      </Box>
      
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

/**
-> flex-col : div 안에 있는것을 모두 세로 배치 (row도 있음)
-> <main>	시맨틱 태그로, 실제 콘텐츠(본문) 영역을 의미해. SEO와 접근성 측면에서 좋음
-> flex-1	flex-grow: 1이라는 뜻. 즉, 남는 공간을 이 main이 전부 차지하라는 뜻이야
 */