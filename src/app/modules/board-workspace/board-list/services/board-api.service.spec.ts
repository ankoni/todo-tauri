import { TestBed } from '@angular/core/testing';

import { BoardApiService } from './board-api.service';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('BoardApiService', () => {
  let service: BoardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ApolloTestingModule ],
      providers: [ BoardApiService ]
    });
    service = TestBed.inject(BoardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
