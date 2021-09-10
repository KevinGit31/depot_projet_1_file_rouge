import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeleteComponent } from './form-delete.component';

describe('FormDeleteComponent', () => {
  let component: FormDeleteComponent;
  let fixture: ComponentFixture<FormDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
