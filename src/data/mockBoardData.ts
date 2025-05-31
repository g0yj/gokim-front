import { BoardData } from "../types/board";


export const initialData:BoardData = {
    columnOrder: ["idea", "todo", "inProgress", "done"],
    columns: {
        idea: {
            id: "idea",
            title: "Idea",
            issues: [
                { id: "issue1", content: "새 프로젝트 기획"},
                { id: "issue2", content: "이슈발생"},
                { id: "issue3", content: "아이디어아무거나"},
            ],
        },
        
        todo: {
            id: "todo",
            title: "Todo",
            issues: [
                { id: "todo1", content: "로그인 구현"}
            ]
        },

        inProgress: {
            id: "inProgress",
            title: "InProgress",
            issues: [
                { id: "inprogress1", content: "진행중1"},
                { id: "inprogress2", content: "진행중2"},

            ]
        },

        done: {
            id: "done",
            title: "Done",
            issues: [
                { id: "done1", content: "UI 초안 완성"},
                { id: "done2", content: "깃커밋푸쉬하기"},

            ]
        }
    },
    
};