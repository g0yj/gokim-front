export type ProjectFunctionType =
  | "TASK"
  | "FILE"
  | "BOARD"
  | "CALENDAR"
  | "PAGE";

  export type ProjectRole =
  | "OWNER"
  | "MEMBER ";

export interface CreateProject {
  projectName: string;
  projectFunctions: CreateProjectFunction[];
  projectMemberIds?: CreateProjectMemberId[];
}

export type CreateProjectFunction = {
  projectFunctionType: ProjectFunctionType | null ;
  projectFunctionName: string;
  functionSort: number;
  projectExists: boolean;
};

export type CreateProjectMemberId = {
  projectMemberId: string;
};

export type FunctionTypeOption = {
  functionName: string;
  projectFunctionType: ProjectFunctionType;
};

export interface ListProjectItem {
  id:string;
  projectName?:string | null ;
  ownerName?: string | null;
  ownerId: string;
  projectMembers: ListProjectMember[];
}

// API가 배열 자체를 반환하는 경우에 대한 인터페이스 정의
export type ListProject = ListProjectItem[];


export interface ProjectsWithTotalMember {
  id:string;
  projectName?:string | null ;
  ownerName?: string | null;
  ownerId: string;
  projectMembers: ListProjectMember[];
  totalMember: number; // 참여 멤버 수를 구하기 위해 추가해둠. 서비스 로직에서 사용할거임
}

export type ListProjectsWithTotalMember = ProjectsWithTotalMember[];


export type ListProjectMember = {
  projectMemberId:string;
  projectMemberName?: string | null;
  projectRole: ProjectRole ;
  file?: string | null; // 멤버 이미지
}
