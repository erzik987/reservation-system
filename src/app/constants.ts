import { Injectable } from '@angular/core';
import { IOption, ISliderConfiguration, IReservation, State, IPatient } from './models';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class Constants {
  public readonly API_ENDPOINT: string = environment.apiEndpoint;
}

export const API_ENDPOINT: string = environment.apiEndpoint;

export const reservationOptions: IOption[] = [
  {
    id: 1,
    value: false,
    title: 'Odber krvi',
    time: 5
  },
  {
    id: 2,
    value: false,
    title: 'Pravidelná kontrola',
    time: 5
  },
  {
    id: 3,
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
  _id: '',
  lastName: '',
  firstName: '',
  email: '',
  reservedStartTime: 0,
  reservedEndTime: 0,
  duration: 0,
  visitReasons: [...reservationOptions],
  reservedDate: {
    dayInMonth: 0,
    month: 0,
    year: 0,
    date: new Date()
  },
  state: new BehaviorSubject<State>(State.New),
  pacientNotes: ''
};

export const emptyPatient: IPatient = {
  email: '',
  firstName: '',
  lastName: '',
  state: State.New
};
