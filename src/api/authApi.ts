import { LoginRequest, LoginResponse } from "@/types/auth";
import api from "./axios";

const TAG = '[api-authApi]';


// Promise**는 JavaScript에서 비동기 작업의 결과를 다루기 위한 객체
const AuthApi = {
  postLogin: async (data: LoginRequest): Promise<LoginResponse> => {
    console.log(TAG, '', data);
    const res = await api.post<LoginResponse>('/login', data);
    return res.data;
  },
};

export default AuthApi;