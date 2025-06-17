import React from 'react';
import { Box, Button, MenuItem, Select, Stack, TextField } from '@mui/material';
import { BoardSearchBoxProps } from '@/types/common/board';
import Buttons from '../Buttons';



const BoardSearchBox = ({
    limit, search, keyword, limitOptions, searchOptions, onChangeLimit, onChangeSearch, onChangeKeyword, onSearch
}: BoardSearchBoxProps) => {

  // Enter 키 눌렀을 때 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();  // Enter 키로 검색 실행
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
            onChange={(e) => onChangeKeyword(e.target.value)}  // 입력값을 상태에 반영
            onKeyDown={handleKeyDown}  // 엔터 감지 이벤트
          />

        </Stack>
      </Box>

      {/* ③ 오른쪽 박스 - 비워둠 */}
      <Box />
    </Box>
  );
};


export default BoardSearchBox ;