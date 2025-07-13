import UserApi from "@/api/userApi";
import { SignUpResponse } from "@/types/user";


const UserService = {
  sign: async (formData: FormData): Promise<SignUpResponse> => {
    const res = await UserApi.postSignUp(formData);
    return res;
  },

  search: async (id: string): Promise<string> => {
    return UserApi.getSearch(id);
  }
};

export default UserService;
