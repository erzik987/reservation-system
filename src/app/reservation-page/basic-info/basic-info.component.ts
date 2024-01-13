import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { emptyReservation } from 'src/app/constants';
import { IReservation } from 'src/app/models';

@Component({
  selector: 'basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.less']
})
export class BasicInfoComponent {
  @Input() public reservationParams: IReservation = emptyReservation;
}
