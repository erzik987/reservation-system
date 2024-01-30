import { Injectable } from '@angular/core';
import { ICustomDate, IReservation } from '../models';
import { ReservationApiService } from '../services/reservations-api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, UniversalDialogComponent } from '../components/universal-dialog/universal-dialog.component';

export interface IDialogMessage {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(public dialog: MatDialog, private reservationApiService: ReservationApiService) {}

  public async create(reservationRequest: IReservation) {
    const response = await this.reservationApiService
      .createReservation(reservationRequest)
      .then((createdReservation) => {
        this.openDialog({ title: 'Rezervácia úspešná', content: `Rezervácia prebehla úspešne` });
      })
      .catch((message) => {
        this.openDialog(message.error.displayMessage ? { title: 'Nastala chyba', content: `${message.error.displayMessage}` } : { title: 'Nastala chyba', content: `Pri rezervácií nastala chyba` });
      });

    return { title: 'Nastala chyba', content: `Pri rezervácií nastala chyba` };
  }

  public async update(reservationRequest: IReservation) {
    if (!reservationRequest._id) {
      this.openDialog({ title: 'Nastala chyba', content: `Rezervácia nebola nájdená` });
      return;
    }

    const response = await this.reservationApiService
      .updateReservation(reservationRequest._id, reservationRequest)
      .then((createdReservation) => {
        this.openDialog({ title: 'úprava úspešná', content: `úprava rezervácie prebehla úspešne` });
      })
      .catch((message) => {
        this.openDialog(message.error.displayMessage ? { title: 'Nastala chyba', content: `${message.error.displayMessage}` } : { title: 'Nastala chyba', content: `Pri rezervácií nastala chyba` });
      });
  }

  public async delete(reservationRequest: IReservation) {
    if (!reservationRequest._id) {
      this.openDialog({ title: 'Nastala chyba', content: `Rezervácia nebola nájdená` });
      return;
    }

    const response = await this.reservationApiService
      .deleteReservation(reservationRequest._id)
      .then((createdReservation) => {
        this.openDialog({ title: 'Vymazanie úspešné', content: `Vymazanie rezervácie pre pacienta ${reservationRequest.firstName} ${reservationRequest.lastName} bolo úspešné` });
      })
      .catch((message) => {
        this.openDialog(
          message.error.displayMessage ? { title: 'Nastala chyba', content: `${message.error.displayMessage}` } : { title: 'Nastala chyba', content: `Pri vymazaní rezervácie nastala chyba` }
        );
      });
  }

  public async getReservationForDate(date: ICustomDate): Promise<IReservation[]> {
    return (await this.reservationApiService.getReservationForDate(date)).reservations;
  }

  public openDialog(data: DialogData) {
    this.dialog.open(UniversalDialogComponent, {
      data: {
        title: data.title,
        content: data.content
      }
    });

    this.dialog.afterAllClosed.subscribe((result) => {
      window.location.reload();
    });
  }
}
