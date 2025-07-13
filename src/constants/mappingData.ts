import { ProjectFunctionType } from "@/types/project";

// 기능타입과 기능명을 매핑
export const FUNCTION_TYPE_LABELS: Record<ProjectFunctionType, string> = {
  TASK: "보드",
  FILE: "첨부파일",
  BOARD: "게시판",
  CALENDAR: "캘린더",
  PAGE: "빈페이지",
};