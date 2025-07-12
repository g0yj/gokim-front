export interface LoginRequest {
  id: string;
  password: string;
  loginType: string;
}

export interface LoginResponse {
  id: string | null;
  role: string;
  loginType: string;
  accessToken: string;
  refreshToken: string;
}
