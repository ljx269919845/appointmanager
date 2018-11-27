import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SharedModule } from '../shared';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: UserManagerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserManagerComponent, UserTableComponent, UserFormComponent]
})
export class UserManagerModule { }
