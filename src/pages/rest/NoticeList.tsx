import BoardSearchBox from '@/components/common/Board/BoardSearchBox ';
import BoardTable from '@/components/common/Board/BoardTable';
import log from '@/lib/logger';
import NoticeService from '@/services/noticeService';
import { TableColumn } from '@/types/common/board';
import { SelectOption } from '@/types/common/option';
import { ListNoticeItem, ListNoticeRequest, ListNoticeResponse, NoticeRow } from '@/types/notice';
import React, { useCallback, useEffect, useState } from 'react';
import PageNations from '@/components/common/PageNations';
import usePagination from '@/hooks/usePagination';

const NoticeList = () => {
  const [data, setData] = useState<ListNoticeResponse | null>(null);
  const [list, setList] = useState<ListNoticeItem[]>([]);
  // usePagination 훅을 사용하여 페이지네이션 상태와 함수 관리
  const { page, setPage } = usePagination(1);

  // 검색 상태
  const [limit, setLimit] = useState("10");
  const [search, setSearch] = useState("all");
  const [keyword, setKeyword] = useState("");

  // limit 옵션
  const limitOptions: SelectOption[] = [
    { label: "10건", value: 10 },
    { label: "20건", value: 20 },
    { label: "50건", value: 50 }
  ];

  // 검색 기준 옵션
  const searchOptions: SelectOption[] = [
    { label: "전체", value: "all" },
    { label: "제목", value: "title" },
    { label: "작성자", value: "writerId" },
  ];

  const columns:  TableColumn<NoticeRow>[]= [
    { key: 'listNumber', label: 'No.' , width: '10%' },
    { key: 'title', label: '제목',  width: '50%'},
    { key: 'writerName', label: '작성자',  width: '10%' },
    { key: 'createDate', label: '작성일',  width: '20%' },
    { key: 'view', label: '조회수' , width: '10%' },
  ];

    //데이터 정보
    const rows: NoticeRow[] = list.map((item, index) => ({
      id: item.id,
      listNumber: item.listNumber,
      title: item.fileCount > 0
        ? `${item.title} [${item.fileCount}]`
        : item.title,
      writerName: item.writerName,
      createDate: item.createDate,
      view: item.view,
    }));


  // 데이터 로드 함수 (검색 조건 포함)
  const noticeList = useCallback(async () => {
    try {
      const res: ListNoticeResponse = await NoticeService.listNotice({
        page: page,
        limit: limit,
        search: search,
        keyword: keyword
      });
      setList(res.content);
      setData(res);
      log.debug("✅ API 호출 성공: ", res);
    } catch (err) {
      log.error(`공지사항 불러오기 실패 `, err);
    }
  }, [page, limit, search, keyword]);  // 페이지, 검색, 키워드가 변경될 때마다 호출

  // 최초 실행 시 한 번 호출
  useEffect(() => {
    noticeList();
  }, [noticeList]); // 검색 조건이나 페이지가 변경될 때마다 실행

  // 검색 실행 핸들러
  const handleSearch = () => {
    setPage(1);  // 검색 시 첫 페이지로 리셋
    noticeList(); // 검색 조건에 맞춰 데이터 로드
  };

  // 페이지 변경 함수 (공통으로 사용)
  const handlePageChange = (newPage: number) => {
    setPage(newPage); // 페이지 상태를 업데이트하고, 데이터를 다시 불러옴
  };
  

  return (
    <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
      <h1>공지사항</h1>

      {/** 상단 검색 조건  */}
      <BoardSearchBox
        limit={limit}
        search={search}
        keyword={keyword}
        onChangeLimit={setLimit}
        onChangeSearch={setSearch}
        onChangeKeyword={setKeyword}
        onSearch={handleSearch}
        limitOptions={limitOptions}
        searchOptions={searchOptions}
      />

      {/** 테이블 */}
      <BoardTable<NoticeRow>
        columns={columns}
        rows={rows}
        getRowKey={(row) => row.id}
        getRowLink={(row) => `/notice/${row.id}`} />
      
      {/* 페이지네이션 */}
      {data && (
        <PageNations
          data={{
            page: page, // 현재 페이지
            startPage: 1,
            totalPage: data.totalPages, // 총 페이지 수
            pageSize: 10, // 한 페이지의 항목 수
            hasPrev: page > 1, // 이전 페이지 여부
            hasNext: page < data.totalPages, // 다음 페이지 여부
            setPage: handlePageChange, // 페이지 변경 함수
          }}
        />
      )}
    </div>
  );
};

export default NoticeList;