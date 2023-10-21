import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReservationBarComponent } from './components/reservation-bar/reservation-bar.component';
import { TooltipDirective } from "@webed/angular-tooltip";


const MATERIAL_MODULES = [
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  FormsModule,
  MatInputModule,
  ReactiveFormsModule,
  MatSliderModule,
  MatCheckboxModule,
];


@NgModule({
  declarations: [
    AppComponent,
    ReservationPageComponent,
    ReservationBarComponent
  ],
  imports: [
    TooltipDirective,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule,
    ...MATERIAL_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
