import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
    createTaskList, CreateTaskListSuccess, deleteTaskList, DeleteTaskListSuccess,
    dummyAction, editTaskListData, getOneTaskList, GetOneTaskListSuccess,
    loadTaskLists,
    LoadTaskListsSuccess
} from "./task-list.actions";
import {map, mergeMap, of, switchMap, take, tap, withLatestFrom} from "rxjs";
import { Store } from "@ngrx/store";
import { TaskList } from "../../../models/board-workspace/task-list";
import { TaskApiService } from "../../../modules/board-workspace/board-page/services/api/task-api.service";
import {CreateTaskSuccess, deleteTaskFromList, DeleteTaskSuccess, saveTask} from "../task/task.actions";
import {TaskListService} from "../../../modules/board-workspace/board-page/services/api/task-list.service";

@Injectable()
export class TaskListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<{ taskList: TaskList[] }>,
        private taskListService: TaskListService,
    ) {
    }

    /** Загрузка списков задач с бэка в стор */
    loadLists$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(loadTaskLists),
                withLatestFrom(this.store.select("taskList")),
                mergeMap(([action, lists]) => {
                    if (!lists.length) {
                        return this.taskListService.loadAllTaskListData(action.boardId)
                            .pipe(
                                tap(() => console.log('GET TASKS DATA')),
                                map((data: TaskList[]) =>
                                    new LoadTaskListsSuccess(data)
                                )
                            )
                    }
                    return of(dummyAction());
                }),
            )
    );

    /** Создание нового списка задач на доске */
    createTaskList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTaskList),
            switchMap(({ boardId, name}) => {
                return this.taskListService.createTaskList(boardId, name)
                    .pipe(
                        map((taskList) =>
                            new CreateTaskListSuccess(taskList)
                        )
                    )
            })
        )
    )

    /** Редактирование данных списка */
    editList$ = createEffect(() => this.actions$.pipe(
        ofType(editTaskListData)
    ))

    /** Удаление списка */
    deleteList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTaskList),
            switchMap(({listId}) =>
                this.taskListService.deleteTaskList(listId)
                    .pipe(
                        map((listId) =>
                            new DeleteTaskListSuccess(listId)
                        )
                    )
            )
        )
    )

    /** Информация о списке */
    getOneList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getOneTaskList),
            switchMap(({ id }) => {
                return this.taskListService.getOneTaskList(id)
                    .pipe(
                        map((taskList) => new GetOneTaskListSuccess(taskList))
                    )
            })
        )
    )
}
