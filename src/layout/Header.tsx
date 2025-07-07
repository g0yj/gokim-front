import { Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import log from '@/lib/logger';


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch  = useDispatch();
  // localStorage에서 loginId를 가져옵니다.
  const storedLoginId = localStorage.getItem('loginId');

  const validPaths = ["/notice", "/anon", "/community", "/project"];
  const currentTabValue = validPaths.includes(location.pathname) ? location.pathname : false;


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
            position: 'relative',
            height: '100%',
            '& .MuiTabs-indicator': {
              bottom: 0,
              height: 3,
              backgroundColor: '#161C24', // 밑줄 색깔
            },
            '& .MuiTab-root': {
              color: '#161C24', // 탭 글자 색
              fontSize: '1rem',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              minWidth: 80,
              '&.Mui-selected': {
                fontWeight: 600,
                color: '#161C24',
              },
              '&:hover': {
                backgroundColor: '#FFFFFF', //선택 시 나오는 배경 색
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
          <button className="relative">
            <span>로그아웃</span>
          </button>
          
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