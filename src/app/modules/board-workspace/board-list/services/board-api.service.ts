import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from "rxjs";
import { Board } from "../../../../models/board-workspace/board";
import { Apollo } from "apollo-angular";
import { GET_ALL_BOARDS, IGET_ALL_BOARDS } from "../../../../gql/board/get-all-boards";
import { CREATE_BOARD, ICREATE_BOARD } from "../../../../gql/board/create-board";
import {IREMOVE_BOARD, REMOVE_BOARD} from "../../../../gql/board/remove-board";

@Injectable({
  providedIn: 'root'
})
export class BoardApiService {

  constructor(
      private readonly apollo: Apollo
  ) { }

  /** Запрос на получение всех досок */
  loadAllBoards(): Observable<Board[]> {
    return this.apollo
        .watchQuery<IGET_ALL_BOARDS>({ query: GET_ALL_BOARDS })
        .valueChanges
        .pipe(
            map(({ data }) => data.getAllBoards),
            catchError(() => {
                return of([]);
            })
        )
  }

  /** Добавление новой доски */
  addNewBoard(name: string): Observable<Board | undefined> {
    return this.apollo
        .mutate<ICREATE_BOARD>({
          mutation: CREATE_BOARD,
          variables: {
            createBoard: {
              name
            }
          },
          refetchQueries: ['getAllBoards'],
        })
        .pipe(
            map(({ data }) => data?.createBoard)
        )
  }

  removeBoard(id: string): Observable<string | undefined> {
      return this.apollo
          .mutate<IREMOVE_BOARD>({
              mutation: REMOVE_BOARD,
              variables: {
                  id
              },
              refetchQueries: ['getAllBoards'],
          })
          .pipe(
              map(({ data }) => data?.id)
          )
  }
}
