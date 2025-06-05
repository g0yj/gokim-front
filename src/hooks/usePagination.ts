// usePagination.js (혹은 .ts)
import { useState } from 'react';

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수

  // 페이지 변경 함수
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    page,
    setPage: handlePageChange,
    totalPages,
  };
};

export default usePagination;
