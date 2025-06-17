import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
     
      <main className="flex-1 bg-slate-200 ">
        <div className="max-w-screen-xl mx-auto px-4"> {/*max-w-screen-xl mx-auto : 본문 최대 너비 제한 + 가운데 정렬*/}
          <Outlet />
        </div>
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