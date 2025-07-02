import api from "@/lib/axios";
import log from "@/lib/logger";
import { BasicBoardSearchFields } from "@/types/common/board";

const CommunityApi = {
    getList : (params: BasicBoardSearchFields) => {
        return api.get('/community', {params});
    },
    getListBoard: (params: BasicBoardSearchFields) => {
        return api.get(`/community/board/${params.paramId}`, {params});
    }

}

export default CommunityApi;