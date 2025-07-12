import NoticeApi from "@/api/noticeApi";
import log from "@/lib/logger";
import Notice from "@/pages/notice/Notice";
import { BasicBoardSearchFields } from "@/types/common/board";
import { ListNoticeRes, NoticeDetailItem } from "@/types/notice";

const TAG = "service-noticeService";

const NoticeService = {
  listNotice: async (
    params: BasicBoardSearchFields
  ): Promise<ListNoticeRes> => {
    const res = await NoticeApi.getList(params);
    return res.data;
  },

  detail: async (id: string): Promise<NoticeDetailItem> => {
    return await NoticeApi.getDetail(id);
  },
};

export default NoticeService;
