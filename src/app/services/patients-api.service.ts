import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatient } from '../models';
import { API_ENDPOINT } from '../constants';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientApiService {
  constructor(private http: HttpClient) {}

  public async createPatient(patient: IPatient): Promise<any> {
    const url = `${API_ENDPOINT}/patients/create`;
    return await firstValueFrom(this.http.post(url, patient));
  }

  public async getAllPatients(): Promise<IPatient[]> {
    const url = `${API_ENDPOINT}/patients/get`;
    return await firstValueFrom(this.http.get<IPatient[]>(url));
  }
}
