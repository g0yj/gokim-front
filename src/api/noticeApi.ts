import api from "@/lib/axios";
import log from "@/lib/logger";
import { ListNoticeRequest, ListNoticeResponse } from "@/types/notice";

const TAG = '[api-noticeApi]';

const NoticeApi = {
    getList: async (queryParams: ListNoticeRequest): Promise<ListNoticeResponse> => {
    log.debug(TAG, 'queryParams >>', queryParams);
    const res = await api.get<ListNoticeResponse>(`/notice/page`, { params: queryParams } );
    return res.data;
  },
};

export default NoticeApi;

