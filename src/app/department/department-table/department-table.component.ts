import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DataTableObj, DataColumnObj } from '../../shared';
import { DepartMent } from '../../model/department.model';
import { clickOnce } from '../../core/cache';

@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit {
  @Input() dataValue;
  @Output() OnShowDetail = new EventEmitter();
  @Output() OnFrezee = new EventEmitter();
  @Output() OnActive = new EventEmitter();

  public dataTableObj: DataTableObj;
  constructor() {
    this.dataTableObj = new DataTableObj([
      new DataColumnObj('序号', false, null, 'index'),
      new DataColumnObj('科室名称', false, 'departName'),
      new DataColumnObj('状态', false, null, 'status'),
      new DataColumnObj('操作', false, null, 'oper')
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


  @clickOnce('handleShowDetail')
  handleShowDetail(department: DepartMent) {
    this.OnShowDetail.emit(department);
  }

  @clickOnce('handleFrezee')
  handleFrezee(department: DepartMent) {
    this.OnFrezee.emit(department);
  }

  @clickOnce('handleActive')
  handleActive(department: DepartMent) {
    this.OnActive.emit(department);
  }
}
