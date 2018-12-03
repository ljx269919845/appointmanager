import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DataTableObj, DataColumnObj, PagingBoxObj } from '../../shared';
import { AppointSetVo } from '../../model/appointment.model';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss']
})
export class AppointmentTableComponent implements OnInit, OnChanges {
  @Input() dataValue;
  @Input() totalCount;
  @Output() OnPageChange = new EventEmitter();
  @Output() OnCancel = new EventEmitter();
  @Output() OnSubmit = new EventEmitter();
  @Input() day;

  public dataTableObj: DataTableObj;
  public pageObj: PagingBoxObj;
  constructor() {
    this.dataTableObj = new DataTableObj([
      new DataColumnObj('序号', false, null, 'index', false, null, {width: '5%'}),
      new DataColumnObj('预约时间', false, 'timeFrame', null, false, null, {width: '15%'}),
      new DataColumnObj('预约用户', false, null, 'username', false, null, {width: '10%'}),
      new DataColumnObj('手机号', false, null, 'phone', false, null, {width: '10%'}),
      new DataColumnObj('性别', false, null, 'sex', false, null, {width: '5%'}),
      new DataColumnObj('医生', false, null, 'doctor', false, null, {width: '20%'}),
      new DataColumnObj('科室', false, null, 'depart', false, null, {width: '10%'}),
      new DataColumnObj('状态', false, null, 'status', false, null, {width: '10%'})
    ]);
    this.pageObj = new PagingBoxObj(1, 0, 20);
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if ('day' in changes && this.day && this.day !== 3) {
      this.dataTableObj.columnObjs.push( new DataColumnObj('操作', false, null, 'oper', false, null, {width: '10%'}));
    }
    if ('totalCount' in changes) {
      this.pageObj = this.totalCount || 0;
    }
  }

  handlePageChange(page) {
    this.OnPageChange.emit(page);
  }

  handleCancelApponit(appointVo: AppointSetVo) {
    this.OnCancel.emit(appointVo);
  }

  handleSubmitAppoint(appointVo: AppointSetVo) {
    this.OnSubmit.emit(appointVo);
  }
}
