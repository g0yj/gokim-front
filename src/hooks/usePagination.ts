import { useState } from "react";

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);

  // 페이지 변경 함수
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    page,
    setPage: handlePageChange,
  };
};

export default usePagination;
