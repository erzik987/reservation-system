import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReservationBarService } from './reservation-bar.service';
import { IPatient, IReservation, ISegment } from 'src/app/models';

@Component({
  selector: 'reservation-bar',
  templateUrl: './reservation-bar.component.html',
  styleUrls: ['./reservation-bar.component.less']
})
export class ReservationBarComponent implements OnChanges {
  @Input() public reservations: IReservation[] = [];
  @Output() public onUserDetail = new EventEmitter<IReservation>();

  constructor(public reservationService: ReservationBarService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.timeFrames = this.reservationService.setReservationsIntoSegments(this.reservations);
  }

  public timeFrames: ISegment[] = [];

  public onBarClick(bar: ISegment) {
    if (bar.userSummary) {
      this.onUserDetail.emit(bar.userSummary);
    }
  }
}
