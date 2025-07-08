import api from "@/lib/axios";
import log from "@/lib/logger";
import NoticeDetailPage from "@/pages/notice/NoticeDetailPage";
import { BasicBoardSearchFields } from "@/types/common/board";
import { NoticeDetailItem } from "@/types/notice";


const TAG = '[api-noticeApi]';

const NoticeApi = {
    getList: async (params: BasicBoardSearchFields) => {
      log.debug(TAG, ' 공지사항 API 진입');
      return api.get('/notice', {params});
    },
    getDetail: async(id: string): Promise<NoticeDetailItem> => {
      const res = await api.get(`/notice/${id}`);
      log.info('공지사항 상세조회 데이터', res);
      return res.data;
    }
};

export default NoticeApi;

