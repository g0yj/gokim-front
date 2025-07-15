import CommunityApi from "@/api/communityApi";
import { BasicBoardSearchFields } from "@/types/common/board";
import { CommentItem } from "@/types/common/comment";
import {
  CommunityBoardCommentItem,
  CommunityBoardItem,
  CommunityBoardList,
  CommunityListRes,
  CreateCommunityBoardComment,
  ListCommunityBoardComment,
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

  listComment: async (boardId: string): Promise<CommentItem[]> => {
    const res = await CommunityApi.getListComment(boardId);
    return transformComments(res); // 변환 함수 호출
  },

  createComment: async (boardId: string, data: CreateCommunityBoardComment) : Promise<void> => {
    return await CommunityApi.postComment(boardId, data);
    
  }
};

export default CommunityService;

// 데이터 변환을 수행하는 함수
const transformComments = (serverData: CommunityBoardCommentItem[]): CommentItem[] => {
  return serverData.map(comment => {
    const transformedReplies: CommentItem[] = comment.replies.map(reply => ({
      id: reply.replyId,
      parentId: comment.id,
      content: reply.reply || '',  // null 처리
      modifiedBy: reply.modifiedBy,
      modifiedOn: reply.modifiedOn,
      isMine: reply.replyMine,
      isReply: true,
      status: reply.isSecret ? 'secret' : 'active',
      customFields: {},
      replies: [] // 대댓글은 현재 없음
    }));

    return {
      id: comment.id,
      parentId: null,
      content: comment.comment,
      modifiedBy: comment.modifiedBy,
      modifiedOn: comment.modifiedOn,
      isMine: comment.commentMine,
      isReply: false,
      status: comment.deleted ? 'deleted' : (comment.isSecret ? 'secret' : 'active'),
      customFields: {},
      replies: transformedReplies,
    };
  });
};



