export interface UserRequest{
  id?: string
  password?: string
  name?: string
  phone?: string
  email?: string
  file?: string
}


export interface SignUpResponse {
  id: string
  name: string
}


export interface UserResponse{
  id: string
  name: string
  phone: string
  email: string
  file: string
  userImgUrl: string
  loginType: string
}
