import { LoginRequest, LoginResponse } from "@/types/auth";
import api from "../lib/axios";
import log from "@/lib/logger";

const TAG = '[api-authApi]';


// Promise**는 JavaScript에서 비동기 작업의 결과를 다루기 위한 객체
const AuthApi = {
  postLogin: async (data: LoginRequest): Promise<LoginResponse> => {
    log.debug(TAG, 'data >> ' , data)
    const res = await api.post<LoginResponse>('/login', data);
    return res.data;
  },

  postLogout: async () => {
    log.debug('로그아웃 api 파일 확인');
    return await api.post<void>('/logout');
  }
};

export default AuthApi;