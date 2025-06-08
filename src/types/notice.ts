import { PageResponse } from './common/pagination';

export interface ListNoticeRequest {
    page?: number | string | null;
    limit?: number | string | null;
    order?: string | null;
    direction?: string | null;
    search?: string | null;
    keyword?: string | null;
}
  
export interface ListNoticeItem {
    listNumber: number;
    id: string;
    title: string;
    createDate: string;
    writerName: string;
    writerId: string;
    fileCount: number;
    view: number;
  }
  
export type ListNoticeResponse = PageResponse<ListNoticeItem>;

export interface NoticeRow  {
  id: string;
  listNumber: string | number;
  title: string;
  writerName: string;
  createDate: string;
  view: number;
}