import { SignUpResponse } from "@/types/user";
import api from "../lib/axios";
import log from "@/lib/logger";

const TAG = "[api-userApi]";

const UserApi = {
  postSignUp: async (formData: FormData): Promise<SignUpResponse> => {
    log.debug(TAG, "data >> ", formData);

    try {
      const res = await api.post("/user", formData);
      return res.data;
    } catch (error) {
      console.error("Error during sign up:", error);
      throw error; // 필요 시, 에러 처리 추가
    }
  },
};

export default UserApi;
