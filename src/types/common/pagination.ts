export interface PageResponse<T> {
    content: T[];
    totalElements: number; // 총 게시물 갯수
    totalPages: number; // 총 페이지
    pageSize: number; // 한 페이지당 데이터 갯수 (limit)
    number: number; // 0부터 시작하는 현재 페이지 인덱스
    first: boolean;
    last: boolean;
}

export interface PageOptions {
    page: number;        // 사용자에게 보여줄 페이지 번호
    limit: number;
    search?: string;
    keyword?: string;
  }