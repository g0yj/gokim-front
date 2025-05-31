import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axiosInstance";
import UserInput from "../components/Login/UserInput";

const Login = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    loginType: "NORMAL",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    console.log("로그인 시도됨!!!!!");
    try {
      const response = await api.post(
        "/login",
        {...formData, 
        loginType: "NORMAL",
    });
      console.log("응답하기:", response.data);
      const { token } = response.data;

      // 토큰 저장
      localStorage.setItem("accessToken", token);
      // 페이지 이동
      navigate("/index");
    } catch (err: unknown) {
      console.error("로그인 실패", err);
      if (axios.isAxiosError(err) && err.response) {
        console.log("서버 응답:", err.response.data); // 여기에 서버에서 보내는 오류 메시지가 나올 거야
      }
      setError("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };

  const handleSignUp = () => {
    navigate("/signUp");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          taskFlow
        </h1>
        <div className="space-y-4">
          <UserInput
            placeholder="아이디 입력"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
          <UserInput
            placeholder="비밀번호 입력"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            로그인
          </button>
          <button
            onClick={handleSignUp}
            className="w-full bg-white hover:bg-gray-100 text-blue-700 border border-blue-700 font-semibold py-2 rounded-lg transition"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
