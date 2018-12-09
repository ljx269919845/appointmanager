import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../model';
import { DepartMent } from '../../model/department.model';
import { AppointMents, TIME_FRAME_DRAOPS } from '../../model/appointment.model';
import { PagingBoxObj } from '../../shared';
import { DoctorService } from '../../service/doctor.service';
import { AppointService } from '../../service/appointment.service';
import { DepartMentService } from '../../service/department.service';

@Component({
  selector: 'app-history-appointment',
  templateUrl: './history-appointment.component.html',
  styleUrls: ['./history-appointment.component.css']
})
export class HistoryAppointmentComponent implements OnInit {

  public search = {searchWord: '', timeFrame: '', docotrId: undefined, departId: undefined,
  date: null};

  public doctors: Array<Doctor>;
  public departs: Array<DepartMent>;
  public appointMents: AppointMents;
  public paginateObj = new PagingBoxObj(1, 0, 20);
  public times = [{name: '全部'}].concat(TIME_FRAME_DRAOPS);
  constructor(private doctorServ: DoctorService,
    private appointServ: AppointService, private departServ: DepartMentService) { }

  ngOnInit() {
    this.doctorServ.getAllDoctors().success((res) => {
      this.doctors = [{id: undefined, doctorName: '所有医生'}].concat(res.data || []);
    });
    this.departServ.getAllDepartMents().success(res => {
      this.departs = [{id: undefined, departName: '所有科室'}].concat(res.data || []);
    });
    this.loadData();
  }

  handlePageChange(page) {
    this.paginateObj.page = page.page;
    this.loadData();
  }

  handleSearch() {
    this.paginateObj = new PagingBoxObj(1, 0, 20);
    this.loadData();
  }

  private loadData() {
    this.appointServ.getAllAppointMents(this.search.searchWord, this.search.timeFrame === '全部' ? undefined : this.search.timeFrame,
      this.search.departId, this.search.docotrId,
      (this.search.date && this.search.date.beginDate) || undefined,
      (this.search.date && this.search.date.enDate) || undefined, this.paginateObj.page, this.paginateObj.rows).success(res => {
      this.appointMents = res.data.appoint || {};
      this.paginateObj.totalRecords = this.appointMents.count || 0;
      this.paginateObj = Object.assign(this.paginateObj);
    });
  }
}
