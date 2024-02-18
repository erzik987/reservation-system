import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { WeeklyOverviewComponent } from './views/weekly-overview/weekly-overview.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', canActivate: [AuthGuard], component: ReservationPageComponent },
  { path: 'week-overview', component: WeeklyOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
