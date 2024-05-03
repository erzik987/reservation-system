import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DateRange, MAT_DATE_RANGE_SELECTION_STRATEGY, MatDateRangeSelectionStrategy } from '@angular/material/datepicker';
import { of } from 'rxjs';
import { IReservation } from 'src/app/models';
import { ReservationService } from 'src/app/reservation-page/reservation-page.service';
import { HelperService } from 'src/app/services/helper.service';
import { ReservationApiService } from 'src/app/services/reservations-api.service';

@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -0);
      const end = this._dateAdapter.addCalendarDays(date, 6);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

export interface IReservationBarsForDate {
  date: Date;
  reservations: IReservation[];
}

@Component({
  selector: 'weekly-overview',
  templateUrl: './weekly-overview.component.html',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy
    }
  ]
})
export class WeeklyOverviewComponent implements OnInit {
  public reservationBars: IReservationBarsForDate[] = [];

  constructor(private helper: HelperService, private reservationService: ReservationService) {}

  public startDate = new FormControl<Date>(new Date());
  public endDate = new FormControl<Date>(this.addDaysToDate(new Date(), 7));

  public ngOnInit() {
    this.onDateRangeChange();
  }

  private addDaysToDate(date: Date | null, numberOfDays: number = 0): Date {
    if (!date) {
      alert('error date');
      return new Date();
    }
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + numberOfDays);
    return newDate;
  }

  private initializeReservationBars(length: number) {
    this.reservationBars = [];

    for (let i = 0; i < length; i++) {
      this.reservationBars.push({
        date: this.addDaysToDate(new Date(), i),
        reservations: []
      });
    }
  }

  public async onDateRangeChange() {
    const numberOfDays = 7;
    console.log(this.endDate.value);
    console.log(this.startDate.value);
    console.log(numberOfDays);
    this.initializeReservationBars(numberOfDays);

    for (let i = 0; i < numberOfDays; i++) {
      let date = this.addDaysToDate(this.startDate.value, i);
      this.reservationBars[i].date = date;
      this.reservationBars[i].reservations = await this.getReservatrionsForDate(date);
    }
  }

  private async getReservatrionsForDate(date: Date): Promise<IReservation[]> {
    return await this.reservationService.getReservationForDate(this.helper.getCustomDate(date));
  }

  private reloadPage(): void {
    window.location.reload();
  }
}
