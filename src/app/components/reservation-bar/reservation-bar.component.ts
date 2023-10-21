import { Component, OnInit } from '@angular/core';
import { ReservationBarService } from "./reservation-bar.service";
import { Time } from "@angular/common";
import { ISegment } from "src/app/models";

@Component({
  selector: 'reservation-bar',
  templateUrl: './reservation-bar.component.html',
  styleUrls: ['./reservation-bar.component.less']
})
export class ReservationBarComponent implements OnInit{

  constructor(public reservationService: ReservationBarService) {}

  public timeFrames: ISegment[] = [];

  public ngOnInit(): void {
    this.timeFrames = this.mockReservationBar.filter(rb => rb.mark);
    console.log(this.timeFrames);
  }

  private startTime: Time = {
    hours: 7,
    minutes: 0
  }

  public mockReservationBar = this.reservationService.generateSegments(this.startTime, 8);

  
}
