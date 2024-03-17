import { createReducer, on } from "@ngrx/store";
import { boardListAdapter, initialState } from "./board-list.state";
import {addNewBoardSuccess, loadBoardListSuccess, removeBoardSuccess} from "./board-list.actions";

export const boardListReducer = createReducer(
    initialState,
    on(loadBoardListSuccess, (state, action) => {
        return boardListAdapter.setAll(action.boards, state);
    }),
    on(addNewBoardSuccess, (state, action) => {
        return boardListAdapter.addOne(action.board, state);
    }),
    on(removeBoardSuccess, (state, action) => {
        return boardListAdapter.removeOne(action.id, state);
    })
);
