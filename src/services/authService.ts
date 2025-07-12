import AuthApi from "@/api/authApi";
import { setLogin } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { LoginRequest } from "@/types/auth";

const AuthService = {
  login: async (dispatch: AppDispatch, data: LoginRequest) => {
    const res = await AuthApi.postLogin(data);
    // Redux 저장
    dispatch(setLogin(res));
  },
  logout: async () => {
    return AuthApi.postLogout();
  },
};

export default AuthService;
