import NoticeApi from "@/api/noticeApi";
import log from "@/lib/logger";
import { ListNoticeRequest } from "@/types/notice";

const TAG = 'service-noticeService';

const NoticeService = {
  listNotice: async (data: ListNoticeRequest) => {
    log.debug(TAG, 'data >>', data);
    return await NoticeApi.getList(data);
  },
};

export default NoticeService;