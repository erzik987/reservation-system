import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationBarComponent } from './reservation-bar.component';

describe('ReservationBarComponent', () => {
  let component: ReservationBarComponent;
  let fixture: ComponentFixture<ReservationBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationBarComponent]
    });
    fixture = TestBed.createComponent(ReservationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
