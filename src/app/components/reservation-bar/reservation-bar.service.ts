import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { IReservation, ISegment } from 'src/app/models';
import { HelperService } from 'src/app/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationBarService {
  constructor(private helper: HelperService) {}
  public generateSegments(timeStart: Time, hours: number): ISegment[] {
    let time = { ...timeStart };
    const segments: ISegment[] = [];
    for (let index = 0; index < hours * 12; index++) {
      let segment: ISegment = {
        reserved: false,
        timeFrom: this.helper.convertTimeToNumber(time),
        timeTo: this.helper.convertTimeToNumber(time) + 5
        // time: { ...time }
        // additionalClass: "mid"
      };

      if (time.minutes === 0 || time.minutes === 30) {
        segment.displayTime = true;
      }

      segments.push(segment);

      time = this.timeTick(time, 5);
    }

    return segments;
  }

  private startTime: Time = {
    hours: 7,
    minutes: 0
  };

  public setReservationsIntoSegments(reservations: IReservation[]): ISegment[] {
    let segments = this.generateSegments(this.startTime, 8);

    reservations.forEach((r) => {
      const segmentIndex = segments.findIndex((s) => s.timeFrom === r.reservedStartTime);
      const numberOfSegments = r.duration / 5;

      for (let i = 0; i < numberOfSegments; i++) {
        if (i === 0) {
          segments[segmentIndex + i].additionalClass = 'left';
        } else if (i === numberOfSegments) {
          segments[segmentIndex + i].additionalClass = 'right';
        } else {
          segments[segmentIndex + i].additionalClass = 'mid';
        }

        segments[segmentIndex + i].reserved = true;
        segments[segmentIndex + i].userSummary = r;
      }
    });

    return segments;
  }

  // public isEqual(obj1: Time, obj2: Time): boolean {
  //   return JSON.stringify(obj1) === JSON.stringify(obj2);
  // }

  public timeTick(time: Time, tick: number): Time {
    time.minutes = time.minutes + tick;

    if (time.minutes === 60) {
      time.minutes = 0;
      time.hours++;
    }

    return time;
  }
}
