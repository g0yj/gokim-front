export interface LoginRequest {
    "id": string
    "password": string
    "loginType": string
}
  
export interface LoginResponse {
    "role": string
    "loginType": string
    "accessToken": string
    "refreshToken": string
  }