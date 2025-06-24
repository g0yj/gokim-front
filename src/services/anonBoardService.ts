import AnonBoardApi from "@/api/anonBoardApi";
import log from "@/lib/logger";
import { AnonBoardDetail, AnonBoardListRes } from "@/types/anonBoard";
import { BasicBoardSearchFields } from "@/types/common/board";
import { Dispatch } from "@reduxjs/toolkit";
import { UseFormReturn } from "react-hook-form";

const TAG = 'service-anonBoardService';

const AnonBoardService = {
    list: async (params: BasicBoardSearchFields): Promise<AnonBoardListRes> => {
        const res = await AnonBoardApi.getList(params);
        return res.data;
    },
    detail: async (id: string): Promise<AnonBoardDetail> => {
        return await AnonBoardApi.getDetail(id);
    }
};

export default AnonBoardService;