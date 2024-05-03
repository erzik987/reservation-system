import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { ICustomDate, IReservation } from '../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(private _snackBar: MatSnackBar) {}

  public convertTimeToNumber(time: Time) {
    return time.hours * 60 + time.minutes;
  }

  public getCustomDate(date: Date): ICustomDate {
    console.log(date);
    let result = {
      date: date,
      dayInMonth: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };

    return result;
  }

  public getCustomDateAsString(date: ICustomDate): string {
    return `${date.dayInMonth}.${date.month}.${date.year}`;
  }

  public getDaysDifference(startDate: Date | null, endDate: Date | null): number {
    if (!startDate || !endDate) {
      alert('error');
      return 0;
    }

    const timeDifference = endDate.getTime() - startDate.getTime();

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }

  public isReservationValid(reservation: IReservation): boolean {
    const isReservationValid = reservation.firstName !== '' && reservation.lastName !== '' && reservation.reservedDate.date !== undefined && reservation.reservedStartTime !== 0;

    if (!isReservationValid) {
      console.error('INVALID FORM');
      alert('Chybajuce udaje');
    }

    return isReservationValid;
  }

  public openSnackBar(message: string, action: string = 'OK') {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  public processError(message: string, error?: HttpErrorResponse) {
    this.openSnackBar('Nastalam chyba na serveri!');
    console.error(message + ':', error);
    return throwError(() => new Error(message));
  }
}
