import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentTableComponent } from './department-table/department-table.component';
import { DeparmentInfoComponent } from './deparment-info/deparment-info.component';
import { DepartmentComponent } from './department/department.component';
import { SharedModule } from '../shared';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '**',
  component: DepartmentComponent
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DepartmentTableComponent, DeparmentInfoComponent, DepartmentComponent]
})
export class DepartmentModule { }
