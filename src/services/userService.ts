import UserApi from "@/api/userApi";
import { UserRequest,SignUpResponse } from "@/types/user";


const TAG = 'service-userService';

const UserService = {
    sign: async (formData: FormData): Promise<SignUpResponse>  => {
        // const res = await UserApi.postSignUp(data);
        // return res;
        return await UserApi.postSignUp(formData);
    },
};


export default UserService;