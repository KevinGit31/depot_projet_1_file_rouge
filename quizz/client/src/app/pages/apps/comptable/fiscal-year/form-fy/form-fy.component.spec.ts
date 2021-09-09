import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFyComponent } from './form-fy.component';

describe('FormFyComponent', () => {
  let component: FormFyComponent;
  let fixture: ComponentFixture<FormFyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
