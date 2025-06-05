import React from "react";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";

// data 객체의 타입 정의
interface PageNationsProps {
  data: {
    page: number; // 현재 페이지 번호
    startPage: number; // 시작 페이지 번호
    pageSize: number; // 한 페이지에 보여줄 페이지 수
    totalPage: number; // 총 페이지 수
    hasPrev: boolean; // 이전 페이지가 있는지 여부
    hasNext: boolean; // 다음 페이지가 있는지 여부
    setPage: (page: number) => void; // 페이지 변경 함수
  };
}

const PageNations: React.FC<PageNationsProps> = ({ data }) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const nextPage = Math.max(1, Math.min(value, data.totalPage)); // 페이지 범위 제한
    data.setPage(nextPage); // 상태를 변경하여 페이지 이동
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <Pagination
        count={data.totalPage} // 총 페이지 수
        page={data.page} // 현재 페이지 번호
        onChange={handlePageChange} // 페이지 변경 핸들러
        shape="rounded" // 둥근 모서리
        color="primary" // 기본 색상
        siblingCount={2} // 이전/다음 페이지 버튼과 함께 보여줄 페이지 수
        boundaryCount={1} // 첫 페이지/마지막 페이지를 표시할 개수
        renderItem={(item) => (
          <PaginationItem
            {...item}
            // a 링크 사용 안 함 (새로고침 방지)
          />
        )}
      />
    </div>
  );
};

export default PageNations;