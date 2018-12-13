import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../model';
import { DepartMent } from '../../model/department.model';
import { AppointMents, TIME_FRAME_DRAOPS, AppointSetVo } from '../../model/appointment.model';
import { PagingBoxObj } from '../../shared';
import { DoctorService } from '../../service/doctor.service';
import { AppointService } from '../../service/appointment.service';
import { DepartMentService } from '../../service/department.service';
import { SUBJECT, SubjectService } from '../../core';


@Component({
  selector: 'app-tormorrow-appointment',
  templateUrl: './tormorrow-appointment.component.html',
  styleUrls: ['./tormorrow-appointment.component.css']
})
export class TormorrowAppointmentComponent implements OnInit {

  public search = {searchWord: '', timeFrame: '', doctorId: undefined, departId: undefined};

  public doctors: Array<Doctor>;
  public departs: Array<DepartMent>;
  public appointMents: AppointMents;
  public paginateObj = new PagingBoxObj(1, 0, 20);
  public times = [{name: '全部'}].concat(TIME_FRAME_DRAOPS);
  constructor(private doctorServ: DoctorService, private subjectService: SubjectService,
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

  handleAppointCancel(appointSet: AppointSetVo) {
    this.appointServ.changeAppointStatus(appointSet.id, 2).success(() => {
      this.subjectService.pubscript(SUBJECT.GLOBAL_PROMPT, '取消成功');
      this.loadData();
      // this.messageServ.add({severity: 'success', summary: '确认成功！'});
    }).error(() => {
      this.subjectService.pubscript(SUBJECT.GLOBAL_PROMPT, '取消失败');
      // this.messageServ.add({severity: 'error', summary: '确认失败！'});
    });
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
    const TOMORROW = new Date(new Date().getTime() + 3600 * 24 * 1000);
    let TOMORROW_TEXT = `${TOMORROW.getFullYear()}-` + `${TOMORROW.getMonth() > 8 ? TOMORROW.getMonth() + 1 : '0' + (TOMORROW.getMonth() + 1)}-`;
    TOMORROW_TEXT += `${TOMORROW.getDate() > 9 ? TOMORROW.getDate() : '0' + TOMORROW.getDate()}`;
    this.appointServ.getAllAppointMents(this.search.searchWord, this.search.timeFrame === '全部' ? undefined : this.search.timeFrame,
      this.search.departId, this.search.doctorId, TOMORROW_TEXT, TOMORROW_TEXT, this.paginateObj.page, this.paginateObj.rows).success(res => {
      this.appointMents = res.data.appoint || {};
      this.paginateObj.totalRecords = res.data.count || 0;
    });
  }
}
