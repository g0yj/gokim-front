import CommunityApi from "@/api/communityApi";
import log from "@/lib/logger";
import { BasicBoardSearchFields } from "@/types/common/board";
import {
  CommunityBoardItem,
  CommunityBoardList,
  CommunityListRes,
} from "@/types/community";

const CommunityService = {
  listCommunity: async (
    params: BasicBoardSearchFields
  ): Promise<CommunityListRes> => {
    const res = await CommunityApi.getList(params);
    return res.data;
  },

  listBoard: async (
    params: BasicBoardSearchFields
  ): Promise<CommunityBoardList> => {
    const res = await CommunityApi.getListBoard(params);
    return res.data;
  },

  boardDetail: async (boardId: string): Promise<CommunityBoardItem> => {
    return await CommunityApi.getBoardItemDetail(boardId);
  },

  deleteCommunityBoard: async (boardId: string): Promise<void> => {
    return await CommunityApi.deleteCommunityBoard(boardId);
  },

  updateCommunityBoard: async (
    formData: FormData,
    boardId: string
  ): Promise<void> => {
    return await CommunityApi.putCommunityBoard(formData, boardId);
  },

  createCommunityBoard: async (
    formData: FormData,
    communityId: string
  ): Promise<void> => {
    return await CommunityApi.postCommunityBoard(formData, communityId);
  },

  createCommunity: async (formData: FormData): Promise<void> => {
    return await CommunityApi.postCommunity(formData);
  },

  updateCommunity: async (id: string, formData: FormData): Promise<void> => {
    return await CommunityApi.putCommunity(id, formData);
  },

  toggleScrap: async (
    communityId: string,
    isScrapped: boolean
  ): Promise<void> => {
    if (isScrapped) {
      return await CommunityApi.deleteScrap(communityId);
    } else {
      return await CommunityApi.postScrap(communityId);
    }
  },
};

export default CommunityService;
