import api from "@/lib/axios";
import log from "@/lib/logger";
import { BasicBoardSearchFields } from "@/types/common/board";


const TAG = '[api-noticeApi]';

const NoticeApi = {
    getList: async (params: BasicBoardSearchFields) => {
      log.debug(TAG, ' 공지사항 API 진입');
      return api.get('/notice', {params});
    },
};

export default NoticeApi;

