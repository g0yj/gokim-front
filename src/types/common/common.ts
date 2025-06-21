// 목록 출력하는 api 호출 시 전달 데이터 형식이 동일하기 때문에 공통으로 뺌
export interface CommonListResponse<T> {
    list: T[]; // api 호출해서 가져온 실제 데이터 목록
    totalCount: number;
    currentPage: number;
    limit: number;
    pageSize: number;
    totalPage: number;
    endPage: number;
    startPage: number;
    isFirst: boolean; //현재 페이지가 정확히 1인지 여부
    isLast: boolean;
    hasNext: boolean;
    hasPrev: boolean; // 페이지네이션 블럭에서 ‘이전’ 버튼을 보여줘야 하는지 여부 ( 예: << < 6 7 8 9 10 > >> 중 < 버튼 노출 판단용)
}
  
// 테이블 설정
export interface TableColumn<T> {
    key: keyof T;
    label: string | number | null;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
    width?: string;
    align?: 'center';
  }
  
export interface CustomTableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
}
  
export interface SelectOption {
    label: string;
    value: string | number;
}