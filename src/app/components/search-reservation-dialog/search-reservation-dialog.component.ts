import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { emptyReservation } from 'src/app/constants';
import { IReservation } from 'src/app/models';
import { ReservationService } from 'src/app/reservation-page/reservation-page.service';

@Component({
  selector: 'app-search-reservation-dialog',
  templateUrl: './search-reservation-dialog.component.html',
  styleUrls: ['./search-reservation-dialog.component.less']
})
export class SearchReservationDialogComponent {
  constructor(private reservationService: ReservationService, public dialogRef: MatDialogRef<SearchReservationDialogComponent>) {}

  public searchPhrase = '';
  public onlyNewReservations = true;
  public reservations: IReservation[] = [];
  public selectedReservation = emptyReservation;

  public async search() {
    this.reservations = await this.reservationService.searchReservations(this.searchPhrase);
  }

  public onEnterPressed() {
    this.search();
  }

  public onSelectionChange(reservation: MatSelectionListChange) {
    const selectedValues = reservation.options.map((option) => option.value);
    this.selectedReservation = selectedValues[0];
  }

  public selectReservation() {
    this.dialogRef.close(this.selectedReservation);
  }
}
