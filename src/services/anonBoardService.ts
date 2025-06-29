import AnonBoardApi from "@/api/anonBoardApi";
import log from "@/lib/logger";
import AnonBoard from "@/pages/anonBoard/AnonBoard";
import { AnonBoardDetail, AnonBoardListRes } from "@/types/anonBoard";
import { BasicBoardSearchFields } from "@/types/common/board";
import { Dispatch } from "@reduxjs/toolkit";
import { UseFormReturn } from "react-hook-form";

const TAG = 'service-anonBoardService';

const AnonBoardService = {
    listAnonBoard: async (params: BasicBoardSearchFields): Promise<AnonBoardListRes> => {
        const res = await AnonBoardApi.getList(params);
        return res.data;
    },
    detail: async (id: string): Promise<AnonBoardDetail> => {
        return await AnonBoardApi.getDetail(id);
    },
    createAnonBoard: async (formData: FormData): Promise<void> => {
        return await AnonBoardApi.postAnonBoard(formData);
    },
    deleteAnonBoard: async (id: string): Promise<void> =>  {
        return await AnonBoardApi.deleteAnonBoard(id);
    },
    updateAnonBoard: async (formData: FormData, id: string): Promise<void> => {
        return await AnonBoardApi.putAnonBoard(formData, id);
    }
};

export default AnonBoardService;