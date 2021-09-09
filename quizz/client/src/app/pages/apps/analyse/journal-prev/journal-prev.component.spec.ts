import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalPrevComponent } from './journal-prev.component';

describe('JournalPrevComponent', () => {
  let component: JournalPrevComponent;
  let fixture: ComponentFixture<JournalPrevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalPrevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalPrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
