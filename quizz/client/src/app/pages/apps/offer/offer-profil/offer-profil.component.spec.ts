import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferProfilComponent } from './offer-profil.component';

describe('OfferProfilComponent', () => {
  let component: OfferProfilComponent;
  let fixture: ComponentFixture<OfferProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
