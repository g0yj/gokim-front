import {UserRequest, SignUpResponse} from "@/types/user";
import api from "../lib/axios";
import log from "@/lib/logger";

const TAG = '[api-userApi]';

const UserApi = {
    postSignUp : async (formData: FormData): Promise<SignUpResponse> => {
        // log.debug(TAG, 'data >> ' , data);
        const res = await api.post('/signUp', formData);
        return res.data;
    }
};

export default UserApi;