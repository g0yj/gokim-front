import { LoginRequest, LoginResponse } from "@/types/auth";
import axios from "axios"

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
    const res = await axios.post('/login')
    return res.data;
}