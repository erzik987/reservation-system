import { Injectable } from '@angular/core';
import { IOption, ISliderConfiguration, IReservation, ReservationState } from './models';
import { environment } from 'src/environments/environment';
@Injectable()
export class Constants {
  public readonly API_ENDPOINT: string = environment.apiEndpoint;
}

export const API_ENDPOINT: string = environment.apiEndpoint;

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
    date: new Date()
  },
  reservationState: ReservationState.NewReservation
};
