import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Board, CreateBoardDialogData } from "../../../../models/board-workspace/board";
import { Store } from "@ngrx/store";
import { getBoardList } from "../../../../store/board-list/board-list.selectors";
import { AddNewBoard, LoadBoardList, RemoveBoard } from "../../../../store/board-list/board-list.actions";

@Injectable()
export class BoardListService {
    constructor(
        private store: Store<{ boards: Board[] }>
    ) {
    }

    getAllBoards(): Observable<Board[]> {
        this.store.dispatch(new LoadBoardList());
        return this.store.select(getBoardList);
    }

    addNewBoard(data: CreateBoardDialogData): void {
        this.store.dispatch(new AddNewBoard(data))
    }

    removeBoard(id: string): void {
        this.store.dispatch(new RemoveBoard(id));
    }
}
