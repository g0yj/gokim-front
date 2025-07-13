import api from "@/lib/axios";
import log from "@/lib/logger";
import { FunctionTypeOption } from "@/types/project";

const ProjectApi = {
    getListFunction: async (): Promise<FunctionTypeOption[]> => {
        log.debug('API 기능 선택 목록 조회 ');
        const res = await api.get(`/project/function`);
        log.debug("데이터 확인!!!", res.data);
        return res.data
  }
};

export default ProjectApi;