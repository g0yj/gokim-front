import { BoardFile } from "./common/board";
import { CommonListResponse } from "./common/common";

export interface ListCommunityItem {
    id: string;
    title?: string| null;
    description?: string| null;
    createdBy?: string| null;
    boardId?: string | null;
    url?: number| null;
    listNumber?: number| null;
    isScrapped: boolean;
}

export type CommunityListRes = CommonListResponse<ListCommunityItem>;

export interface CreateCommunity {
    title: string;
    description?: string;
    file?: File;
}

export interface UpdateCommunity {
    title: string;
    description?: string;
    file?: File;
    isScrapped: boolean;
}

export interface CreateCommunity {
    title: string;
    description?: string;
    file?: File;
}

export interface ListCommunityBoardItem {
    id: string;
    title?: string| null;
    view?: number| null;
    createdOn: string| null;
    createdBy: string | null;
    commentCount?: number| null;
    listNumber: number| null;
    communityId: string;
}

export type CommunityBoardList = CommonListResponse<ListCommunityBoardItem>;

export interface CommunityBoardItem {
    id?: string| null;
    title?: string| null;
    content?: string| null;
    createdBy?: string| null;
    createdOn?: string| null;
    files?: BoardFile[];
    communityId?: string | null;
    view?: number| null | string;
    isMine?: boolean| null | undefined;
}