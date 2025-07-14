import api from "@/lib/axios";
import log from "@/lib/logger";
import { CreateProject, FunctionTypeOption, ListProject } from "@/types/project";

const ProjectApi = {
  getListFunction: async (): Promise<FunctionTypeOption[]> => {
    log.debug("API 기능 선택 목록 조회 ");
    const res = await api.get(`/project/function`);
    log.debug("데이터 확인!!!", res.data);
    return res.data;
  },
  postProject: async (data: CreateProject): Promise<void> => {
    log.debug("api 기능 추가. data: ", data);
    return await api.post(`/project`, data);
  },

  getListProject: async () : Promise<ListProject> => {
    log.debug("api 프로젝트 목록 조회");
    const res = await api.get(`/project`);
    log.debug('api 전달 받은 data', res.data);
    return res.data;
  }
};

export default ProjectApi;
