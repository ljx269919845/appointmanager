import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorTableComponent } from './doctor-table/doctor-table.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared';
const routes: Routes = [{
  path: '**',
  component: DoctorComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [DoctorComponent, DoctorTableComponent, DoctorFormComponent]
})
export class DoctorModule { }
