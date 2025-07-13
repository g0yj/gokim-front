export type ProjectFunctionType =
  | "TASK"
  | "FILE"
  | "BOARD"
  | "CALENDAR"
  | "PAGE";

export interface CreateProject {
  projectName: string;
  projectFunctions: CreateProjectFunction[];
  projectMemberIds?: CreateProjectMemberId[];
}

export type CreateProjectFunction = {
  projectFunctionType?: ProjectFunctionType ;
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
