import AuthApi from "@/api/authApi";
import { setLogin } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { LoginRequest } from "@/types/auth";

const TAG = 'service-authService';

const AuthService = {
  login: async (dispatch: AppDispatch,  data: LoginRequest) => {
    console.log(TAG, 'data >> ', data);
    const res = await AuthApi.postLogin(data);
    // Redux 저장
    dispatch(setLogin(res));
    // LocalStorage 저장
    localStorage.setItem('accessToken', res.accessToken);
  },
};

export default AuthService;