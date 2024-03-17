import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {catchError, map, Observable, of, take, tap} from "rxjs";
import {TaskList} from "../../../../models/board-workspace/task-list";
import {GET_ONE_TASK_LIST, IGET_ONE_TASK_LIST} from "../../../../gql/task-list/get-one-task-list";
import {GET_ALL_TASK_LIST, IGET_ALL_TASK_LIST} from "../../../../gql/task-list/get-all-task-list";
import {CREATE_TASK_LIST, ICREATE_TASK_LIST} from "../../../../gql/task-list/create-task-list";
import {DELETE_TASK_LIST, IDELETE_TASK_LIST} from "../../../../gql/task-list/delete-task-list";

@Injectable({
    providedIn: 'root'
})
export class TaskListService {

    constructor(
        private readonly apollo: Apollo,
    ) {
    }

    /** Запрос на получение списков с задачами */
    loadAllTaskListData(boardId: string): Observable<TaskList[]> {
        return this.apollo
            .watchQuery<IGET_ALL_TASK_LIST>({query: GET_ALL_TASK_LIST, variables: {boardId}})
            .valueChanges
            .pipe(
                map(({data}) => data.getAllTaskList),
                catchError(() => {
                    return of([])
                })
            )
    }

    getOneTaskList(listId: string): Observable<TaskList> {
        return this.apollo
            .query<IGET_ONE_TASK_LIST>({
                query: GET_ONE_TASK_LIST,
                variables: {id: listId}
            })
            .pipe(
                map(({data}) => data?.getOneTaskList)
            )
    }

    /**
     * Создание списка задач на доске
     * @param boardId id доски
     * @param name название списка
     */
    createTaskList(boardId: string, name: string): Observable<TaskList | undefined> {
        return this.apollo
            .mutate<ICREATE_TASK_LIST>({
                mutation: CREATE_TASK_LIST,
                variables: {
                    createTaskList: {
                        boardId,
                        name
                    }
                },
            })
            .pipe(
                map(({data}) => data?.createTaskList)
            )
    }

    deleteTaskList(listId: string): Observable<string | undefined> {
        return this.apollo
            .mutate<IDELETE_TASK_LIST>({
                mutation: DELETE_TASK_LIST,
                variables: { id: listId }
            }).pipe(map(({data}) => data?.removeTaskList))
    }
}
