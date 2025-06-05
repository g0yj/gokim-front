import BoardSearchBox from '@/components/common/Board/BoardSearchBox ';
import BoardTable from '@/components/common/Board/BoardTable';
import log from '@/lib/logger';
import NoticeService from '@/services/noticeService';
import { TableColumn } from '@/types/common/board';
import { SelectOption } from '@/types/common/option';
import { ListNoticeItem, ListNoticeRequest, ListNoticeResponse } from '@/types/notice';
import React, { useCallback, useEffect, useState } from 'react';
import PageNations from '@/components/common/PageNations';
import usePagination from '@/hooks/usePagination';

const NoticeList = () => {
  const [data, setData] = useState<ListNoticeResponse | null>(null);
  const [list, setList] = useState<ListNoticeItem[]>([]);
  // usePagination 훅을 사용하여 페이지네이션 상태와 함수 관리
  const { page, setPage, totalPages } = usePagination(1);

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
    { label: "제목", value: "title" },
    { label: "작성자", value: "writerId" },
    { label: "전체", value: "all" }
  ];

  // 컬럼 정보
  const columns: TableColumn[] = [
    { field: 'listNumber', headerName: 'No.', align: 'center', width: 60 },
    { field: 'title', headerName: '제목', align: 'center' },
    { field: 'writerName', headerName: '작성자', align: 'center', width: 100 },
    { field: 'createDate', headerName: '작성일', align: 'center', width: 120 },
    { field: 'view', headerName: '조회수', align: 'center', width: 80 },

  ];

  
    //데이터 정보
  const rows = list.map((item) => ({
    ...item, // 기존 데이터 유지
    title: item.fileCount > 0
      ? `${item.title} [${item.fileCount}]` // 템플릿 리터럴로 문자열로 결합
      : item.title, // fileCount가 없으면 그냥 title만 표시
  }));


  // 데이터 로드 함수
  const loadNotices = async () => {
    try {
      const res = await NoticeService.listNotice({
        page: page,
        limit: 10,
      });
      setList(res.content);
      setData(res);
    } catch (error) {
      console.error('공지사항 불러오기 실패', error);
    }
  };
  // 페이지가 변경될 때마다 데이터 로드
  useEffect(() => {
    loadNotices();
  }, [page]); // page가 바뀔 때마다 데이터를 새로 불러옵니다.

  // data나 list 상태가 업데이트될 때마다 로그 출력 (이제 정상적으로 업데이트된 데이터를 로그로 출력)
  useEffect(() => {
      log.debug("✅ Data >> res : ", data); // data 상태가 업데이트될 때마다 실행
  }, [data]); // data 상태가 변경될 때마다 실행

  useEffect(() => {
      log.debug("✅ Notice >> res : ", list); // list 상태가 변경될 때마다 실행
  }, [list]); // list 상태가 변경될 때마다 실행

   // 검색 실행 핸들러
   const handleSearch = () => {
    // 검색 처리 로직 추가 예정
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
      <BoardTable columns={columns} rows={rows} />
      
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