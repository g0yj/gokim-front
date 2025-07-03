import api from "@/lib/axios";
import log from "@/lib/logger";
import { BasicBoardSearchFields } from "@/types/common/board";
import { CommunityBoardDetail } from "@/types/community";

const CommunityApi = {
    getList : (params: BasicBoardSearchFields) => {
        return api.get('/community', {params});
    },

    getListBoard: (params: BasicBoardSearchFields) => {
        return api.get(`/community/board/${params.paramId}`, {params});
    },

    getBoardDetail: async (boardId: string): Promise<CommunityBoardDetail> => {
        log.debug('API: boardId: ', boardId);
        const res = await api.get(`community/board/list/${boardId}`);
        return res.data;
    }

}

export default CommunityApi;