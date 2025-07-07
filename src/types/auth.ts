export interface LoginRequest {
    id: string;
    password: string;
    loginType: string;
}
  
export interface LoginResponse {
    loginId: string | null;
    role: string;
    loginType: string;
    accessToken: string;
    refreshToken: string;
  }