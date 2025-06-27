import BasicBoard from '@/components/board/BasicBoard';
import { defaultSearchValues } from '@/constants/board';
import log from '@/lib/logger';
import NoticeService from '@/services/noticeService';
import { BasicBoardSearchFields } from '@/types/common/board';
import { CommonListResponse, SelectOption, TableColumn } from '@/types/common/common';
import { ListNoticeItem, ListNoticeRes } from '@/types/notice';
import { getInitialRes } from '@/utils/board';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Notice = () => {
  
  const paramQuery = useForm<BasicBoardSearchFields>({
    defaultValues: defaultSearchValues,
  })

  const [data, setData] = useState<CommonListResponse<ListNoticeItem>>(getInitialRes());

  // 검색 시 사용
  const onSearch = async () => {
    try {
      const values = paramQuery.getValues();
      const res = await NoticeService.listNotice(values);
      log.info('page에 호출된 데이터', res);
      setData(res);
    } catch(err) {
      log.error('호출 실패', err)
    }
  }

  useEffect(()=> {
    onSearch();
  }, []);

    useEffect(() => {
    log.info('data.list의 현재값:', data.list);
    if (data.list.length === 0) {
      log.warn('data.list가 빈 배열입니다.');
    }
  }, [data.list]); // `data.list` 상태를 감지하여 실행
  

  const onPageChange = (page : number) => {
    paramQuery.setValue('page', page);
    onSearch();
  }

  const columns: TableColumn<ListNoticeItem>[] = [
    {key:'listNumber', label: 'no', width: '5%'},
    {key:'title', label: '제목', width: '50%'},
    {key:'createdBy', label: '작성자', width: '15%'},
    {key:'view', label: '조회수', width: '10%'},
    {key:'createdOn', label: '등록일', width: '20%'},
  ]

  const limitOptions: SelectOption[] = [
    { label: '5건', value: 5 },
    { label: '10건', value: 10 },
    { label: '20건', value: 20 },
  ]

  const searchOptions: SelectOption[] = [
    { label: '전체', value: 'all' },
    { label: '제목', value: 'title' },
    { label: '작성자', value: 'writerId' },
  ]

  const getDetailLink = (item: ListNoticeItem) => `/notice/${item.id}`;


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
        onSearch={onSearch}
        limitOptions={limitOptions}
        searchOptions={searchOptions}
        onPageChange={onPageChange}
        getDetailLink={getDetailLink}
      >
      </BasicBoard>

    </div>
  );
};

export default Notice;