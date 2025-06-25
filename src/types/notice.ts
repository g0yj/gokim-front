import { BoardFile } from './common/board';
import { CommonListResponse } from './common/common';
import { PageResponse } from './common/pagination';

export interface ListNoticeItem {
    listNumber?: number | null;
    id?: string | null;
    title?: string | null;
    createDate?: string | null;
    writerName?: string | null;
    writerId?: string | null;
    fileCount?: number| null;
    view?: number| null;
  }
  
export type ListNoticeRes = CommonListResponse<ListNoticeItem>;
