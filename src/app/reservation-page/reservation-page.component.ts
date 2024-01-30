import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker/src/app/material-timepicker/ngx-material-timepicker.component';
import { emptyReservation } from '../constants';
import { HelperService } from '../services/helper.service';
import { Router } from '@angular/router';
import { IReservation, ReservationState } from '../models';
import { ReservationService } from './reservation-page.service';

@Component({
  selector: 'reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.less']
})
export class ReservationPageComponent implements OnInit {
  @ViewChild('timepicker') timepicker?: NgxMaterialTimepickerComponent;

  constructor(private reservationService: ReservationService, private helper: HelperService, private router: Router) {}

  public reservationsForDate: IReservation[] = [];
  public reservation: IReservation = emptyReservation;

  public ngOnInit(): void {
    this.onDateSelected(this.reservation.reservedDate.date);
  }

  public onCreateNewReservation() {
    this.reservation = emptyReservation;
  }

  public onEditReservation() {
    this.reservation.reservationState = ReservationState.EditMode;
  }

  public async onReservationDelete() {
    await this.reservationService.delete(this.reservation);
  }

  public async onOrder() {
    const reservationRequest = this.finishReservation(this.reservation);

    if (!this.helper.isReservationValid(reservationRequest)) {
      return;
    }

    if (reservationRequest.reservationState === ReservationState.NewReservation) {
      await this.reservationService.create(reservationRequest);
    }

    if (reservationRequest.reservationState === ReservationState.EditMode) {
      await this.reservationService.update(reservationRequest);
    }
  }

  public async onDateSelected(date: Date) {
    const reservations = await this.reservationService.getReservationForDate(this.helper.getCustomDate(date));
    this.reservationsForDate = reservations;
  }

  public onUserSelected(reservation?: IReservation) {
    if (!reservation) {
      return;
    }

    reservation.reservationState = ReservationState.ReadOnly;
    this.reservation = reservation;
  }

  private finishReservation(reservationParams: IReservation) {
    reservationParams.reservedEndTime = reservationParams.reservedStartTime + reservationParams.duration;
    return reservationParams;
  }
}
