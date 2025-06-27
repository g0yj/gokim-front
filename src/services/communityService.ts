import CommunityApi from "@/api/communityApi";
import { BasicBoardSearchFields } from "@/types/common/board";
import { CommunityListRes } from "@/types/community";

const CommunityService = {
    listCommunity: async (params: BasicBoardSearchFields): Promise<CommunityListRes> => {
        const res = await CommunityApi.getList(params);
        return res.data;
    }

}

export default CommunityService;