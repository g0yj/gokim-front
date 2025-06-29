import api from "@/lib/axios";
import log from "@/lib/logger";
import { AnonBoardDetail } from "@/types/anonBoard";
import { BasicBoardSearchFields } from "@/types/common/board";

const TAG = '[api-anonBoardApi]';

const AnonBoardApi = {
    getList: (params: BasicBoardSearchFields) => {
        return api.get('/anon', { params });
    },

    getDetail: async (id: string): Promise<AnonBoardDetail> => {
        log.debug(TAG, '익명 게시판 식별키 : ', id);
        const res = await api.get(`/anon/${id}`);
        log.info('익명 게시판 호출 데이터', res);
        return res.data
    },

    postAnonBoard: async (formData: FormData): Promise<void> => {
        const res = await api.post('/anon', formData);
        return res.data;
    },

    deleteAnonBoard: async (id: string): Promise<void> => {
        log.debug('삭제 api 호출 id :', id);
        return await api.delete(`/anon/${id}`);
    },

    putAnonBoard: async (formData: FormData, id: string): Promise<void> => {
        log.debug('수정 api 호출: ', formData, id);
        return await api.put(`/anon/${id}`, formData);
    }
};

export default AnonBoardApi;


/**
 *  Partial<T> 이란?
 * -> ypeScript의 유틸리티 타입 중 하나로, T 타입의 모든 속성을 선택적(optional) 으로 바꿔주는 역할
 * -> 사용 이유 : api.get('/anon-board', { params: { page: 1, limit: 10 } }); // search, keyword 없어도 됨
 */