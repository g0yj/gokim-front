import UserApi from "@/api/userApi";
import { SignUpResponse } from "@/types/user";


const UserService = {
  sign: async (formData: FormData): Promise<SignUpResponse> => {
    const res = await UserApi.postSignUp(formData);
    return res;
  },
};

export default UserService;
