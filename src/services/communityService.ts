import CommunityApi from "@/api/communityApi";
import { BasicBoardSearchFields } from "@/types/common/board";
import { CommunityBoardList, CommunityListRes } from "@/types/community";

const CommunityService = {
    listCommunity: async (params: BasicBoardSearchFields): Promise<CommunityListRes> => {
        const res = await CommunityApi.getList(params);
        return res.data;
    },

    listBoard: async (params: BasicBoardSearchFields): Promise<CommunityBoardList> => {
        const res = await CommunityApi.getListBoard(params);
        return res.data;
    }

}

export default CommunityService;