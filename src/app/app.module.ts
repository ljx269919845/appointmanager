import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared';
import { CoreModule } from './core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ServiceModule } from './service/service.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/primeng';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'content',
    component: ContentComponent,
    children: [
      {
        path: 'department',
        loadChildren: './department/department.module#DepartmentModule'
      },
      {
        path: 'doctor',
        loadChildren: './doctor/doctor.module#DoctorModule'
      }, {
        path: 'appoint',
        loadChildren: './appointment/appointment.module#AppointmentModule'
      },
      {
        path: 'appoint-manager',
        loadChildren: './appoint-manager/appoint-manager.module#AppointManagerModule'
      },
      {
        path: '**',
        redirectTo: 'department'
      }
    ]
  }, {
    path: '**',
    redirectTo: 'login'
  }];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true, enableTracing: true }),
    ServiceModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
