import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormJournalRowComponent } from './form-journal-row.component';

describe('FormJournalRowComponent', () => {
  let component: FormJournalRowComponent;
  let fixture: ComponentFixture<FormJournalRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormJournalRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormJournalRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
