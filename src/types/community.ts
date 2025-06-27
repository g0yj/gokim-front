export interface ListCommunityReq {
    search?: string | null; // 검색 조건 (전체, 작성자 식별키, 제목 등)
    page?: string | null| number; // 페이징 처리 시 페이지 번호
    limit?: string | null | number; // 한 페이지에 보여 줄 게시글 갯수
    pageSize?: string | null| number; // 하단 바의 갯수
    order?: string | null; // 정렬 기준
    direction?: string | null; // 정렬 방법 (내림 desc, 오름 asc)
    keyword?: string | null; // 검색 키워드
}

export interface ListCommunityItem {
    listNumber?: number | null;
    id?: string | null;
    title?: string | null;
    description?: string | null;
    url?: string | null;
    createdBy?: string | null;
    isScrapped?: boolean | null;
    boardId?: string | null;

}

export interface ListCommunityRes {
    list?: ListCommunityItem[];
    totalCount?: number | null; // 총 게시글 갯수
    currentPage?: number | null; // 현재 페이지
    limit: number | null;
    pageSize: number | null; // 아래 보여질 페이지바 
    totalPage: number | null; 
    startPage?: number | null;
    endPage?: number | null;
    hasNext?: number | null;
    hasPrev?: number | null;
    isFirst?: boolean| null;
    isLast?: boolean | null;
}
