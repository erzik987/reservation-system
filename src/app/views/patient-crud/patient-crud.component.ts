import { state } from '@angular/animations';
import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { SearchPatientDialogComponent } from 'src/app/components/search-patient-dialog/search-patient-dialog.component';
import { UniversalDialogComponent } from 'src/app/components/universal-dialog/universal-dialog.component';
import { emptyPatient } from 'src/app/constants';
import { IPatient, State } from 'src/app/models';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HelperService } from 'src/app/services/helper.service';
import { PatientApiService } from 'src/app/services/patients-api.service';

@Component({
  selector: 'patient-crud',
  templateUrl: './patient-crud.component.html',
  styleUrls: ['./patient-crud.component.less'],
  providers: []
})
export class PatientCrudComponent {
  public patient: IPatient = { ...emptyPatient };
  public dirty: boolean = false;

  constructor(public authService: AuthenticationService, private router: Router, private patientApiService: PatientApiService, public dialog: MatDialog, public helper: HelperService) {}

  public async createNew() {
    this.patient = { ...emptyPatient };
  }

  public delete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      minHeight: 100,
      minWidth: 300,
      data: {
        title: 'Vymazanie pacienta',
        confirmationMessage: `Vymazanie pacienta ${this.patient.firstName} ${this.patient.lastName}`
      }
    });

    dialogRef.afterClosed().subscribe(async (response) => {
      if (response && this.patient._id) {
        const response = await this.patientApiService.deletePatient(this.patient._id);
        response.status === 201 ? this.helper.openSnackBar('Pacient úspešne vymazaný') : this.openErrorDialog(response);
        this.patient = emptyPatient;
      }
    });
  }

  public search() {
    const dialogRef = this.dialog.open(SearchPatientDialogComponent, {
      minHeight: 300,
      minWidth: 600
    });

    dialogRef.afterClosed().subscribe((patient) => {
      if (patient) {
        patient.state = State.ReadOnly;
        this.patient = patient;
      }
    });
  }

  public edit() {
    this.patient.state = State.EditMode;
  }

  public async onSubmit() {
    this.dirty = true;
    if (!this.isValid(this.patient)) {
      return;
    }
    this.dirty = false;

    if (this.patient.state === State.New) {
      const response = await this.patientApiService.createPatient(this.patient);
      response.status === 201 ? this.helper.openSnackBar('Pacient úspešne vytvorený') : this.openErrorDialog(response);
    }

    if (this.patient.state === State.EditMode) {
      if (!this.patient._id) {
        this.helper.openSnackBar('Nastala chyba pri identifikácií pacienta');
        return;
      }

      const response = await this.patientApiService.updatePatient(this.patient._id, this.patient);
      response.status === 201 ? this.helper.openSnackBar('Pacient úspešne upravený') : this.openErrorDialog(response);
    }

    this.patient.state = State.ReadOnly;
  }

  public redirectToReservations() {
    this.router.navigate(['/']);
  }

  private openErrorDialog(response: HttpResponse<any>) {
    this.dialog.open(UniversalDialogComponent, {
      data: {
        title: 'Nastala chyba',
        content: response.body.displayMessage
      }
    });

    this.dialog.afterAllClosed.subscribe((result) => {
      window.location.reload();
    });
  }

  private isValid(patient: IPatient): boolean {
    return patient.email !== '' && patient.firstName !== '' && patient.lastName !== '';
  }
}
