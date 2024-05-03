import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { emptyPatient, emptyReservation } from 'src/app/constants';
import { IPatient, IReservation } from 'src/app/models';
import { PatientApiService } from 'src/app/services/patients-api.service';
import { ReservationApiService } from 'src/app/services/reservations-api.service';

@Component({
  selector: 'app-search-patient-dialog',
  templateUrl: './search-patient-dialog.component.html',
  styleUrls: ['./search-patient-dialog.component.less']
})
export class SearchPatientDialogComponent {
  constructor(private patientApiService: PatientApiService, public dialogRef: MatDialogRef<SearchPatientDialogComponent>) {}

  public searchPhrase = '';
  public patients: IPatient[] = [];
  public selectedPatient = emptyPatient;

  public async search() {
    this.patients = (await this.patientApiService.searchPatients(this.searchPhrase)).body.patients;
  }

  public onEnterPressed() {
    this.search();
  }

  public onSelectionChange(patient: MatSelectionListChange) {
    const selectedValues = patient.options.map((option) => option.value);
    this.selectedPatient = selectedValues[0];
  }

  public selectReservation() {
    this.dialogRef.close(this.selectedPatient);
  }
}
