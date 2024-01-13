import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { WeeklyOverviewComponent } from './views/weekly-overview/weekly-overview.component';

const routes: Routes = [
  { path: '', component: ReservationPageComponent },
  { path: 'week-overview', component: WeeklyOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
