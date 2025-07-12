import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from "@/types/auth";
import log from "@/lib/logger";

/**
 * Redux Toolkit을 활용해서 사용자의 로그인 상태를 전역으로 관리하는 코드
 */
interface AuthState {
  loginId: string | null;
  isLoggedIn: boolean;
  role: string | null;
  loginType: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  loginId: null,
  isLoggedIn: false,
  role: null,
  loginType: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth", // slice 이름
  initialState,
  reducers: {
    // 로그인 상태를 설정하는 리듀서
    setLogin: (state, action: PayloadAction<LoginResponse>) => {
      const { id, role, loginType, accessToken, refreshToken } = action.payload;

      // loginId가 undefined이거나 null이거나 빈 문자열인 경우 '임시사용자'로 설정
      const safeLoginId = id || "임시사용자";
      state.loginId = safeLoginId; // 상태에도 적용
      state.isLoggedIn = true;
      state.role = role;
      state.loginType = loginType;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      // 토큰을 localstorage에 저장하여 브라우저 세션 내내 유지
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("loginType", loginType); // 로그아웃 분기 처리를 위함2
      localStorage.setItem("loginId", safeLoginId); // loginId가 아닌 safeLoginId 사용했음을 확인!!
    },

    // 로그아웃 상태를 설정하는 리듀서
    logout: (state) => {
      state.loginId = null;
      state.isLoggedIn = false;
      state.role = null;
      state.loginType = null;
      state.accessToken = null;
      state.refreshToken = null;

      // 저장된 토큰을 제거하여 인증 상태를 로그아웃으로 전환
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("loginType");
      localStorage.removeItem("loginId");
    },
  },
});

export const { setLogin, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authReducer;
