
import { CommonListResponse } from './common/common';


export interface ListNoticeItem {
    listNumber?: number | null;
    id?: string | null;
    title?: string | null;
    createdOn?: string | null;
    createdBy?: string | null;
    fileCount?: number| null;
    view?: number| null;
  }
  
export type ListNoticeRes = CommonListResponse<ListNoticeItem>;
