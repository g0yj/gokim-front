import AuthApi from "@/api/authApi";
import { setLogin } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { LoginRequest } from "@/types/auth";

const TAG = 'service-authService';

const AuthService = {
  login: async (dispatch: AppDispatch,  data: LoginRequest) => {
    console.log(TAG, 'data >> ', data);
    const res = await AuthApi.postLogin(data);
    dispatch(setLogin(res));
  },
};

export default AuthService;