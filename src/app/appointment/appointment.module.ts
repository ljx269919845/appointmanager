import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentTableComponent } from './appointment-table/appointment-table.component';
import { SharedModule } from '../shared';
import { AppointmentComponent } from './appointment/appointment.component';
import { Routes, RouterModule } from '@angular/router';
import { CurrentAppointmentComponent } from './current-appointment/current-appointment.component';
import { HistoryAppointmentComponent } from './history-appointment/history-appointment.component';
import { TormorrowAppointmentComponent } from './tormorrow-appointment/tormorrow-appointment.component';

const routes: Routes = [{
  path: 'list',
  component: AppointmentComponent,
  children: [
    {
      path: 'current',
      component: CurrentAppointmentComponent
    }, {
      path: 'history',
      component: HistoryAppointmentComponent
    },
    {
      path: 'tormorrow',
      component: TormorrowAppointmentComponent
    },
    {
      path: '**',
      redirectTo: 'current'
    }
  ]
}, {
  path: '**',
  redirectTo: 'list'
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AppointmentTableComponent, AppointmentComponent, CurrentAppointmentComponent,
    HistoryAppointmentComponent, TormorrowAppointmentComponent]
})
export class AppointmentModule { }
