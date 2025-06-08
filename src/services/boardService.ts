import BoardApi from "@/api/boardApi";
import log from "@/lib/logger";

const TAG = 'service-boardService';

const BoardService = {
    detail: async ({ id, resourcePath }: { id: string | number;  resourcePath: string}) => {
    log.debug(TAG, '게시판 상세조회 전달 데이터 >> ', {id, resourcePath});
        const res = await BoardApi.getBoard({ id, resourcePath });
        return res.data;
  },
};

export default BoardService;