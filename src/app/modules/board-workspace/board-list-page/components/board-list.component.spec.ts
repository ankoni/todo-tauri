import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardListComponent } from './board-list.component';
import { BoardListService } from "../services/board-list.service";
import { provideMockStore } from "@ngrx/store/testing";
import { Board } from "../../../../models/board-workspace/board";
import { NbDialogModule, NbDialogService, NbLayoutModule, NbMenuService, NbThemeModule } from "@nebular/theme";

describe('BoardListComponent', () => {
    let component: BoardListComponent;
    let fixture: ComponentFixture<BoardListComponent>;
    const initialState: Board[] = []

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NbDialogModule.forChild(),
                NbThemeModule.forRoot({ name: 'default' }),
                NbLayoutModule
            ],
            providers: [BoardListService, provideMockStore({ initialState })],
            declarations: [BoardListComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BoardListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
