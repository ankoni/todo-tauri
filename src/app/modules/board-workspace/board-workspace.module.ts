import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { BoardListComponent } from './boards-list/components/board-list.component';
import { StoreModule } from "@ngrx/store";
import { boardListReducer } from "../../store/board-list/board-list.reducer";
import { EffectsModule } from "@ngrx/effects";
import { BoardListEffects } from "../../store/board-list/board-list.effects";
import { BoardListService } from "./boards-list/services/board-list.service";
import { BoardApiService } from "./boards-list/services/board-api.service";
import {
    NbButtonModule,
    NbCardModule, NbContextMenuModule,
    NbDialogModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule, NbMenuService
} from "@nebular/theme";
import { CreateBoardDialogComponent } from './dialogs/create-board-dialog/create-board-dialog.component';
import { ReactiveFormsModule } from "@angular/forms";
import { BoardCardComponent } from './boards-list/components/board-card/board-card.component';
import { StopEventPropagationDirective } from "../../common/directives/stop-event-propagation.directive";
import { CreateTaskListDialogComponent } from './dialogs/create-task-list-dialog/create-task-list-dialog.component';

const routes: Routes = [
    {
        path: '',
        component: BoardListComponent
    },
    {
        path: ':id',
        loadChildren: () => import('./board-page/components/board-page.module').then(m => m.BoardPageModule)
    }
]

@NgModule({
    declarations: [
        BoardListComponent,
        CreateBoardDialogComponent,
        BoardCardComponent,
        StopEventPropagationDirective,
        CreateTaskListDialogComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('boardList', boardListReducer),
        EffectsModule.forFeature([BoardListEffects]),
        NbDialogModule.forChild(),
        NbButtonModule,
        ReactiveFormsModule,
        NbLayoutModule,
        NbCardModule,
        NbInputModule,
        NbIconModule,
        NbContextMenuModule,
    ],
    providers: [
        BoardListService,
        BoardApiService,
        NbMenuService
    ]
})
export class BoardWorkspaceModule {
}
