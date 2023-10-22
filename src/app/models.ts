import { Time } from "@angular/common";

export interface ISummary {
    firstName: string;
    lastName: string;
    reservationDate: Date;
    reservationTime: Time;
    options: IOption[];
    examinationTime: number;
}

export interface ISegment {
    reserved: boolean;
    userSummary?: ISummary;
    mark?: Time;
    tooltipOptions?: any
}

export interface IOption {
    value: boolean,
    title: string,
    time: number,
  }
  
  export interface ISliderConfiguration {
    max : number,
    min : number,
    step : number,
    value : number,
    thumbLabel : boolean,
    showTicks : boolean,
  }