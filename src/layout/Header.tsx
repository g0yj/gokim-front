import { Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/favicon.ico'; 


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="flex items-end bg-slate-800 px-4 pt-3 pb-0 h-16">
      {/* 로고 - 가운데 정렬 + 사이즈 조절 */}
      <Link to="/" className='mr-4 flex items-center h-full'>
        <img
          src={logo}
          alt="홈"
          className="w-12 h-12 object-contain"
        />
      </Link>

      {/* 탭 메뉴 */}
      <div className="flex-1">
        <Tabs
          value={location.pathname}
          onChange={(_, newValue) => navigate(newValue)}
          sx={{
            height: '100%',
            alignItems: 'flex-end',
            position:'relative',
            '& .MuiTab-root': {
              color: '#ffffff',
              fontSize: '1rem',
              minWidth: 80,
              paddingBottom: '12px',
              px: 2,
              textTransform: 'none',
              fontWeight: 500,
              alignItems:'end',
              '&.Mui-selected': {
                color: '#ffffff',
                fontWeight: 600,
              },
              '&:hover': {
                backgroundColor: '#334155',
              },
            },
            // 밑줄
            '& .MuiTabs-indicator': {
              backgroundColor: '#ffffff',
              position: 'absolute',
              bottom: 0,
            },
          }}
        >
          <Tab label="공지사항" value="/notice" />
          <Tab label="익명게시판" value="/board" />
          <Tab label="커뮤니티" value="/community" />
          <Tab label="프로젝트" value="/project" />
        </Tabs>
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