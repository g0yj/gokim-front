import log from '@/lib/logger';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import CustomButton from '../common/CustomButton ';
import { BasicBoardSearchBoxProps } from '@/types/common/board';
import { Link } from 'react-router-dom';

/**
 * 검색 조건에 따라 전체 컴포넌트가 영향을 받기 때문에 상위 컴포넌트에서 onClick , onChange등 정의 하는게 맞음.
 * @returns 
 */

const BasicBoardSearchBox = ({
  paramQuery,
  limits,
  searches,
  onSearch,
  createLink,
}: BasicBoardSearchBoxProps) => {

  const { getValues, setValue, watch } = paramQuery;
  const keyword = watch('keyword'); // 실시간 감시 (글자 변경이 안 됐던 문제 해결)

  const handleLimitChange = (value: number) => {
    setValue('limit', value);
    setValue('page', 1); // 새로 조회할 때는 1페이지부터
    onSearch();
  };

  const handleSearchChange = (value: string  ) => {
    setValue('search', value);
    setValue('page', 1); // 새로 조회할 때는 1페이지부터
    onSearch();
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('keyword', e.target.value);
  };

  const handleSearchClick = () => {
    setValue('page', 1);
    onSearch();
  };

  return (

  <div className="flex justify-between items-end w-full mb-4">
    <div className="flex-shrink-0">
      <FormControl>
        <InputLabel id="limit-label">Limit</InputLabel>
        <Select
          labelId="limit-label"
          value={getValues('limit')}
          label="Limit"
          onChange={(e) => handleLimitChange(Number(e.target.value))}
        >
          {limits.map((limit) => (
            <MenuItem key={limit.label} value={limit.value}>
              {limit.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
        
    <div className="flex gap-4  w-fit">
      <FormControl>
        <InputLabel id="search-label">Search</InputLabel>
        <Select
          labelId="search-label"
          value={getValues('search')}
          label="Search"
          onChange={(e) => handleSearchChange(e.target.value)}
        >
          {searches.map((search) => (
            <MenuItem key={search.label} value={search.value}>
              {search.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Keyword"
        value={keyword}
        onChange={handleKeywordChange}
      />

      <CustomButton variant="primary" onClick={handleSearchClick}>
        검색
      </CustomButton>
      </div>

      <div>

      {createLink && (
        <Link to={createLink}>
          <CustomButton variant="primary">등록</CustomButton>
        </Link>
      )}
        
    </div>

    <div>
      <CustomButton variant='ghost'> 등록 </CustomButton>
    </div>
  </div>
  );
};

export default BasicBoardSearchBox;
