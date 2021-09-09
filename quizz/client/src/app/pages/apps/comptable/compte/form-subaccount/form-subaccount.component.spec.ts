import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubaccountComponent } from './form-subaccount.component';

describe('FormSubaccountComponent', () => {
  let component: FormSubaccountComponent;
  let fixture: ComponentFixture<FormSubaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSubaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
