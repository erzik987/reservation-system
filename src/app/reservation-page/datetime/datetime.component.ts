import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { emptyReservation, sliderConfiguration } from 'src/app/constants';
import { IReservation } from 'src/app/models';
import { HelperService } from 'src/app/services/helper.service';
import { ReservationApiService } from 'src/app/services/reservations-api.service';

@Component({
  selector: 'datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.less']
})
export class DateTimeComponent {
  @Input() public reservationParams: IReservation = emptyReservation;
  @Output() public onDateSelected = new EventEmitter<Date>();
  @ViewChild('timepicker') timepicker?: NgxMaterialTimepickerComponent;

  constructor(private helper: HelperService, private reservationService: ReservationApiService) {}

  public onTimeSelected(time: string) {
    const t = time.split(':');

    this.reservationParams.reservedStartTime = this.helper.convertTimeToNumber({
      hours: Number(t[0]),
      minutes: Number(t[1])
    });
  }

  public async onDateChange(date: Date) {
    this.setReservationParams(date);
    this.onDateSelected.emit(date);
  }

  public onSetTime() {
    this.timepicker?.open();
  }

  private setReservationParams(date: Date) {
    this.reservationParams.reservedDate.date = date;
    this.reservationParams.reservedDate.dayInMonth = date.getDate();
    this.reservationParams.reservedDate.year = date.getFullYear();
    this.reservationParams.reservedDate.month = date.getMonth() + 1;
  }
}
