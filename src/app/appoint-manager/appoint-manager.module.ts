import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointManagerComponent } from './appoint-manager/appoint-manager.component';
import { AppointItemComponent } from './appoint-item/appoint-item.component';
import { SharedModule } from '../shared';
import { TabViewModule } from 'primeng/primeng';
import { AppointTableComponent } from './appoint-table/appoint-table.component';
import { AppointSetComponent } from './appoint-set/appoint-set.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'setting',
    component: AppointSetComponent
  }, {
  path: '**',
  component: AppointManagerComponent
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TabViewModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AppointManagerComponent,
    AppointItemComponent,
    AppointTableComponent,
    AppointSetComponent
  ]
})
export class AppointManagerModule { }
