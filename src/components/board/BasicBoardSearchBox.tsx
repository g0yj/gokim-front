import log from '@/lib/logger';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import CustomButton from '../common/CustomButton ';
import { BasicBoardSearchBoxProps } from '@/types/common/board';

/**
 * 검색 조건에 따라 전체 컴포넌트가 영향을 받기 때문에 상위 컴포넌트에서 onClick , onChange등 정의 하는게 맞음.
 * @returns 
 */

const BasicBoardSearchBox = ({
  paramQuery,
  limits,
  searches,
  onSearch,
}: BasicBoardSearchBoxProps) => {
  log.debug('검색박스 실행')
  const { getValues, setValue } = paramQuery;

  const handleLimitChange = (value: number) => {
    setValue('limit', value);
    onSearch();
  };

  const handleSearchChange = (value: string  ) => {
    setValue('search', value);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('keyword', e.target.value);
  };

  const handleSearchClick = () => {
    setValue('page', 1);
    onSearch();
  };

  return (
    <div className="flex gap-4 items-end">
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
        value={getValues('keyword')}
        onChange={handleKeywordChange}
      />

      <CustomButton variant="primary" onClick={handleSearchClick}>
        검색
      </CustomButton>
    </div>
  );
};

export default BasicBoardSearchBox;
