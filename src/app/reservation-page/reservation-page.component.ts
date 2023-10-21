import { Component, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { NgxMaterialTimepickerComponent } from "ngx-material-timepicker/src/app/material-timepicker/ngx-material-timepicker.component";
import { IOption, ISliderConfiguration } from "../models";

@Component({
  selector: 'reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.less']
})
export class ReservationPageComponent {
  @ViewChild('editableDial') timepicker?: NgxMaterialTimepickerComponent;

  public date?: Date | null;
  public lastName = new FormControl();
  public firstName = new FormControl();
  public birthNumber = new FormControl();

  public selectedOptions: IOption[] = [];

  public options: IOption[] = [
    {
      value: false,
      title: "Odber krvi",
      time: 5,
    },
    {
      value: false,
      title: "Pravidelná kontrola",
      time: 5
    },
    {
      value: false,
      title: "Prevzatie liekov",
      time: 5
    },
  ]
  
  public sliderConfiguration: ISliderConfiguration = {
    max : 30,
    min : 0,
    showTicks : true,
    step : 5,
    thumbLabel : true,
    value : 0,
  }

  public test() {
    console.log(this.timepicker);
  }
  
  public onSetTime() {
    this.timepicker?.open();
  }

  public onChange(option: IOption) {
    this.selectedOptions = this.options.filter(x => x.value);
    this.sliderConfiguration.value = this.selectedOptions.reduce((partialSum, a) => partialSum + a.time, 0)
  }
}
