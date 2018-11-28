import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { AppointService } from '../../service/appointment.service';
import { Doctor } from '../../model';
import { AppointMents, TIME_FRAME_DRAOPS } from '../../model/appointment.model';
import { PagingBoxObj } from '../../shared';
import { DepartMentService } from '../../service/department.service';
import { DepartMent } from '../../model/department.model';

@Component({
  selector: 'app-current-appointment',
  templateUrl: './current-appointment.component.html',
  styleUrls: ['./current-appointment.component.css']
})
export class CurrentAppointmentComponent implements OnInit {

  public search = {searchWord: '', timeFrame: '', docotrId: null, departId: null};

  public doctors: Array<Doctor>;
  public departs: Array<DepartMent>;
  public appointMents: AppointMents;
  public paginateObj = new PagingBoxObj(1, 0, 20);
  public times = TIME_FRAME_DRAOPS;
  constructor(private doctorServ: DoctorService,
    private appointServ: AppointService, private departServ: DepartMentService) { }

  ngOnInit() {
    this.doctorServ.getAllDoctors().success((res) => {
      this.doctors = [{id: '', doctorName: '所有医生'}].concat(res.data || []);
    });
    this.departServ.getAllDepartMents().success(res => {
      this.departs = [{id: '', departName: '所有科室'}].concat(res.data || []);
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

  private loadData() {
    this.appointServ.getAllAppointMents(this.search.searchWord, this.search.timeFrame,
      this.search.departId, this.search.docotrId, null, null, this.paginateObj.page, this.paginateObj.rows).success(res => {
      this.appointMents = res.data || {};
      this.paginateObj.totalRecords = this.appointMents.appointNum || 0;
    });
  }
}
