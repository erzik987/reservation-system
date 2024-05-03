import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../constants';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { IOption, IReservation, State } from '../models';
import { HelperService } from './helper.service';
import { TimeConverterPipe } from '../pipes/time-converter.pipe';
import { AuthenticationService } from './authentication.service';

interface SendEmailReq {
  recipientEmail: string;
  senderName: string;
  subject: string;
  htmlMessage: string;
  // token: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient, private helperService: HelperService, private timeConverter: TimeConverterPipe, private authService: AuthenticationService) {} //

  public async sendMail(reservation: IReservation): Promise<boolean> {
    const email: SendEmailReq = {
      recipientEmail: reservation.email,
      senderName: 'SM Martin',
      subject: 'Test subject',
      htmlMessage: ''
    };

    if (reservation.state.getValue() === State.New) {
      email.htmlMessage = this.getNewReservationMessage(reservation);
    }

    if (reservation.state.getValue() === State.EditMode) {
      email.htmlMessage = this.getEditedReservationMessage(reservation);
    }

    const url = `${API_ENDPOINT}/email/sendMail`;

    try {
      return await firstValueFrom(this.http.post<any>(url, email));
    } catch (error) {
      alert('Email nebol odoslaný úspešne');
      console.error(error);
      return false;
    }
  }

  private getVisitReasonsAsHtml(options: IOption[]): string {
    let result = '';

    options
      .filter((v) => v.value)
      .forEach((option) => {
        let tmp = '';
        tmp = tmp.concat(`<li>${option.title}</li>`);
        result = result.concat(tmp);
      });

    return `
      <p>Vyšetrenia: </p>
      <ul>
        ${result}
      </ul>
    `;
  }

  private getNotesForPatient(notes: string): string {
    if (notes === '') {
      return '';
    }

    return `
      <hr />
      <h4>Poznámka od doktora</h4>
      <p>${notes}</p>
    `;
  }

  private bloodTakingParagraph(options: IOption[]): string {
    const needBloodResults = options.some((option) => option.id === 1 && option.value === true);

    if (!needBloodResults) {
      return '';
    }

    return `
      <hr />
      <h4>Odber krvi</h4>
      <p>Na odber krvi sa prosím dostavte medzi 6:00 a 8:30</p>
    `;
  }

  private getContactInfo(): string {
    return `
      <hr />
      <h4>Kde nás nájdete</h4>
      <p>Kollárova 2, 036 59 Martin | 043/4203974</p>
    `;
  }

  private getDynamicContent(reservation: IReservation) {
    return `
      ${this.getVisitReasonsAsHtml(reservation.visitReasons)}
      ${this.bloodTakingParagraph(reservation.visitReasons)}
      ${this.getNotesForPatient(reservation.pacientNotes)}
      ${this.getContactInfo()}
    `;
  }

  private getNewReservationMessage(reservation: IReservation): string {
    return `
      <h3>Potvrdenie rezervácie</h3>
      <p>Vážený pán/pani ${reservation.firstName} ${reservation.lastName}</p>
      <p>Váš termín objednania je na ${this.helperService.getCustomDateAsString(reservation.reservedDate)} v čase ${this.timeConverter.transform(reservation.reservedStartTime)}</p>
      ${this.getDynamicContent(reservation)}
    `;
  }

  private getEditedReservationMessage(reservation: IReservation): string {
    return `
      <h3>Úprava rezervácie</h3>
      <p>Vážený pán/pani ${reservation.firstName} ${reservation.lastName}, vaša rezervácia bola upravená</p>
      <p>Váš nový termín objednania je na ${this.helperService.getCustomDateAsString(reservation.reservedDate)} v čase ${this.timeConverter.transform(reservation.reservedStartTime)}</p>
      ${this.getDynamicContent(reservation)}
    `;
  }

  // public test(reservation: IReservation) {
  //   console.log(this.getEditedReservationMessage(reservation));
  // }
}
