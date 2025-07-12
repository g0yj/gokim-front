import { Button } from "@/components/ui/button"; //npx shadcn@latest add button
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; //npx shadcn@latest add card
import useFormHandler from "@/hooks/useFormHandler";
import log from "@/lib/logger";
import AuthService from "@/services/authService";
import { LoginRequest } from "@/types/auth";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  log.debug("로그인 페이지 열림");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form, handleFormChange } = useFormHandler<LoginRequest>({
    id: "",
    password: "",
    loginType: "NORMAL",
  });

  const handleLogin = async () => {
    try {
      await AuthService.login(dispatch, form);
      navigate("/");
    } catch (err) {
      log.debug("로그인 Axios 실패", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eaecf0]">
      <Card className="w-full max-w-sm w-[500px] h-[450x] ">
        <CardHeader className="flex flex-row items-start justify-between">
          {/** 왼쪽 영역 : 제목과 설명 */}
          <div className="mt-3">
            <CardTitle className="text-xl font-bold">로그인</CardTitle>
            <br />
            <CardDescription className="text-sm text-muted-foreground">
              GoFlow에 오신 걸 환영합니다
              <br />
            </CardDescription>
          </div>
          {/** 오른쪽 영역 : 회원가입 */}
          <div>
            <Button
              asChild
              className="bg-[#ffffff] hover:bg-[#eeeded] text-sm font-bold bg-[#ffffff] text-black border"
            >
              <Link to="/signup">SignUp</Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-3">
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <label htmlFor="id" className="font-bold">
                  Id
                </label>
                <input
                  id="id"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  required
                  className="text-sm"
                  value={form.id}
                  onChange={(e) => handleFormChange("id", e.target.value)}
                ></input>
              </div>
            </div>
            <div className="grid gap-2 mt-5">
              <label htmlFor="password" className="font-bold">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                required
                className="text-sm"
                value={form.password}
                onChange={(e) => handleFormChange("password", e.target.value)}
              ></input>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col">
          <Button
            type="submit"
            className="bg-[#ffffff] hover:bg-[#eeeded]  bg-slate-800 font-bold w-full"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button className="bg-[#ffffff] hover:bg-[#77adf3] text-black  w-full flex items-center justify-center gap-2 border">
            Login with Google
          </Button>
          <Button className="bg-[#ffffff] hover:bg-[#e4c800] text-black w-full flex items-center justify-center gap-2 border">
            Login with kakao
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
