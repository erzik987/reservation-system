import { Time } from '@angular/common';
import { FormControl } from '@angular/forms';

// export interface IReservation extends IPatient {
//   reservedDate: ICustomDate;
//   // reservedTime: Time;
//   reservedStartTime: number;
//   reservedEndTime: number;
//   visitReasons: IOption[];
//   duration: number;
//   patientId?: string;
// }

export interface ICustomDate {
  date?: Date;
  dayInMonth: number;
  month: number;
  year: number;
}

export interface ISegment {
  reserved: boolean;
  timeFrom: number;
  timeTo: number;
  // time: Time;
  displayTime?: boolean;
  userSummary?: IReservation;
  additionalClass?: 'left' | 'mid' | 'right';
  // first?: boolean;
  // last?: boolean;
  // tooltipOptions?: any;
}

export interface IOption {
  value: boolean;
  title: string;
  time: number;
}

export interface ISliderConfiguration {
  max: number;
  min: number;
  step: number;
  value: number;
  thumbLabel: boolean;
  showTicks: boolean;
}

export interface IPatient {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IReservation {
  firstName: string;
  lastName: string;
  email: string;
  duration: number;
  visitReasons: IOption[];
  reservedDate: ICustomDate;
  reservedStartTime: number;
  reservedEndTime: number;
  reservationState: ReservationState;
}

export enum ReservationState {
  ReadOnly = 'ReadOnly',
  EditMode = 'EditMode',
  NewReservation = 'NewReservation'
}
