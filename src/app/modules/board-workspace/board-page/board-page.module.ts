import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardPageComponent } from "./components/board-page.component";
import { TasksColumnComponent } from "./components/tasks-column/tasks-column.component";
import { TaskCardComponent } from "./components/task-card/task-card.component";
import { RouterModule, Routes } from "@angular/router";
import { NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule } from "@nebular/theme";
import { StoreModule } from "@ngrx/store";
import { taskListReducer } from "../../../store/board-page/task-list/task-list.reducer";
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { TaskListEffects } from "../../../store/board-page/task-list/task-list.effects";
import { TaskService } from "./services/tasks/task.service";
import { TaskApiService } from "./services/tasks/task-api.service";
import {TaskEffects} from "../../../store/board-page/task/task.effects";

const routes: Routes = [
    {
        path: '',
        component: BoardPageComponent
    }
]

@NgModule({
    declarations: [
        BoardPageComponent,
        TasksColumnComponent,
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
