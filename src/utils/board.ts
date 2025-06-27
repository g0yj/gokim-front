import { CommonListResponse } from "@/types/common/common";

export const getInitialRes = <T>(): CommonListResponse<T> => ({
    list: [],
    totalCount: 0,
    currentPage: 1,
    limit: 10,
    pageSize: 10,
    totalPage: 1,
    endPage: 1,
    startPage: 1,
    isFirst: true,
    isLast: false,
    hasNext: false,
    hasPrev: false,
  });