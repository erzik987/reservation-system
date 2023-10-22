import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { NgxMaterialTimepickerComponent } from "ngx-material-timepicker/src/app/material-timepicker/ngx-material-timepicker.component";
import { IOption, ISliderConfiguration, ISummary } from "../models";

@Component({
  selector: 'reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.less']
})
export class ReservationPageComponent {
  @ViewChild('editableDial') timepicker?: NgxMaterialTimepickerComponent;

  public date?: Date;
  public lastName = new FormControl("",Validators.required);
  public firstName = new FormControl("",Validators.required);
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

  public onOrder() {
    if (!this.isSummaryValid()) {
      console.error("INVALID FORM");
      return;
    }

    const orderSummary: ISummary = {
      firstName:  this.firstName.value?.toString() || "",
      lastName: this.lastName.value?.toString() || "",
      options: this.options.filter(o => o.value),
      examinationTime: this.sliderConfiguration.value,
      reservationDate: this.date || new Date(),
      reservationTime: {hours: 12, minutes: 0}
    }

  }

  public isSummaryValid(): boolean {
    
    return this.firstName.valid && this.lastName.valid

    // return true
  }
}
