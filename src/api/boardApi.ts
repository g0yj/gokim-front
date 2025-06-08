import api from "@/lib/axios";
import log from "@/lib/logger";

const TAG = '[api-board]';

const BoardApi = {
  getBoard: ({ id, resourcePath }: { id: string | number; resourcePath: string }) => {
    log.debug(TAG)
    return api.get(`/${resourcePath}/${id}`)
  }
};

export default BoardApi;