import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResponse } from '@/types/auth'

/**
 * Redux Toolkit을 활용해서 사용자의 로그인 상태를 전역으로 관리하는 코드
 */
interface AuthState {
  isLoggedIn: boolean
  role: string | null
  loginType: string | null
  accessToken: string | null
  refreshToken: string | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  role: null,
  loginType: null,
  accessToken: null,
  refreshToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<LoginResponse>) => {
      const { role, loginType, accessToken, refreshToken } = action.payload
      state.isLoggedIn = true
      state.role = role
      state.loginType = loginType
      state.accessToken = accessToken
      state.refreshToken = refreshToken

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    },

    logout: (state) => {
      state.isLoggedIn = false
      state.role = null
      state.loginType = null
      state.accessToken = null
      state.refreshToken = null

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },
  },
})

export const { setLogin, logout } = authSlice.actions
export const authReducer = authSlice.reducer
export default authReducer;
