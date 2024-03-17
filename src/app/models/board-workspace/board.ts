import { TaskList } from "./task-list";

export interface Board {
    id: string;
    name: string;
    taskLists?: TaskList[];
}

export type CreateBoardDialogData = {
    name: string;
}
