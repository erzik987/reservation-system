import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatient } from '../models';
import { API_ENDPOINT } from '../constants';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class PatientApiService {
  constructor(private http: HttpClient, private authService: AuthenticationService, public helper: HelperService) {}

  public createPatient(patient: IPatient): Promise<HttpResponse<any>> {
    const url = `${API_ENDPOINT}/patients/create`;
    return firstValueFrom(
      this.http.post<any>(url, patient, { observe: 'response' }).pipe(
        catchError((error: HttpErrorResponse) => {
          return this.helper.processError('Error occurred while creating patient', error);
        })
      )
    );
  }

  public async getAllPatients(): Promise<HttpResponse<any>> {
    const url = `${API_ENDPOINT}/patients/get`;
    return firstValueFrom(
      this.http.get<any>(url, { observe: 'response' }).pipe(
        catchError((error: HttpErrorResponse) => {
          return this.helper.processError('Error occurred while getting patient', error);
        })
      )
    );
  }

  public async updatePatient(patientId: string, patient: IPatient): Promise<HttpResponse<any>> {
    const url = `${API_ENDPOINT}/patients/update/${patientId}`;
    return firstValueFrom(
      this.http.patch<any>(url, patient, { observe: 'response' }).pipe(
        catchError((error: HttpErrorResponse) => {
          return this.helper.processError('Error occurred while updating patient', error);
        })
      )
    );
  }

  public async deletePatient(patientId: string): Promise<HttpResponse<any>> {
    const url = `${API_ENDPOINT}/patients/delete/${patientId}`;
    return firstValueFrom(
      this.http.delete<any>(url, { observe: 'response' }).pipe(
        catchError((error: HttpErrorResponse) => {
          return this.helper.processError('Error occurred while deleting patient', error);
        })
      )
    );
  }

  public async searchPatients(search: string): Promise<HttpResponse<any>> {
    const url = `${API_ENDPOINT}/patients/search?searchPhrase=${search}`;
    return firstValueFrom(
      this.http.get<any>(url, { observe: 'response' }).pipe(
        catchError((error: HttpErrorResponse) => {
          return this.helper.processError('Error occurred while searching patient', error);
        })
      )
    );
  }
}
