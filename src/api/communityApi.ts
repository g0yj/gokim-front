import api from "@/lib/axios";
import log from "@/lib/logger";
import { BasicBoardSearchFields } from "@/types/common/board";
import { CommunityBoardItem } from "@/types/community";

const CommunityApi = {
    getList : (params: BasicBoardSearchFields) => {
        return api.get('/community', {params});
    },

    getListBoard: (params: BasicBoardSearchFields) => {
        return api.get(`/community/board/${params.paramId}`, {params});
    },

    getBoardItemDetail: async (boardId: string): Promise<CommunityBoardItem> => {
        log.debug('Api: boardDetail', boardId);
        const res = await api.get(`/community/board/list/${boardId}`);
        return res.data;
    },

    deleteCommunityBoard: async (boardId: string): Promise<void> => {
        log.debug('삭제 api 호출 boardId: ' , boardId);
        return await api.delete(`/community/board/${boardId}`);
    },

    putCommunityBoard: async (formData: FormData, boardId: string): Promise<void> => {
        log.debug('커뮤니티 게시판 수정 api 호출. boardId: ', boardId);
        log.logFormData(formData);
        return await api.put(`/community/board/${boardId}`, formData);
    },

    postCommunityBoard: async (formData: FormData, communityId: string): Promise<void> => {
        log.debug('커뮤니티 게시글 등록 api. communityId: ', communityId);
        log.logFormData(formData);
        return await api.post(`/community/board/${communityId}`, formData);
    }

}

export default CommunityApi;