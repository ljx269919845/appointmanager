import { Component, OnInit } from '@angular/core';
import { AppointItem } from '../appoint.model';
import { AppointService } from '../../service/appointment.service';
import { AppointSet } from '../../model/appointment.model';
import { DoctorService } from '../../service/doctor.service';
import { Doctor } from '../../model';
import { CommonFuncService } from '../../core/common-func.service';
import { MessageService } from 'primeng/primeng';
import { Router } from '@angular/router';

const TIME_FRAME = ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
  '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00'];

@Component({
  selector: 'app-appoint-set',
  templateUrl: './appoint-set.component.html',
  styleUrls: ['./appoint-set.component.css']
})
export class AppointSetComponent implements OnInit {
  public appointItems: Array<AppointItem> = [];
  public oldAppointItemts: Array<AppointItem> = [];
  public doctors: Array<Doctor>;

  constructor(private appointServ: AppointService, private doctServ: DoctorService,
    private messageServ: MessageService, private router: Router) {
    this.appointItems = TIME_FRAME.map(elem => new AppointItem(elem));
  }

  ngOnInit() {
    this.doctServ.getAllDoctors().success(res => {
      this.doctors = res.data || [];
    });
    this.appointServ.getAllAppoints().success(res => {
      const appointes: Array<AppointSet> = res.data || [];
      for (const appoint of appointes) {
        const index = this.appointItems.findIndex(elem => elem.timeFrame === appoint.timeFrame);
        if (index >= 0) {
          this.appointItems[index].addAppointSet(appoint);
        }
      }
      this.oldAppointItemts = CommonFuncService.clone(this.appointItems);
    });
  }

  handleSaveClick() {
    const waitPromise = [];
    for (let i = 0;  i < this.appointItems.length; i++) {
      const appointItem = this.appointItems[i];
      appointItem.appointSets.forEach((appointSet: AppointSet) => {
        const index = this.oldAppointItemts[i].appointSets.findIndex(elem => {
          return appointSet.doctor.id === elem.doctor.id;
        });
        if (index < 0) {
          waitPromise.push(this.appointServ.addAPointSet(appointSet).toPromise());
        } else if (appointSet.userNum !== this.oldAppointItemts[i].appointSets[index].userNum) {
          waitPromise.push(this.appointServ.updateAPointSet(appointSet).toPromise());
          this.oldAppointItemts[i].appointSets[index].update = true;
        } else {
          this.oldAppointItemts[i].appointSets[index].update = true;
        }
      });
    }

    this.oldAppointItemts.forEach((elem: AppointItem) => {
      elem.appointSets.forEach(sELem => {
        if (!sELem.update) {
          waitPromise.push(this.appointServ.deleteAPointSet(sELem.id).toPromise());
        }
      });
    });

    Promise.all(waitPromise).then(() => {
      this.messageServ.add({severity: 'success', summary: '配置成功'});
      this.router.navigate(['content', 'appoint-manager']);
    });
  }
}
