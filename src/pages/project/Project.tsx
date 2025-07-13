import ProjectForm from "@/components/project/ProjectCreateForm";
import log from "@/lib/logger";

const Project = () => {
  const handleCancel = () => {
    log.debug("취소버튼 클릭");
  };
  return (
    <div>
      <ProjectForm onCancel={handleCancel} />
    </div>
  );
};

export default Project;
