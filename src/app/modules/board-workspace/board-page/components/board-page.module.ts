import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardPageComponent } from "./board-page.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskCardComponent } from "./task-card/task-card.component";
import { RouterModule, Routes } from "@angular/router";
import { NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule } from "@nebular/theme";
import { StoreModule } from "@ngrx/store";
import { taskListReducer } from "../../../../store/board-page/task-list/task-list.reducer";
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { TaskListEffects } from "../../../../store/board-page/task-list/task-list.effects";
import { TaskService } from "../services/task.service";
import { TaskApiService } from "../services/api/task-api.service";
import {TaskEffects} from "../../../../store/board-page/task/task.effects";

const routes: Routes = [
    {
        path: '',
        component: BoardPageComponent
    }
]

@NgModule({
    declarations: [
        BoardPageComponent,
        TaskListComponent,
        TaskCardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes), NbLayoutModule,
        NbButtonModule,
        NbInputModule,
        StoreModule.forFeature('taskList', taskListReducer),
        NbCardModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([TaskListEffects, TaskEffects]),
    ],
    providers: [
        TaskService,
        TaskApiService
    ]
})
export class BoardPageModule {
}
