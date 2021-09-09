import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferInputComponent } from './offer-input.component';

describe('OfferInputComponent', () => {
  let component: OfferInputComponent;
  let fixture: ComponentFixture<OfferInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
