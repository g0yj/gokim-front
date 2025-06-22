import { UseFormReturn } from "react-hook-form";

import { SelectOption, TableColumn } from "./common";


export interface BasicBoardData<Res> {
  content: Res[];
  page: number;
  totalPage: number;
}

export interface BasicBoardSearchFields {
  search: string;                       // 검색 조건
  keyword: string | null;               // 검색어
  page: number;                         // 현재 페이지 번호
  limit: number;                        // 페이지당 아이템 수
  pageSize: number;                     // 하단 페이지네이션 바에 보여줄 버튼 수
  order: string | null;                 // 정렬 기준
  direction: 'asc' | 'desc' | null;     // 정렬 방식
}

export interface BasicBoardProps<Res> {
  columns: TableColumn<Res>[];
  data: BasicBoardData<Res>;
  paramQuery: UseFormReturn<BasicBoardSearchFields>;
  onSearch: () => void;
  onPageChange: (page: number) => void;
  limitOptions: SelectOption[];
  searchOptions: SelectOption[];
}

export interface BasicBoardSearchBoxProps {
  paramQuery: UseFormReturn<BasicBoardSearchFields>;
  limits: SelectOption[];
  searches: SelectOption[];
  onSearch: () => void;
}






export interface BoardFormProps {
  mode: 'view' | 'edit' | 'create';
  id?: string | number;
  resourcePath: string;
}

export interface BoardFormData {
  id?: string | number;
  title: string;
  content: string;
  files?: BoardFile[];
}

export interface BoardFile {
  noticeFileId: number;
  originalFileName: string;
  url: string;
}