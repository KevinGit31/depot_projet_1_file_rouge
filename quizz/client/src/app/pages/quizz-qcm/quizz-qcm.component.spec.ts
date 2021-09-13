import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzQcmComponent } from './quizz-qcm.component';

describe('QuizzQcmComponent', () => {
  let component: QuizzQcmComponent;
  let fixture: ComponentFixture<QuizzQcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzQcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
