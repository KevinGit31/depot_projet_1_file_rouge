import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzWizardComponent } from './quizz-wizard.component';

describe('QuizzWizardComponent', () => {
  let component: QuizzWizardComponent;
  let fixture: ComponentFixture<QuizzWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
