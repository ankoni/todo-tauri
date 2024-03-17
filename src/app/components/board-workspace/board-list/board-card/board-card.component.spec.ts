import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCardComponent } from './board-card.component';
import {
    NB_DOCUMENT,
    NbCardModule,
    NbContextMenuModule,
    NbIconModule, NbLayoutDirectionService, NbLayoutRulerService, NbLayoutScrollService,
    NbMenuService,
    NbOverlayModule,
    NbStatusService
} from "@nebular/theme";
import { BoardListService } from "../../../../services/board-workspace/board/board-list.service";
import { Board } from "../../../../models/board-workspace/board";
import { provideMockStore } from "@ngrx/store/testing";
import { InjectionToken } from "@angular/core";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { of } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { RouterTestingModule } from "@angular/router/testing";

describe('BoardCardComponent', () => {
    let component: BoardCardComponent;
    let fixture: ComponentFixture<BoardCardComponent>;
    const initialState: Board[] = []

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, NbCardModule, NbContextMenuModule, NbOverlayModule.forRoot(), NbIconModule, NbEvaIconsModule],
            providers: [
                BoardListService,
                provideMockStore({ initialState }),
                { provide: NB_DOCUMENT, useValue: new Document() },
                NbMenuService,
                NbStatusService,
                // todo как-то можно не устанавливать все зависимости из библиотеки?
                NbLayoutRulerService,
                NbLayoutScrollService,
                NbLayoutDirectionService
            ],
            declarations: [BoardCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BoardCardComponent);
        component = fixture.componentInstance;
        component.board = { id: '1', name: 'test' }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
