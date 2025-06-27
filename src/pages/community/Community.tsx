import BasicBoardSearchBox from '@/components/board/BasicBoardSearchBox';
import CustomPagination from '@/components/common/CustomPagination';
import CommunityCard from '@/components/community/CommunityCard';
import { defaultSearchValues } from '@/constants/board';
import log from '@/lib/logger';
import CommunityService from '@/services/communityService';
import { BasicBoardSearchFields } from '@/types/common/board';
import { CommonListResponse, SelectOption, TableColumn } from '@/types/common/common';
import { ListCommunityItem } from '@/types/community';
import { getInitialRes } from '@/utils/board';
import { useForkRef } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Community = () => {
  // 목록 api 호출
  const paramQuery = useForm<BasicBoardSearchFields>({
    defaultValues: defaultSearchValues,
  });

  const [data, setData] = useState<CommonListResponse<ListCommunityItem>>(getInitialRes);

  const onSearch = async() => {
    try{
      const values = paramQuery.getValues();
      const res = await CommunityService.listCommunity(values);
      log.debug('커뮤니티 목록 ', res)
      setData(res);
    } catch( err) {
      log.debug('axios 호출 실패' , err)
    }
  }

  useEffect(() => {
    onSearch();
  },[]);

  const onPageChange = (page: number) => {
      paramQuery.setValue('page', page);
      onSearch();
  }

  const limitOptions: SelectOption[] = [
      { label: '5건', value: 5 },
      { label: '10건', value: 10 },
      { label: '20건', value: 20 },
      { label: '50건', value: 50 },
    ]
  
    const searchOptions: SelectOption[] = [
      { label: '전체', value: 'all' },
      { label: '제목', value: 'title' },
      { label: '내용', value: 'description' },
    ]



  // 사이드 바 예정
  const items = [
    {id:'1', name:'카테고리1'},
    {id:'2', name:'카테고리2'},
  ]
  return (
    <div>
      <h3>커뮤니티 페이지</h3>
      <BasicBoardSearchBox 
        paramQuery={paramQuery} 
        limits={limitOptions} 
        searches={searchOptions} 
        onSearch={onSearch}
      ></BasicBoardSearchBox>

      <div className="flex flex-wrap">
        {data.list.map((item , idx) => (
          <CommunityCard key={idx} data={item} />
        ))}
      </div>

      <div className="w-fit mx-auto mb-4">
        <CustomPagination
              page={data.currentPage}
              totalPage={data.totalPage}
              onChange={onPageChange}
            />
      </div>
    </div>
  );
};

export default Community;