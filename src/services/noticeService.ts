import NoticeApi from "@/api/noticeApi";
import log from "@/lib/logger";
import { BasicBoardSearchFields } from "@/types/common/board";
import { ListNoticeRes } from "@/types/notice";

const TAG = 'service-noticeService';

const NoticeService = {
  listNotice: async (params: BasicBoardSearchFields): Promise<ListNoticeRes> => {
    const res = await NoticeApi.getList(params);
    return res.data;
  },
};

export default NoticeService;