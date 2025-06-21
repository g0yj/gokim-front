import api from "@/lib/axios";
import log from "@/lib/logger";
import { AnonBoardListRes } from "@/types/anonBoard";
import { BasicBoardSearchFields } from "@/types/common/board";

const TAG = '[api-anonBoardApi]';

const AnonBoardApi = {
    getList: async (
        queryParams: Partial<BasicBoardSearchFields>
    ): Promise<AnonBoardListRes> => {
        log.debug(TAG, '요청 쿼리', queryParams);
        const res = await api.get('/anon', { params: queryParams });
        return res.data;
    },
};

export default AnonBoardApi;

/**
 *  Partial<T> 이란?
 * -> ypeScript의 유틸리티 타입 중 하나로, T 타입의 모든 속성을 선택적(optional) 으로 바꿔주는 역할
 * -> 사용 이유 : api.get('/anon-board', { params: { page: 1, limit: 10 } }); // search, keyword 없어도 됨
 */