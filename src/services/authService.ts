import AuthApi from "@/api/authApi";
import log from "@/lib/logger";
import { setLogin } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { LoginRequest } from "@/types/auth";

const TAG = 'service-authService';

const AuthService = {
  login: async (dispatch: AppDispatch, data: LoginRequest) => {
    log.debug("서비스로직 타는지 확인!!!!")
    const res = await AuthApi.postLogin(data);
    // Redux 저장
    dispatch(setLogin(res));
    // LocalStorage 저장
    localStorage.setItem('accessToken', res.accessToken);
  },
};

export default AuthService;