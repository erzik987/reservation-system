import { Time } from "@angular/common";
import { Injectable } from "@angular/core";
import { ISegment } from "src/app/models";

@Injectable({
    providedIn: "root",
  })
  export class ReservationBarService {

    public generateSegments(timeStart: Time, hours: number): ISegment[] {
        let time = timeStart;
        const segments: ISegment[] = [];
        for (let index = 0; index < hours*12; index++) {

            let segment: ISegment = {
                reserved: false,
                tooltipOptions: {'display': false}
            }

            if (time.minutes === 0) {
                segment.mark = { ...time };
            }

            segments.push(segment);

            time = this.timeTick(time, 5);
            
        }

        return segments;
    }

    public timeTick(time: Time, tick: number): Time {
        time.minutes = time.minutes + tick;

        if (time.minutes === 60) {
            time.minutes = 0;
            time.hours++;
        }

        return time;
    }
  }
