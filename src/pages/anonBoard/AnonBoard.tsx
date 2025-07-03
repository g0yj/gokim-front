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

  const paramQuery = useForm<BasicBoardSearchFields>({
    defaultValues: defaultSearchValues,
  });


  const [data, setData] = useState<CommonListResponse<ListAnonBoardItem>>(getInitialRes());

  const handleSearch = async () => {
    try {
      const values = paramQuery.getValues();
      const res = await AnonBoardService.listAnonBoard(values);
      //res.list가 아닌 이유는 data 타입을 확인해보기! 
      setData(res); 
    } catch (err) {
      log.error('axios 호출 실패', err);
    }
  }

    // ✅ 최초 mount 시 조회
  useEffect(() => {
    handleSearch();
  }, []);

    const handlePageChange = (page: number) => {
      paramQuery.setValue('page', page);
      handleSearch();
  }
  
  const columns: TableColumn<ListAnonBoardItem>[] = [
    { key: 'listNumber', label: 'no', width: '5%' },
    { key: 'title', label: '제목', width: '50%'},
    { key: 'view', label: '조회수', width: '10%' },
    { key: 'createDate', label: '작성일', width: '20%'  },
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

  const getDetailLink = (item: ListAnonBoardItem) => `/anon/${item.id}`;
  const createLink = '/anon/create'

  return (
    <div className='w-[800px] mt-8 mx-auto'>
      <BasicBoard
        columns={columns}
        data={{
          content: data.list,
          page: data.currentPage,
          totalPage: data.totalPage
        }}
        paramQuery={paramQuery}
        onSearch={handleSearch}
        limitOptions={limitOptions}
        searchOptions={searchOptions}
        onPageChange={handlePageChange}
        getDetailLink={getDetailLink}
        createLink={createLink}
      >
      </BasicBoard>

    </div>
  );
};

export default AnonBoard;