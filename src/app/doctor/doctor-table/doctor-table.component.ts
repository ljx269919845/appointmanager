import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DataTableObj, DataColumnObj } from '../../shared';
import { Doctor } from '../../model';
import { clickOnce } from '../../core/cache';
import { DepartMent } from '../../model/department.model';

@Component({
  selector: 'app-doctor-table',
  templateUrl: './doctor-table.component.html',
  styleUrls: ['./doctor-table.component.css']
})
export class DoctorTableComponent implements OnInit {

  @Input() dataValue;
  @Output() OnShowDetail = new EventEmitter();
  @Output() OnFrezee = new EventEmitter();
  @Output() OnActive = new EventEmitter();
  @Input() departMent: Array<DepartMent>;

  public dataTableObj: DataTableObj;
  constructor() {
    this.dataTableObj = new DataTableObj([
      new DataColumnObj('序号', false, null, 'index'),
      new DataColumnObj('姓名', false, 'doctorName'),
      new DataColumnObj('手机号', false, 'doctorPhone'),
      new DataColumnObj('职称', false, 'professional'),
      new DataColumnObj('性别', false, null, 'sex'),
      new DataColumnObj('科室', false, null, 'departId'),
      new DataColumnObj('', false, null, 'oper')
    ]);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if ('dataValue' in changes) {
      this.dataTableObj.value = this.dataValue;
    }
  }

  getDepartName(departId: string) {
    if (!this.departMent) {
      return departId;
    }
    const index = this.departMent.findIndex(elem => elem.id === departId);
    if (index >= 0) {
      return this.departMent[index].departName;
    }
    return departId;
  }


  @clickOnce('handleShowDetail')
  handleShowDetail(doctor: Doctor) {
    this.OnShowDetail.emit(doctor);
  }

  @clickOnce('handleFrezee')
  handleFrezee(doctor: Doctor) {
    this.OnFrezee.emit(doctor);
  }

  @clickOnce('handleActive')
  handleActive(doctor: Doctor) {
    this.OnActive.emit(doctor);
  }
}
