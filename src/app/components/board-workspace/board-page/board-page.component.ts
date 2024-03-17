import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {TaskService} from "../../../services/board-workspace/task/task.service";
import {Subject, takeUntil} from "rxjs";
import {NbDialogService} from "@nebular/theme";
import {CreateTaskListDialogComponent} from "../dialogs/create-task-list-dialog/create-task-list-dialog.component";
import {CreateTaskListDialogData, TaskList} from "../../../models/board-workspace/task-list";

@Component({
    selector: 'app-board-page',
    templateUrl: './board-page.component.html',
    styleUrls: ['./board-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardPageComponent implements OnInit, OnDestroy {
    private destroyed$: Subject<void> = new Subject<void>();
    private readonly boardId: string = '';

    taskLists$: Subject<TaskList[]> = new Subject<TaskList[]>();

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private dialogService: NbDialogService,
    ) {
        this.boardId = this.route.snapshot.paramMap.get('id') as string;
    }

    ngOnInit(): void {
        this.taskService.getAllTaskList(this.boardId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe((lists) => {
                this.taskLists$.next(lists);
            })
    }

    addNewTaskList(): void {
        this.dialogService.open(CreateTaskListDialogComponent)
            .onClose
            .subscribe((data?: CreateTaskListDialogData) => {
                if (!data) {
                    return;
                }
                this.taskService.createTaskList(this.boardId, data.name);
            })
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
