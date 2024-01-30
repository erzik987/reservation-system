import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../constants';
import { ICustomDate, IReservation } from '../models';
import { firstValueFrom } from 'rxjs';

export interface IDialogMessage {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationApiService {
  constructor(private http: HttpClient) {}

  public async createReservation(reservation: IReservation): Promise<any> {
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

  public async getReservationForDate(customDate: ICustomDate): Promise<{ reservations: IReservation[] }> {
    const url = `${API_ENDPOINT}/reservations/getForDate`;
    return await firstValueFrom(this.http.post<{ reservations: IReservation[] }>(url, customDate));
  }

  public async updateReservation(reservationId: string, reservation: IReservation): Promise<any> {
    const url = `${API_ENDPOINT}/reservations/update/${reservationId}`;
    return await firstValueFrom(this.http.patch(url, reservation));
  }

  public async deleteReservation(reservationId: string): Promise<any> {
    const url = `${API_ENDPOINT}/reservations/delete/${reservationId}`;
    return await firstValueFrom(this.http.delete(url));
  }

  public async searchReservations(search: string): Promise<{ reservations: IReservation[] }> {
    const url = `${API_ENDPOINT}/reservations/search?searchPhrase=${search}`;
    return await firstValueFrom(this.http.get<{ reservations: IReservation[] }>(url));
  }
}
