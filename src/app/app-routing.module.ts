import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { WeeklyOverviewComponent } from './views/weekly-overview/weekly-overview.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { AuthGuard } from './services/auth.guard';
import { PatientCrudComponent } from './views/patient-crud/patient-crud.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', canActivate: [AuthGuard], component: ReservationPageComponent },
  { path: 'patient', canActivate: [AuthGuard], component: PatientCrudComponent },

  { path: 'week-overview', canActivate: [AuthGuard], component: WeeklyOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
