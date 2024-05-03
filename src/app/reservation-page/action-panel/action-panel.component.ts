import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { SearchReservationDialogComponent } from 'src/app/components/search-reservation-dialog/search-reservation-dialog.component';
import { emptyReservation } from 'src/app/constants';
import { IReservation } from 'src/app/models';

@Component({
  selector: 'action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.less']
})
export class ActionPanelComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  @Input() public reservationParams: IReservation = emptyReservation;
  @Output() public onSearchTrigger = new EventEmitter();
  @Output() public onCreateNewTrigger = new EventEmitter();
  @Output() public onEditTrigger = new EventEmitter();
  @Output() public onDeleteTrigger = new EventEmitter();
  @Output() public onReservationByNameSelected = new EventEmitter<IReservation>();

  public createNew() {
    this.onCreateNewTrigger.emit();
  }

  public edit() {
    this.onEditTrigger.emit();
  }

  public delete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      minHeight: 100,
      minWidth: 300,
      data: {
        title: 'Vymazanie rezervácie',
        confirmationMessage: `Vymazanie rezervácie pre používateľa ${this.reservationParams.firstName} ${this.reservationParams.lastName}`
      }
    });

    dialogRef.afterClosed().subscribe((response) => {
      console.log(response);
      if (response) {
        this.onDeleteTrigger.emit();
      }
    });
  }

  public search() {
    const dialogRef = this.dialog.open(SearchReservationDialogComponent, {
      minHeight: 300,
      minWidth: 600
    });

    dialogRef.afterClosed().subscribe((reservation) => {
      this.onReservationByNameSelected.emit(reservation);
    });
  }
}
