import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Board } from "../../models/board-workspace/board";
import { Store } from "@ngrx/store";
import { BoardApiService } from "../../modules/board-workspace/board-list/services/board-api.service";
import {
    addNewBoard,
    AddNewBoardSuccess,
    loadBoardList,
    LoadBoardListSuccess,
    removeBoard,
    RemoveBoardSuccess
} from "./board-list.actions";
import { filter, map, mergeMap, of, withLatestFrom } from "rxjs";
import { dummyAction } from "../board-page/task-list/task-list.actions";

@Injectable()
export class BoardListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<{ boardList: Board[] }>,
        private boardApiService: BoardApiService
    ) {
    }

    /** Загрузка досок */
    loadBoards$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(loadBoardList),
                withLatestFrom(this.store.select('boardList')),
                mergeMap(([action, storedBoards]) => {
                    if (!storedBoards.length) {
                        return this.boardApiService.loadAllBoards()
                            .pipe(
                                map((data: Board[]) =>
                                    new LoadBoardListSuccess(data)
                                )
                            )
                    }
                    return of(dummyAction());
                })
            )
    )

    addNewBoard$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(addNewBoard),
                mergeMap(({ name }) => {
                    return this.boardApiService.addNewBoard(name)
                        .pipe(
                            map((data: Board | undefined) =>
                                data ? new AddNewBoardSuccess(data) : dummyAction()
                            )
                        )
                })
            )
    )

    removeBoard$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(removeBoard),
                mergeMap(({ id }) => {
                    return this.boardApiService.removeBoard(id)
                        .pipe(
                            map((id: string | undefined) =>
                                id ? new RemoveBoardSuccess(id) : dummyAction()
                            )
                        )
                })
            )
    )
}
