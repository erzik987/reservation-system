import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { EMPTY, Observable, map, startWith, tap } from 'rxjs';
import { emptyPatient, emptyReservation } from 'src/app/constants';
import { IPatient, IReservation, State } from 'src/app/models';
import { PatientApiService } from 'src/app/services/patients-api.service';

@Component({
  selector: 'basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.less']
})
export class BasicInfoComponent implements OnInit, OnChanges {
  @Input() public reservationParams: IReservation = { ...emptyReservation };
  public selectedPatient = new FormControl(emptyPatient);
  public filteredPatients: Observable<IPatient[]> = EMPTY;
  public patients: IPatient[] = [];

  constructor(private router: Router, private patientService: PatientApiService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const newValue: IReservation = changes['reservationParams'].currentValue;
    const patient: IPatient = {
      firstName: newValue.firstName,
      lastName: newValue.lastName,
      email: newValue.email,
      state: State.New
    };
    this.selectedPatient.setValue(patient);

    this.reservationParams.state.subscribe((state) => {
      this.selectedPatient.enable();

      if (state === State.New) {
        this.initFilteredPatients();
      }
      if (state === State.ReadOnly) {
        this.selectedPatient.disable();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.patients = (await this.patientService.getAllPatients()).body.patients;
    this.initFilteredPatients();
  }

  private initFilteredPatients() {
    this.filteredPatients = this.selectedPatient.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: IPatient | string): IPatient[] {
    // TODO Probably not the best implementation
    if (typeof value === 'object') {
      return [value];
    }

    let filterValue = value;
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
      this.reservationParams.lastName = value;
    }

    let result = this.patients.filter((patient) => patient.lastName.toLowerCase().includes(filterValue));

    return result;
  }

  public addPatient(event: MouseEvent) {
    event.preventDefault();
    this.router.navigate(['/patient']);
  }

  public onNameSelected(event: MatAutocompleteSelectedEvent) {
    this.reservationParams.email = event.option.value.email;
    this.reservationParams.firstName = event.option.value.firstName;
    this.reservationParams.lastName = event.option.value.lastName;
  }

  public displayFn(patient: any): string {
    return patient && patient.lastName ? patient.lastName : '';
  }

  public test() {}
}
