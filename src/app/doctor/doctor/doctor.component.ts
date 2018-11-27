import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Doctor } from '../../model';
import { GlobalValidService } from 'mpr-form-valid';
import { DoctorService } from '../../service/doctor.service';
import { SUBJECT, SubjectService } from '../../core';
import { CommonFuncService } from '../../core/common-func.service';
import { MessageService } from 'primeng/primeng';
import { DepartMent } from '../../model/department.model';
import { DepartMentService } from '../../service/department.service';
import { ConfirmCancelBoxCallBackObj } from '../../shared/component/pop-up-box/pop-up-box.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  public doctor: Doctor;
  public showInfo = false;
  public doctors: Array<Doctor>;
  public departMents: Array<DepartMent>;
  public createDepartMents;

  constructor(private doctorServ: DoctorService,
    private messageServ: MessageService,
    private departServ: DepartMentService,
    private subServ: SubjectService,
    private router: Router) { }

  ngOnInit() {
    this.loadDoctors();
    this.departServ.getAllDepartMents().success(res => {
      this.departMents = res.data || [];
      this.createDepartMents = this.departMents.filter(elem => elem.status === 1);
    });
  }

  loadDoctors() {
    this.doctorServ.getAllDoctors().success((res) => {
      this.doctors = res.data || [];
    }).error(() => {
      this.doctors = [];
    });
  }

  handleCreateClick() {
    if (!this.departMents.length) {
      const confirm = new ConfirmCancelBoxCallBackObj('请先创建科室信息！');
      confirm.yesFn = () => {
        this.router.navigate(['content', 'department']);
        return {};
      };
      this.subServ.pubscript(SUBJECT.GLOBAL_CONFIRM_CANCEL, confirm);
      return;
    }
    this.showInfo = true;
    this.doctor = null;
  }

  handleCancel() {
    this.showInfo = false;
    this.doctor = null;
  }

  handleActiveDoctor(doctor: Doctor) {
    this.doctorServ.changeDoctorStatus(doctor.id, 1).success(() => {
      // this.subServ.pubscript(SUBJECT.GLOBAL_PROMPT, '激活成功！');
      this.messageServ.add({severity: 'success', summary: '出诊成功！'});
      this.loadDoctors();
    });
  }

  handleFrezeeDoctor(doctor: Doctor) {
    this.doctorServ.changeDoctorStatus(doctor.id, 0).success(() => {
      // this.subServ.pubscript(SUBJECT.GLOBAL_PROMPT, '冻结成功！');
      this.messageServ.add({severity: 'success', summary: '休息成功！'});
      this.loadDoctors();
    });
  }

  handleShowDetailDoctor(doctor: Doctor) {
    this.doctor = doctor;
    this.showInfo = true;
  }

  handleDoctorCreate(doctor: Doctor) {
    this.doctorServ.createDoctor(doctor).success(() => {
      this.loadDoctors();
      // this.subServ.pubscript(SUBJECT.GLOBAL_PROMPT, '添加成功！');
      this.messageServ.add({severity: 'success', summary: '添加成功！'});
    }).after(() => {
      this.handleCancel();
    });
  }

  handleDoctorUpdate(doctor: Doctor) {
    if (CommonFuncService.objectEq(this.doctor, doctor)) {
      this.handleCancel();
      return;
    }
    this.doctorServ.updateDoctor(doctor).success(() => {
      this.loadDoctors();
      // this.subServ.pubscript(SUBJECT.GLOBAL_PROMPT, '修改成功！');
      this.messageServ.add({severity: 'success', summary: '修改成功！'});
    }).after(() => {
      this.handleCancel();
    });
  }


}
