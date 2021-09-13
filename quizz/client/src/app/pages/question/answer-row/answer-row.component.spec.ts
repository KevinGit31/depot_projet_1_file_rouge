import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerRowComponent } from './answer-row.component';

describe('AnswerRowComponent', () => {
  let component: AnswerRowComponent;
  let fixture: ComponentFixture<AnswerRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
