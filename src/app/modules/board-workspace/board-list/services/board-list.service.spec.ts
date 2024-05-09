import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { BoardListService } from "./board-list.service";
import { Board } from "../../../../models/board-workspace/board";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { getBoardList } from "../../../../store/board-list/board-list.selectors";

describe('BoardListService', () => {
    let service: BoardListService;
    let store: MockStore
    const initialState: Board[] = [ { id: '1', name: 'test' }]

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                BoardListService,
                provideMockStore({
                    initialState,
                    selectors: [
                        {
                            selector: getBoardList,
                            value: []
                        }
                    ]
                })
            ]
        });
        store = TestBed.inject(MockStore)
        service = TestBed.inject(BoardListService);
    });

    afterEach(() => {
        store?.resetSelectors();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('test getAllBoards', fakeAsync(() => {
        // store.overrideSelector(getBoardList, [ { id: '1', name: 'test' } ])
        service.getAllBoards().subscribe((result) => {
            expect(result).toEqual([])
        })
        flush()
    }))
});
