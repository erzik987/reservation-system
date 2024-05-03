import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker/src/app/material-timepicker/ngx-material-timepicker.component';
import { emptyReservation } from '../constants';
import { HelperService } from '../services/helper.service';
import { IReservation, State } from '../models';
import { IReservationReqResponse, ReservationService } from './reservation-page.service';
import { EmailService } from '../services/email.service';
import { DialogData, UniversalDialogComponent } from '../components/universal-dialog/universal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.less']
})
export class ReservationPageComponent implements OnInit {
  @ViewChild('timepicker') timepicker?: NgxMaterialTimepickerComponent;

  constructor(public dialog: MatDialog, private reservationService: ReservationService, private helper: HelperService, private emailService: EmailService) {}

  public reservationsForDate: IReservation[] = [];
  public reservation: IReservation = { ...emptyReservation };

  public ngOnInit(): void {
    this.onDateSelected(this.reservation.reservedDate.date);
  }

  public onCreateNewReservation() {
    console.log('asdas');
    this.reservation = { ...emptyReservation };
  }

  public onEditReservation() {
    this.reservation.state.next(State.EditMode); // = State.EditMode;
  }

  // public test() {
  //   this.reservation.state.next(State.EditMode); // = State.EditMode;
  // }

  public async onReservationDelete() {
    await this.reservationService.delete(this.reservation);
  }

  public async onOrder() {
    const reservationRequest = this.finishReservation(this.reservation);

    // this.emailService.test(reservationRequest);
    // return;

    if (!this.helper.isReservationValid(reservationRequest)) {
      return;
    }

    if (reservationRequest.state.getValue() === State.New) {
      const response = await this.reservationService.create(reservationRequest);
      this.postSubmitActions(response, reservationRequest);
    }

    if (reservationRequest.state.getValue() === State.EditMode) {
      const response = await this.reservationService.update(reservationRequest);
      this.postSubmitActions(response, reservationRequest);
    }
  }

  public async onDateSelected(date: Date) {
    const reservations = await this.reservationService.getReservationForDate(this.helper.getCustomDate(date));
    console.log(reservations);
    this.reservationsForDate = reservations;
  }

  public onReservationByNameSelected(reservation?: IReservation) {
    console.log(reservation);
    if (!reservation) {
      return;
    }

    reservation.state.next(State.ReadOnly); // = State.ReadOnly;
    this.reservation = reservation;
  }

  private finishReservation(reservationParams: IReservation) {
    reservationParams.reservedEndTime = reservationParams.reservedStartTime + reservationParams.duration;
    return reservationParams;
  }

  public openDialog(data: DialogData) {
    this.dialog.open(UniversalDialogComponent, {
      data: {
        title: data.title,
        content: data.content
      }
    });

    this.dialog.afterAllClosed.subscribe((result) => {
      window.location.reload();
    });
  }

  private async postSubmitActions(response: IReservationReqResponse, reservationRequest: IReservation) {
    if (response.reqSuccessfull) {
      this.emailService.sendMail(reservationRequest);
    }

    this.helper.openSnackBar(response.dialogTitle);
    this.reservation.state.next(State.ReadOnly);

    await this.onDateSelected(this.reservation.reservedDate.date);
    // this.openDialog({ title: response.dialogTitle, content: response.dialogBody });
  }
}
