import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { API_ENDPOINT } from '../constants';
import { ICustomDate, IReservation, IReservationModel } from '../models';
import { catchError, firstValueFrom } from 'rxjs';
import { HelperService } from './helper.service';

export interface IDialogMessage {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationApiService {
  constructor(private http: HttpClient, public helper: HelperService) {}

  public async createReservation(reservation: IReservationModel): Promise<any> {
    const url = `${API_ENDPOINT}/reservations/create`;
    return await firstValueFrom(this.http.post(url, reservation));
  }

  public async getAllReservations(): Promise<{ reservations: IReservation[] }> {
    const url = `${API_ENDPOINT}/reservations/get`;
    return await firstValueFrom(this.http.get<{ reservations: IReservation[] }>(url));
  }

  public async getReservationById(reservationId: string): Promise<{ reservations: IReservation[] }> {
    const url = `${API_ENDPOINT}/reservations/get/${reservationId}`;
    return await firstValueFrom(this.http.get<{ reservations: IReservation[] }>(url));
  }

  // public async getReservationForDate(customDate: ICustomDate): Promise<{ reservations: IReservation[] }> {
  //   const url = `${API_ENDPOINT}/reservations/getForDate`;
  //   return await firstValueFrom(this.http.post<{ reservations: IReservation[] }>(url, customDate));
  // }

  public async getReservationForDate(customDate: ICustomDate): Promise<HttpResponse<{ reservations: IReservationModel }>> {
    const url = `${API_ENDPOINT}/reservations/getForDate`;
    return firstValueFrom(
      this.http.post<any>(url, customDate, { observe: 'response' }).pipe(
        catchError((error: HttpErrorResponse) => {
          return this.helper.processError('Error occurred while getting reservation for date', error);
        })
      )
    );
  }

  public async updateReservation(reservationId: string, reservation: IReservationModel): Promise<any> {
    const url = `${API_ENDPOINT}/reservations/update/${reservationId}`;
    return await firstValueFrom(this.http.patch(url, reservation));
  }

  public async deleteReservation(reservationId: string): Promise<any> {
    const url = `${API_ENDPOINT}/reservations/delete/${reservationId}`;
    return await firstValueFrom(this.http.delete(url));
  }

  // public async searchReservations(search: string): Promise<{ reservations: IReservation[] }> {
  //   const url = `${API_ENDPOINT}/reservations/search?searchPhrase=${search}`;
  //   return await firstValueFrom(this.http.get<{ reservations: IReservation[] }>(url));
  // }

  public async searchReservations(search: string): Promise<HttpResponse<{ reservations: IReservationModel }>> {
    const url = `${API_ENDPOINT}/reservations/search?searchPhrase=${search}`;
    return firstValueFrom(
      this.http.get<any>(url, { observe: 'response' }).pipe(
        catchError((error: HttpErrorResponse) => {
          return this.helper.processError('Error occurred while searching reservation', error);
        })
      )
    );
  }
}
