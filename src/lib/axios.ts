import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  //Content-Type 자동 설정
  const isFormData = config.data instanceof FormData;
  if (!isFormData) {
    config.headers["Content-Type"] = "application/json";
  }
  // Authorization 헤더 추가
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  // 성공한 응답
  (response) => response,
  // 실패한 응답
  (error) => {
    const status = error.response?.status;
    const code = error.response?.data?.code;
    const message = error.response?.data?.message;

    switch (status) {
      case 400:
        alert(`잘못된 요청 : ${message}`);
        break;
      case 401:
        localStorage.removeItem("accessToken"); // 로그아웃 처리
        window.location.href = "/login";
        break;
      case 403:
        alert("접근 권한이 없습니다");
        break;
      case 500:
        alert(`${message}`);
        break;
      default:
        alert(`알 수 없는 오류가 발생. 관리자에게 요청하세요. ${message}`);
    }

    return Promise.reject(error);
  }
);

export default api;
