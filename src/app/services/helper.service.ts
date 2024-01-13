import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { ICustomDate } from '../models';
import { defaultCustomDate } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public convertTimeToNumber(time: Time) {
    return time.hours * 60 + time.minutes;
  }

  public getCustomDate(date?: Date): ICustomDate {
    if (!date) {
      return defaultCustomDate;
    }

    return {
      date: date,
      dayInMonth: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
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
}
