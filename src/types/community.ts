import { CommonListResponse } from "./common/common";

export interface ListCommunityItem {
    id?: string| null;
    title?: string| null;
    description?: string| null;
    createdBy?: string| null;
    boardId?: string | null;
    url?: number| null;
    listNumber?: number| null;
    isScrapped?: boolean| null;
}

export type CommunityListRes = CommonListResponse<ListCommunityItem>;

export interface ListCommunityBoardItem {
    id: string;
    title?: string| null;
    view?: number| null;
    createdOn: string| null;
    createdBy: string | null;
    commentCount?: number| null;
    listNumber: number| null;
    boardId: string;
}

export type CommunityBoardList = CommonListResponse<ListCommunityBoardItem>;