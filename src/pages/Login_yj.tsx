import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInput from "../components/Login/UserInput";
import { useDispatch } from "react-redux";
import AuthService from "@/services/authService";

const Login_yj = () => {

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    loginType: "NORMAL",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      await AuthService.login(dispatch, formData);
      navigate('/index');
    } catch (e) {
      console.log( '로그인 실패 이유 >> ', e)
    }
  }
  
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

export default Login_yj;
