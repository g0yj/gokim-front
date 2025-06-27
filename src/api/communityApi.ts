import api from "@/lib/axios";
import { BasicBoardSearchFields } from "@/types/common/board";

const CommunityApi = {
    getList : (params: BasicBoardSearchFields) => {
        return api.get('/community', {params});
    }

}

export default CommunityApi;