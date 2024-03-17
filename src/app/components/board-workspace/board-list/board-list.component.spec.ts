import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardListComponent } from './board-list.component';
import {BoardListService} from "../../../services/board-workspace/board/board-list.service";

describe('BoardListComponent', () => {
  let component: BoardListComponent;
  let fixture: ComponentFixture<BoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ BoardListService ],
      declarations: [ BoardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
