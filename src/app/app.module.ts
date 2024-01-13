import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReservationBarComponent } from './components/reservation-bar/reservation-bar.component';
import { TooltipDirective } from '@webed/angular-tooltip';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { TimeConverterPipe } from './pipes/time-converter.pipe';
import { UniversalDialogComponent } from './components/universal-dialog/universal-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WeeklyOverviewComponent } from './views/weekly-overview/weekly-overview.component';
import { BasicInfoComponent } from './reservation-page/basic-info/basic-info.component';
import { VisitReasonsComponent } from './reservation-page/visit-reasons/visit-reasons.component';
import { DateTimeComponent } from './reservation-page/datetime/datetime.component';
import { SummaryComponent } from './reservation-page/summary/summary.component';

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
  MatButtonModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    AppComponent,
    ReservationPageComponent,
    ReservationBarComponent,
    TimeConverterPipe,
    UniversalDialogComponent,
    WeeklyOverviewComponent,
    BasicInfoComponent,
    VisitReasonsComponent,
    DateTimeComponent,
    SummaryComponent
  ],
  imports: [TooltipDirective, BrowserModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule, NgxMaterialTimepickerModule, ...MATERIAL_MODULES],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
