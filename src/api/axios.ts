import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');

    //Content-Type 자동 설정
    const isFormData = config.data instanceof FormData
    if (!isFormData) {
        config.headers['Content-Type'] = 'application/json'
    }
    // Authorization 헤더 추가
    if (token) config.headers.Authorization = `Bearer ${token}`
    
    return config
})

export default api
