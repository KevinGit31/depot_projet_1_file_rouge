import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQcmComponent } from './form-qcm.component';

describe('FormQcmComponent', () => {
  let component: FormQcmComponent;
  let fixture: ComponentFixture<FormQcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
