import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import {TaskService} from "../../services/task.service";
import { provideMockStore } from "@ngrx/store/testing";
import { TaskList } from "../../../../../models/board-workspace/task-list";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  const initialState: TaskList[] = []

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ TaskService, provideMockStore({ initialState }) ],
      declarations: [ TaskListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
