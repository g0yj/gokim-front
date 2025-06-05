import React from 'react';
import { Box, Button, MenuItem, Select, Stack, TextField } from '@mui/material';
import { BoardSearchBoxProps } from '@/types/common/board';
import Buttons from '../Buttons';



const BoardSearchBox = ({
    limit, search, keyword, limitOptions, searchOptions, onChangeLimit, onChangeSearch, onChangeKeyword, onSearch
}: BoardSearchBoxProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
      }}
    >
      {/* ① 왼쪽 박스 - limit 선택 */}
      <Box>
        <Select
          value={limit}
          onChange={(e) => onChangeLimit(e.target.value)}
          size="small"
          sx={{ fontSize: '0.875rem', height: '30px', padding: '4px' }}
        >
          {limitOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* ② 가운데 박스 - 검색 조건 */}
      <Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <Select
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
            size="small"
            sx={{ minWidth: 100 , fontSize: '0.875rem' , height: '30px', padding: '4px' }} 
          >
            {searchOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>

          <TextField
            value={keyword}
            onChange={(e) => onChangeKeyword(e.target.value)}
            placeholder="검색어 입력"
            size="small"
            sx={{
              minWidth: 400,
              fontSize: '0.875rem',
              '& .MuiInputBase-root': {
                height: '30px',        // input 높이 설정
                padding: '4px',        // 내부 여백 설정
              },
              '& .MuiInputBase-input': {
                fontSize: '0.875rem',  // input 글자 크기 설정
              },
              '& .MuiInputBase-input::placeholder': {
                fontSize: '0.875rem',   // placeholder 글자 크기 설정
                color: '#888',         // placeholder 색상 설정
              },
            }}
            onKeyDown={handleKeyDown}  // 엔터 감지 이벤트
          />

          <Buttons
                  onClick={onSearch} // 버튼 클릭 시 onSearch 함수 실행
                  style={{
                    backgroundColor: '#F3F4F6',
                    color: '#000',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
                    height: '25px',           // 버튼 높이 25px로 설정
                    minWidth: 'auto',         // 최소 너비 설정
                    padding: '0 12px',        // 좌우 패딩 설정
                    fontSize: '0.800rem',     // 글씨 크기 설정
                    lineHeight: '25px',       // 수직 중앙 정렬
                    borderRadius: '10px',      // 버튼 모서리 둥글게
                  }}
                >
                  검색
          </Buttons>

        </Stack>
      </Box>

      {/* ③ 오른쪽 박스 - 비워둠 */}
      <Box />
    </Box>
  );
};


export default BoardSearchBox ;