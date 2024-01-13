import { Injectable } from '@angular/core';
import { ICustomDate, IOption, ISliderConfiguration, IReservation, ReservationState } from './models';
import { FormControl, Validators } from '@angular/forms';
@Injectable()
export class Constants {
  public readonly API_ENDPOINT: string = 'http://localhost:9090/';
}

export const API_ENDPOINT: string = 'http://localhost:9090';

export const defaultCustomDate: ICustomDate = {
  dayInMonth: 0,
  month: 0,
  year: 0
};

export const reservationOptions: IOption[] = [
  {
    value: false,
    title: 'Odber krvi',
    time: 5
  },
  {
    value: false,
    title: 'Pravidelná kontrola',
    time: 5
  },
  {
    value: false,
    title: 'Prevzatie liekov',
    time: 5
  }
];

export const sliderConfiguration: ISliderConfiguration = {
  max: 30,
  min: 0,
  showTicks: true,
  step: 5,
  thumbLabel: true,
  value: 0
};

export const emptyReservation: IReservation = {
  lastName: '',
  firstName: '',
  email: '',
  reservedStartTime: 0,
  reservedEndTime: 0,
  duration: 0,
  visitReasons: reservationOptions,
  reservedDate: {
    dayInMonth: 0,
    month: 0,
    year: 0,
    date: undefined
  },
  reservationState: ReservationState.NewReservation
};
