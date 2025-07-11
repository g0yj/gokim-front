import BasicBoard from "@/components/board/BasicBoard";
import { defaultSearchValues } from "@/constants/board";
import log from "@/lib/logger";
import CommunityService from "@/services/communityService";
import { BasicBoardSearchFields } from "@/types/common/board";
import { CommonListResponse, SelectOption, TableColumn } from "@/types/common/common";
import { CommunityBoardList, ListCommunityBoardItem } from "@/types/community";
import { getInitialRes } from "@/utils/board";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const CommunityBoardPage = () => {
  const {id} = useParams();
  const[data, setData] = useState<CommonListResponse<ListCommunityBoardItem>> (getInitialRes());

  const columns: TableColumn<ListCommunityBoardItem>[] = [
    {key:'title', label: '제목'},
    {key:'view', label: '조회수'},
    {key:'createdBy', label: '작성자'},
    {key:'createdOn', label: '작성일'},
  ]

  const limitOptions: SelectOption[] = [
    { label: '5건', value: 5 },
    { label: '10건', value: 10 },
    { label: '20건', value: 20 },   
  ]

  const searchOptions: SelectOption[] = [
    { label: '전체', value: 'all' },
    { label: '제목', value: 'title' },
    { label: '내용', value: 'content' },
    { label: '작성자', value: 'createdBy'},
  ]

  const paramQuery = useForm<BasicBoardSearchFields>({
    defaultValues: { 
      page: 1,
      limit: 10,
      search: 'all',
      keyword: '',
      order: null,
      direction: null,
      pageSize: 10,
      paramId: id 
    }
  });

  const handleSearch = async() => {
    log.debug('검색 버튼 클릭!!');
    try {
      const values = paramQuery.getValues();
      log.debug(values);
      const res = await CommunityService.listBoard(values);
      log.info('커뮤니티 게시물 목록 데이터 확인', res.list);
      setData(res);
    } catch (err) {
      log.error('커뮤니티 게시판 목록 axios 실패', err)
    }
  }

  useEffect(() => {
    handleSearch();
  }, []);

  const handlePageChange = (page: number) => {
    paramQuery.setValue('page', page);
    handleSearch();
  }

  const getDetailLink = (item: ListCommunityBoardItem) => `/community/board/${item.id}`;
  const createLink = `/community/${id}/board/create`;

  return (
    <div className='w-[800px] mt-8 mx-auto'>
      <BasicBoard
        columns={columns}
        data={{
          content: data?.list,
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

export default CommunityBoardPage;

/**
 *       <BasicBoard
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
        createLink={createLink}
      >
      </BasicBoard>
 */