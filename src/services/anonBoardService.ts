import AnonBoardApi from "@/api/anonBoardApi";
import log from "@/lib/logger";
import { AnonBoardListRes } from "@/types/anonBoard";
import { BasicBoardSearchFields } from "@/types/common/board";
import { UseFormReturn } from "react-hook-form";

const TAG = 'service-anonBoardService';

const AnonBoardService = {
    list:
        async (
            paramQuery: UseFormReturn<BasicBoardSearchFields>,
            setData: (data: AnonBoardListRes) => void
        ) => {
            log.debug(TAG, paramQuery);
            try {
                const values = paramQuery.getValues();
                const res = await AnonBoardApi.getList(values);
                setData(res);
            } catch (e) {
                log.error('list 결과 조회 실패', e);
            }
  },
};

export default AnonBoardService;