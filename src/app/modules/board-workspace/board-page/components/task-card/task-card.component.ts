import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Task} from 'src/app/models/board-workspace/task';
import {TaskService} from "../../services/tasks/task.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent implements OnInit, OnDestroy {
    @Input() listId: string = '';
    @Input() taskData!: Task;

    form: FormGroup = new FormGroup({
        name: new FormControl(null, Validators.required)
    });

    editMode = false;

    private destroyed$: Subject<void> = new Subject<void>();

    constructor(
        private taskService: TaskService
    ) {
    }

    ngOnInit(): void {
        this.form.patchValue({
            name: this.taskData.name
        })
        this.editMode = this.taskData.isNew as boolean
    }

    editCard(): void  {
        this.editMode = true
    }

    onSave(): void  {
        if (this.form.valid && this.form.touched) {
            const listId = this.listId
            const { id: taskId, isNew } = this.taskData
            const formData = this.form.getRawValue()
            if (isNew) {
                this.taskService.saveTask(listId, formData)
            } else {
                this.taskService.editTaskGeneralInfo(listId, taskId, formData)
            }

            this.editMode = false
        }
    }

    deleteTask(): void {
        this.taskService.deleteTaskFromList(this.listId, this.taskData.id);
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

}
