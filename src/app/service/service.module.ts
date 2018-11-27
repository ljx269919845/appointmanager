import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { DepartMentService } from './department.service';
import { DoctorService } from './doctor.service';
import { AppointService } from './appointment.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [LoginService, DepartMentService, DoctorService, AppointService]
})
export class ServiceModule { }
