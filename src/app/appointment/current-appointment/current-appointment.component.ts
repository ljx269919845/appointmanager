import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { AppointService } from '../../service/appointment.service';
import { Doctor } from '../../model';
import { AppointMents, TIME_FRAME_DRAOPS, AppointSetVo } from '../../model/appointment.model';
import { PagingBoxObj } from '../../shared';
import { DepartMentService } from '../../service/department.service';
import { DepartMent } from '../../model/department.model';
import { MessageService } from 'primeng/primeng';

@Component({
  selector: 'app-current-appointment',
  templateUrl: './current-appointment.component.html',
  styleUrls: ['./current-appointment.component.scss']
})
export class CurrentAppointmentComponent implements OnInit {

  public search = {searchWord: '', timeFrame: '', docotrId: undefined, departId: undefined};

  public doctors: Array<Doctor>;
  public departs: Array<DepartMent>;
  public appointMents: AppointMents;
  public paginateObj = new PagingBoxObj(1, 0, 20);
  public times = TIME_FRAME_DRAOPS;
  constructor(private doctorServ: DoctorService,
    private appointServ: AppointService,
    private departServ: DepartMentService,
    private messageServ: MessageService) { }

  ngOnInit() {
    this.doctorServ.getAllDoctors().success((res) => {
      this.doctors = [{id: undefined, doctorName: '所有医生'}].concat(res.data || []);
    });
    this.departServ.getAllDepartMents().success(res => {
      this.departs = [{id: undefined , departName: '所有科室'}].concat(res.data || []);
    });
    this.loadData();
  }

  handlePageChange(page) {
    this.paginateObj.page = page.pageIndex;
    this.loadData();
  }

  handleSearch() {
    this.loadData();
  }

  handleSubmit(appointSet: AppointSetVo) {
    this.appointServ.changeAppointStatus(appointSet.id, 3).success(() => {
      this.messageServ.add({severity: 'success', summary: '确认成功！'});
    }).error(() => {
      this.messageServ.add({severity: 'error', summary: '确认失败！'});
    });
  }

  private loadData() {
    const TOMORROW = new Date();
  let TOMORROW_TEXT = `${TOMORROW.getFullYear()}-` + `${TOMORROW.getMonth() > 8 ?
    TOMORROW.getMonth() + 1 : '0' + (TOMORROW.getMonth() + 1)}-`;
  TOMORROW_TEXT += `${TOMORROW.getDate() > 9 ? TOMORROW.getDate() : '0' + TOMORROW.getDate()}`;
    this.appointServ.getAllAppointMents(this.search.searchWord, this.search.timeFrame,
      this.search.departId, this.search.docotrId, TOMORROW_TEXT, TOMORROW_TEXT,
      this.paginateObj.page, this.paginateObj.rows).success(res => {
      this.appointMents = res.data || {};
      this.paginateObj.totalRecords = this.appointMents.appointNum || 0;
    });
  }
}
