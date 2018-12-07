import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DepartMent } from '../../model/department.model';
import { DepartMentService } from '../../service/department.service';
import { SubjectService, SUBJECT } from '../../core';
import { CommonFuncService } from '../../core/common-func.service';
import { MessageService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  public departMent: DepartMent;
  public showInfo = false;
  public departMents: Array<DepartMent>;

  constructor(
    private departServ: DepartMentService,
    private messageServ: MessageService,
    private SubjectServ: SubjectService
  ) { }

  ngOnInit() {
    this.loadDepartMents();
  }

  loadDepartMents() {
    this.departServ.getAllDepartMents().success((res) => {
      this.departMents = res.data || [];
    }).error(() => {
      this.departMents = [];
    });
  }

  handleCreateClick() {
    this.showInfo = true;
    this.departMent = null;
  }

  handleCancel() {
    this.showInfo = false;
    this.departMent = null;
  }

  handleActiveDepartMent(depart: DepartMent) {
    this.departServ.changeDepartMentStatus(depart.id, 1).success(() => {
      // this.messageServ.add({ severity: 'success', summary: '激活成功！' });
      this.SubjectServ.pubscript(SUBJECT.GLOBAL_PROMPT, '激活成功');
      this.loadDepartMents();
    });
  }

  handleFrezeeDepartMent(depart: DepartMent) {
    this.departServ.changeDepartMentStatus(depart.id, 0).success(() => {
      // this.messageServ.add({ severity: 'success', summary: '冻结成功！' });
      this.SubjectServ.pubscript(SUBJECT.GLOBAL_PROMPT, '冻结成功');
      this.loadDepartMents();
    });
  }

  handleShowDetailDepartMent(depart: DepartMent) {
    this.departMent = depart;
    this.showInfo = true;
  }

  handleDepartMentCreate(depart: DepartMent) {
    this.departServ.createDepartMent(depart).success(() => {
      this.loadDepartMents();
      // this.subServ.pubscript(SUBJECT.GLOBAL_PROMPT, '添加成功！');
      // this.messageServ.add({ severity: 'success', summary: '添加成功！' });
      this.SubjectServ.pubscript(SUBJECT.GLOBAL_PROMPT, '添加成功');
    }).after(() => {
      this.handleCancel();
    });
  }

  handleDepartmentUpdate(depart: DepartMent) {
    if (CommonFuncService.objectEq(this.departMent, depart)) {
      this.handleCancel();
      return;
    }
    this.departServ.updateDepartMent(depart).success(() => {
      this.loadDepartMents();
      this.SubjectServ.pubscript(SUBJECT.GLOBAL_PROMPT, '修改成功');
      // this.messageServ.add({ severity: 'success', summary: '修改成功！' });
    }).after(() => {
      this.handleCancel();
    });
  }

}
