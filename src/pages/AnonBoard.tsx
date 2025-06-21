import BasicBoard from '@/components/board/BasicBoard';
import { defaultSearchValues } from '@/constants/board';
import log from '@/lib/logger';
import AnonBoardService from '@/services/anonBoardService';
import { ListAnonBoardItem } from '@/types/anonBoard';
import { BasicBoardSearchFields } from '@/types/common/board';
import { CommonListResponse, SelectOption, TableColumn } from '@/types/common/common';
import { getInitialRes } from '@/utils/board';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const AnonBoard = () => {
  log.debug('익명 게시판 컴포넌트 실행')

  const paramQuery = useForm<BasicBoardSearchFields>({
    defaultValues: defaultSearchValues,
  });

  const [data, setData] = useState<CommonListResponse<ListAnonBoardItem>>(getInitialRes());

  const onSearch = () => AnonBoardService.list(paramQuery, setData);

  const onPageChange = (page: number) => {
    paramQuery.setValue('page', page);
    onSearch();
  }

  useEffect(() => {
    onSearch();
  }, []);

  const columns: TableColumn<ListAnonBoardItem>[] = [
    { key: 'listNumber', label: 'no', width: '5%' },
    { key: 'title', label: '제목' },
    { key: 'view', label: '조회수' },
  ];

  const limitOptions: SelectOption[] = [
    { label: '5건', value: 5 },
    { label: '10건', value: 10 },
    { label: '20건', value: 20 },
    { label: '50건', value: 50 },
  ]

  const searchOptions: SelectOption[] = [
    { label: '전체', value: 'all' },
    { label: '제목', value: 'title' },
    { label: '내용', value: 'content' },
  ]

  return (
    <div>
      <h3>익명게시판</h3>
      <BasicBoard
        columns={columns}
        data={{
          content: data.list,
          page: data.currentPage,
          totalPage: data.totalPage
        }}
        paramQuery={paramQuery}
        onSearch={onSearch}
        limitOptions={limitOptions}
        searchOptions={searchOptions}
        onPageChange={onPageChange}
      >
      </BasicBoard>

    </div>
  );
};

export default AnonBoard;