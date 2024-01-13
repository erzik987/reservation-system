import { Component, ViewChild } from '@angular/core';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker/src/app/material-timepicker/ngx-material-timepicker.component';
import { ReservationApiService } from '../services/reservations-api.service';
import { emptyReservation } from '../constants';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, UniversalDialogComponent } from '../components/universal-dialog/universal-dialog.component';
import { HelperService } from '../services/helper.service';
import { Router } from '@angular/router';
import { IReservation } from '../models';

@Component({
  selector: 'reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.less']
})
export class ReservationPageComponent {
  @ViewChild('timepicker') timepicker?: NgxMaterialTimepickerComponent;

  constructor(private reservationService: ReservationApiService, public dialog: MatDialog, private helper: HelperService, private router: Router) {}

  public reservationsForDate: IReservation[] = [];
  public reservation: IReservation = emptyReservation;
  public displayError = false;

  public navigateToWeeklyOverview() {
    this.router.navigate(['/week-overview']);
  }

  public async onOrder() {
    const reservationRequest = this.finishReservation(this.reservation);

    if (!this.isSummaryValid()) {
      console.error('INVALID FORM');
      return;
    }

    const response = await this.reservationService
      .createReservation(reservationRequest)
      .then((createdReservation) => {
        console.log(createdReservation);
        this.openDialog({ title: 'Rezervácia úspešná', content: `Rezervácia prebehla úspešne` });
      })
      .catch((message) => {
        console.log(reservationRequest);
        console.log(message);
        this.openDialog(message.error.displayMessage ? { title: 'Nastala chyba', content: `${message.error.displayMessage}` } : { title: 'Nastala chyba', content: `Pri rezervácií nastala chyba` });
      });
  }

  public async onDateSelected(date: Date) {
    const reservations = (await this.reservationService.getReservationForDate(this.helper.getCustomDate(date))).reservations;
    this.reservationsForDate = reservations;
  }

  public onUserDetail(reservation: IReservation) {
    this.reservation = reservation;
  }

  public openDialog(data: DialogData) {
    this.dialog.open(UniversalDialogComponent, {
      data: {
        title: data.title,
        content: data.content
      }
    });

    this.dialog.afterAllClosed.subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      window.location.reload();
    });
  }

  private finishReservation(reservationParams: IReservation) {
    reservationParams.reservedEndTime = reservationParams.reservedStartTime + reservationParams.duration;
    return reservationParams;
  }

  public isSummaryValid(): boolean {
    const isReservationValid = this.reservation.firstName !== '' && this.reservation.lastName !== '' && this.reservation.reservedDate.date !== undefined && this.reservation.reservedStartTime !== 0;

    if (!isReservationValid) {
      this.displayError = true;
      alert('Chybajuce udaje');
    }

    return isReservationValid;
  }
}
