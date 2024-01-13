import { Component, EventEmitter, Input, Output } from '@angular/core';
import { emptyReservation } from 'src/app/constants';
import { IReservation } from 'src/app/models';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.less']
})
export class SummaryComponent {
  @Input() public reservationParams: IReservation = emptyReservation;
  @Output() public onSubmitButtonTrigger = new EventEmitter();

  public onOrder() {
    this.onSubmitButtonTrigger.emit();
  }
}
