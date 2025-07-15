import BasicBoardSearchBox from "@/components/board/BasicBoardSearchBox";
import log from "@/lib/logger";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const ProjectFiles = ()=> {
    const projectId = useParams();
    const projectFunctionId = useParams();

    useEffect(() => {
        log.debug('useEffect 실행');
    

    }, [projectFunctionId]);
    
    
    return (
        <div>
            <h1> 파일 목록 나오는 곳</h1>
        
           
        </div>
    )

}

export default ProjectFiles;