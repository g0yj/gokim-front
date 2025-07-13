import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/store/authSlice"; // 이름 충돌 방지 위해 rename

import log from "@/lib/logger";
import CustomButton from "@/components/common/CustomButton ";
import CustomModal from "@/components/common/CustomModal";
import AuthService from "@/services/authService";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeModal = () => setIsModalOpen(false);

  // 개발자 문의 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  // localStorage에서 loginId를 가져옵니다.
  const storedLoginId = localStorage.getItem("loginId");

  const validPaths = ["/notice", "/anon", "/community", "/project"];
  const currentTabValue = validPaths.includes(location.pathname)
    ? location.pathname
    : false;

  const handleLogout = async () => {
    try {
      // 1. 서버에 로그아웃 요청
      await AuthService.logout();

      // 2. Redux 상태 초기화
      dispatch(logoutAction()); // 이름 충돌 시 alias로 사용

      // 3. 페이지 이동
      navigate("/login");
    } catch (err) {
      log.error("로그아웃 axios 호출 실패", err);
    }
  };

  const handleMailClick = () => {
    log.debug("이미지 클릭");
    setIsModalOpen(true);
  };

  const handleSendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    log.debug("전송버튼 클릭!!");
    e.preventDefault(); // 폼의 기본 동작 방지

    const formData = new FormData(e.currentTarget); // ✅ e.target을 e.currentTarget으로 변경하여 타입 일치

    // localStorage에서 loginId 값을 가져와 'userId'로 설정, null 방지
    const loginId = localStorage.getItem("loginId") || "임시사용자"; // 없으면 기본값 설정
    formData.append("userId", loginId);
    formData.append("email", "jinyjgo@gmail.com");

    // 이메일 전송 처리 로직

    closeModal();
  };

  return (
    <header className="bg-wight text-slate-800 py-3 shadow">
      <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
        {/* ✅ 왼쪽: 로고 */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="홈" className="w-10 h-10" />
          <span className="font-bold text-3xl">GoFlow</span>
        </Link>

        {/* ✅ 가운데: 탭 메뉴 */}
        <Tabs
          value={currentTabValue}
          onChange={(_, newValue) => navigate(newValue)}
          sx={{
            position: "relative",
            height: "100%",
            "& .MuiTabs-indicator": {
              bottom: 0,
              height: 3,
              backgroundColor: "#161C24", // 밑줄 색깔
            },
            "& .MuiTab-root": {
              color: "#161C24", // 탭 글자 색
              fontSize: "1rem",
              textTransform: "none",
              fontWeight: 500,
              px: 2,
              minWidth: 80,
              "&.Mui-selected": {
                fontWeight: 600,
                color: "#161C24",
              },
              "&:hover": {
                backgroundColor: "#FFFFFF", //선택 시 나오는 배경 색
              },
            },
          }}
        >
          <Tab label="공지사항" value="/notice" />
          <Tab label="익명게시판" value="/anon" />
          <Tab label="커뮤니티" value="/community" />
          <Tab label="프로젝트" value="/project" />
        </Tabs>

        {/* ✅ 오른쪽: 알림/프로필 자리 */}
        <div className="flex items-center gap-4">
          <p>{storedLoginId}</p>

          <CustomButton onClick={handleMailClick} variant="ghost">
            문의
          </CustomButton>

          {/** 모달 컴포넌트 */}
          <CustomModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            size="mail"
            variant="basic"
          >
            <form onSubmit={handleSendEmail}>
              <div>
                <h2 className="text-lg font-bold mb-4">📧 개발자 문의</h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="emailSubject"
                      className="block text-sm font-medium text-gray-700"
                    >
                      제목
                    </label>
                    <input
                      id="emailSubject"
                      name="subject" // 폼 데이터로 전송될 이름 설정
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded"
                      placeholder="제목을 입력하세요"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="emailContent"
                      className="block text-sm font-medium text-gray-700"
                    >
                      내용
                    </label>
                    <textarea
                      id="emailContent"
                      name="body" // 폼 데이터로 전송될 이름 설정
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded h-40"
                      placeholder="자세하게 적어주시면 빠른 개발에 도움이 됩니다"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <CustomButton onClick={closeModal}>취소</CustomButton>
                  <CustomButton type="submit">전송</CustomButton>
                </div>
              </div>
            </form>
          </CustomModal>

          <CustomButton onClick={handleLogout}> 로그아웃 </CustomButton>
        </div>
      </div>
    </header>
  );
};

export default Header;

/**
 -> items-center : 세로 정렬 (가운데)
 -> justify-between : 좌우 공간 균등 배붐
 -> px-4 / py-2 : 좌우 패딩 16px, 상하 패딩 8px
 -> boarder-b : 아래쪽 테두리
 -> hidden md:flex : 모바일에서는 숨김. md 이상일때 flex 표시
 -> gab-4 : 메뉴 아이템 사이 간격 16px
 -> hover:underline : 마우스 올렸을때 밑줄
 -> text-sm, rounded, hover:bg-gry-100 : 버튼 스타일용 클래스
 */
