import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataTableObj, DataColumnObj } from '../../shared';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss']
})
export class AppointmentTableComponent implements OnInit {
  @Output() OnPageChange = new EventEmitter();
  public dataTableObj: DataTableObj;
  constructor() {
    this.dataTableObj = new DataTableObj([
      new DataColumnObj('序号', false, null, 'index', false, null, {width: '5%'}),
      new DataColumnObj('预约时间', false, 'timeFrame', null, false, null, {width: '15%'}),
      new DataColumnObj('预约用户', false, 'realyTotal', null, false, null, {width: '10%'}),
      new DataColumnObj('手机号', false, 'totalSurplus', null, false, null, {width: '10%'}),
      new DataColumnObj('性别', false, null, 'sex', false, null, {width: '5%'}),
      new DataColumnObj('医生', false, null, 'oper', false, null, {width: '20%'}),
      new DataColumnObj('科室', false, null, 'oper', false, null, {width: '10%'}),
      new DataColumnObj('状态', false, null, 'oper', false, null, {width: '10%'})
    ]);
  }

  ngOnInit() {

  }

  handlePageChange(page) {
    this.OnPageChange.emit(page);
  }
}
