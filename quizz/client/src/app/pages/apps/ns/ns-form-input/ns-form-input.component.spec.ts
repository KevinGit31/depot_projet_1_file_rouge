import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsFormInputComponent } from './ns-form-input.component';

describe('NsFormInputComponent', () => {
  let component: NsFormInputComponent;
  let fixture: ComponentFixture<NsFormInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsFormInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
