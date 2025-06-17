import { SelectOption } from "./option";

export interface BoardSearchBoxProps {
  limit: string;
  search: string;
  keyword: string;
  limitOptions: SelectOption[];
  searchOptions: SelectOption[];
  onChangeLimit: (value: string) => void;
  onChangeSearch: (value: string) => void;
  onChangeKeyword: (value: string) => void;
  onSearch: () => void;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string | number | null;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: string;
  align?: 'center';
}
  
export interface BoardTableProps<T extends object> {
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string | number;
  getRowLink?: (row: T) => string;
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