import { Injectable } from '@angular/core';
import { ICustomDate, IReservation, IReservationModel, State } from '../models';
import { ReservationApiService } from '../services/reservations-api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, UniversalDialogComponent } from '../components/universal-dialog/universal-dialog.component';
import { BehaviorSubject } from 'rxjs';

export interface IDialogMessage {
  title: string;
  content: string;
}

export interface IReservationReqResponse {
  reqSuccessfull: boolean;
  response?: any;
  dialogTitle: string;
  dialogBody: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(public dialog: MatDialog, private reservationApiService: ReservationApiService) {}

  public async create(reservationRequest: IReservation): Promise<IReservationReqResponse> {
    let reqSuccessfull = false;
    let dialogMessage = {
      title: 'Nastala chyba',
      content: `Pri rezervácií nastala chyba`
    };

    const response = await this.reservationApiService
      .createReservation(this.mapReservationToModel(reservationRequest))
      .then((createdReservation) => {
        reqSuccessfull = true;
        dialogMessage = { title: 'Rezervácia úspešná', content: `Rezervácia prebehla úspešne` };
      })
      .catch((message) => {
        console.error(message);
      });

    return {
      reqSuccessfull: reqSuccessfull,
      response: response,
      dialogBody: dialogMessage.content,
      dialogTitle: dialogMessage.title
    };
  }

  public async update(reservationRequest: IReservation): Promise<IReservationReqResponse> {
    let reqSuccessfull = false;
    let dialogMessage = {
      title: 'Nastala chyba',
      content: `Pri rezervácií nastala chyba`
    };

    console.log(reservationRequest);

    if (!reservationRequest._id) {
      return {
        reqSuccessfull: reqSuccessfull,
        dialogBody: 'Rezervácia nebola nájdená',
        dialogTitle: dialogMessage.title
      };
    }

    const response = await this.reservationApiService
      .updateReservation(reservationRequest._id, this.mapReservationToModel(reservationRequest))
      .then((createdReservation) => {
        reqSuccessfull = true;
        dialogMessage = { title: 'úprava úspešná', content: `úprava rezervácie prebehla úspešne` };
      })
      .catch((message) => {
        this.openDialog(
          message.error.displayMessage ? { title: 'Nastala chyba', content: `${message.error.displayMessage}` } : { title: 'Nastala chyba', content: `Pri úprave rezervácie nastala chyba` }
        );
      });

    return {
      reqSuccessfull: reqSuccessfull,
      response: response,
      dialogBody: dialogMessage.content,
      dialogTitle: dialogMessage.title
    };
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

  public async searchReservations(searchPhrase: string): Promise<IReservation[]> {
    const reservations = ((await this.reservationApiService.searchReservations(searchPhrase)).body?.reservations || []) as IReservationModel[];

    return this.addStateToReservation(reservations, State.ReadOnly);
  }

  public async getReservationForDate(date: ICustomDate): Promise<IReservation[]> {
    const reservations = ((await this.reservationApiService.getReservationForDate(date)).body?.reservations || []) as IReservationModel[];
    console.log(reservations);
    return this.addStateToReservation(reservations, State.ReadOnly);
  }

  public openDialog(data: DialogData) {
    this.dialog.open(UniversalDialogComponent, {
      data: {
        title: data.title,
        content: data.content
      }
    });
  }

  private mapReservationToModel(reservation: IReservation): IReservationModel {
    return {
      _id: reservation._id,
      firstName: reservation.firstName,
      lastName: reservation.lastName,
      email: reservation.email,
      duration: reservation.duration,
      visitReasons: reservation.visitReasons,
      reservedDate: reservation.reservedDate,
      reservedStartTime: reservation.reservedStartTime,
      reservedEndTime: reservation.reservedEndTime,
      pacientNotes: reservation.pacientNotes
    };
  }

  private addStateToReservation(reservationsAsModel: IReservationModel[], state: State): IReservation[] {
    let reservations: IReservation[] = [];
    reservationsAsModel.forEach((model) => {
      reservations.push({
        _id: model._id,
        firstName: model.firstName,
        lastName: model.lastName,
        email: model.email,
        duration: model.duration,
        visitReasons: model.visitReasons,
        reservedDate: model.reservedDate,
        reservedStartTime: model.reservedStartTime,
        reservedEndTime: model.reservedEndTime,
        pacientNotes: model.pacientNotes,
        state: new BehaviorSubject<State>(state)
      });
    });

    return reservations;
  }
}
