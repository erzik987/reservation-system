import { Component, Input } from '@angular/core';
import { emptyReservation, sliderConfiguration } from 'src/app/constants';
import { IOption, ISliderConfiguration, IReservation } from 'src/app/models';

@Component({
  selector: 'visit-reasons',
  templateUrl: './visit-reasons.component.html',
  styleUrls: ['./visit-reasons.component.less']
})
export class VisitReasonsComponent {
  @Input() public reservationParams: IReservation = emptyReservation;

  public sliderConfiguration: ISliderConfiguration = sliderConfiguration;

  public onOptionChange(option: IOption) {
    this.reservationParams.duration = this.reservationParams.visitReasons.filter((option) => option.value).reduce((sum, option) => sum + option.time, 0);
  }
}
