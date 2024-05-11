import { TestBed } from '@angular/core/testing';

import { TaskListService } from './task-list.service';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('TaskListService', () => {
  let service: TaskListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ApolloTestingModule ],
      providers: [ TaskListService ]
    });
    service = TestBed.inject(TaskListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
