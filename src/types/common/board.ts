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
  getDetailLink?: (item: Res) => string; // ✅ 함수 타입으로 변경 + optional
  createLink?: string;
}

export interface BasicBoardSearchBoxProps {
  paramQuery: UseFormReturn<BasicBoardSearchFields>;
  limits: SelectOption[];
  searches: SelectOption[];
  onSearch: () => void; // 검색
  createLink?: string;
}

export interface BasicBoardViewProps<T extends BoardFile = BoardFile> { // 왜 상속 받나? files의 T[]를 구체화 하기 위함.
  title?: string | null;
  content?: string | null;
  files?: T[];
  // 추후 파일 map 돌릴 때 key값 보장하기 위해서 인 줄 알았는데 아니네.. ?: 로 상위 컴포넌트에서 전달 안해도 에러 메세지 안나옴.
  // files.url을 가지고 key 값으로 사용하려고 했는데 굳이 없애지 않은 이유? 자세한 설명은 하단에 정리
  getFileKey?: (file: T, index: number) => string | number;  
  isMine?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

// 서버에서 파일 정보 내려줄 때 식별키의 변수명을 일치하지 않음. 변수명이 동일한것만 정의해두고 상속 받아서 사용하기 위함
export interface BoardFile {
  url: string;
  originalFileName: string;
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


/**
url이 유일하다고 보장되더라도, 실제로는 url이 없거나 중복되는 잘못된 상황이 발생할 수도 있음
그럴 경우 getFileKey로 보완해줄 수 있음
예를 들어 crypto.randomUUID()는 재렌더마다 값이 달라지므로 key로 쓰면 React diffing 성능이 나빠질 수 있음
따라서 key 결정 책임을 상위로 위임할 수 있게 getFileKey를 열어두는 게 더 안전한 설계야
 */