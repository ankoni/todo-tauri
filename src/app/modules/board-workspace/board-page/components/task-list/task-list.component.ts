import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {BehaviorSubject, filter, Subject, takeUntil} from "rxjs";
import {TaskList} from "../../../../../models/board-workspace/task-list";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from 'src/app/models/board-workspace/task';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit, OnDestroy {
    private destroyed$: Subject<void> = new Subject<void>();

    @Input() taskListId!: string;

    listData$: BehaviorSubject<TaskList | null> = new BehaviorSubject<TaskList | null>(null)
    tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

    editMode: boolean = false
    taskListForm = new FormGroup({
        name: new FormControl('', Validators.required)
    });


    constructor(
        private taskService: TaskService
    ) {
    }

    ngOnInit(): void {
        this.updateFormByState()
    }

    private updateFormByState(): void {
        this.taskService.getTaskListById(this.taskListId).pipe(
            filter((listData) => !!listData),
            takeUntil(this.destroyed$)
        ).subscribe((listData) => {
            this.taskListForm.patchValue({
                name: listData?.name ?? ''
            }, { emitEvent: false });

            this.listData$.next(listData)
            this.tasks$.next(listData?.tasks ?? [])
        })
    }

    editCard(): void {
        this.editMode = true
    }

    onSave(): void {
        if (this.taskListForm.valid) {
            const formData: Partial<TaskList> = this.taskListForm.getRawValue() as Partial<TaskList>
            this.taskService.editTaskList(this.taskListId, { ...formData })
            this.editMode = false
        }
    }

    deleteList(): void {
        this.taskService.deleteList(this.taskListId)
    }

    addNewTask(): void {
        this.taskService.addNewTaskInList(this.taskListId);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
