import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataTableObj, DataColumnObj, PagingBoxObj } from '../../shared';
import { User } from '../../model/appointment.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnChanges {

  @Output() OnPageChange = new EventEmitter();
  @Input() dataValue: Array<User>;
  @Input() totalCount = 0;
  public dataTableObj;
  public pageObj;
  constructor() {
    this.dataTableObj = new DataTableObj([
      new DataColumnObj('序号', false, null, 'index', false, null, {width: '5%'}),
      new DataColumnObj('姓名', false, 'username', null, false, null, {width: '15%'}),
      new DataColumnObj('手机号', false, 'userPhone', null, false, null, {width: '10%'}),
      new DataColumnObj('生日', false, 'userDay', null, false, null, {width: '10%'}),
      new DataColumnObj('年龄', false,  'userAge', null, false, null, {width: '10%'}),
      new DataColumnObj('性别', false, null, 'sex', false, null, {width: '10%'}),
      new DataColumnObj('创建时间', false, 'createTime', null, false, null, {width: '15%'}),
      new DataColumnObj('openID', false, 'openId', null, false, null, {width: '15%'})
    ]);
    this.pageObj = new PagingBoxObj(1, 0, 20);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if ('dataValue' in changes) {
      this.dataTableObj.value = this.dataValue;
    }
    if ('totalCount' in changes) {
      this.pageObj.totalRecords = this.totalCount;
    }
  }

  handlePageChange(pageInfo) {
    this.OnPageChange.emit(pageInfo);
  }
}
