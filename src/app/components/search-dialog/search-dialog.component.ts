import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { emptyReservation } from 'src/app/constants';
import { IReservation } from 'src/app/models';
import { ReservationApiService } from 'src/app/services/reservations-api.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.less']
})
export class SearchDialogComponent {
  constructor(private reservationApiService: ReservationApiService, public dialogRef: MatDialogRef<SearchDialogComponent>) {}

  public searchPhrase = '';
  public onlyNewReservations = true;
  public reservations: IReservation[] = [];
  public selectedReservation = emptyReservation;

  public async search() {
    this.reservations = (await this.reservationApiService.searchReservations(this.searchPhrase)).reservations;
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
