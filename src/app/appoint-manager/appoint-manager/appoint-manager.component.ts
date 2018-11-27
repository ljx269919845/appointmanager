import { Component, OnInit } from '@angular/core';
import { AppointService } from '../../service/appointment.service';
import { AppointMent } from '../../model/appointment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appoint-manager',
  templateUrl: './appoint-manager.component.html',
  styleUrls: ['./appoint-manager.component.css']
})
export class AppointManagerComponent implements OnInit {

  public appoints;
  constructor(private appointServ: AppointService, private router: Router) { }

  ngOnInit() {
    this.appointServ.getAllAppoints().success(res => {
      this.appoints = res.data;
    });
  }

  handleCreateClick() {
    this.router.navigate(['content', 'appoint-manager', 'setting']);
  }
}
