import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DataTableObj, DataColumnObj } from '../../shared';
import { AppointItem } from '../appoint.model';
import { AppointSet } from '../../model/appointment.model';

@Component({
  selector: 'app-appoint-table',
  templateUrl: './appoint-table.component.html',
  styleUrls: ['./appoint-table.component.scss']
})
export class AppointTableComponent implements OnInit, OnChanges {
  @Input() appointSets: Array<AppointSet>;

 public dataTableObj: DataTableObj;
  constructor() {
    this.dataTableObj = new DataTableObj([
      new DataColumnObj('序号', false, null, 'index', false, null, {width: '5%'}),
      new DataColumnObj('预约时间', false, 'timeFrame', null, false, null, {width: '15%'}),
      new DataColumnObj('放号总量（可预约）', false, 'realyTotal', null, false, null, {width: '10%'}),
      new DataColumnObj('已约总量', false, 'totalSurplus', null, false, null, {width: '10%'}),
      new DataColumnObj('医生配置', false, null, 'oper', false, null, {width: '50%'})
    ]);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if ('appointSets' in changes) {
      this.dataTableObj.value = this.convertToAppointItem();
    }
  }

  private convertToAppointItem() {
    if (!this.appointSets || this.appointSets.length === 0) {
      return [];
    }
    const appintTable: Array<AppointItem> = [];
    for (const appointset of this.appointSets) {
      const index = appintTable.findIndex(elem => elem.timeFrame === appointset.timeFrame);
      if (index >= 0) {
        appintTable[index].addAppointSet(appointset);
      } else {
        const appointItem = new AppointItem(appointset.timeFrame);
        appointItem.addAppointSet(appointset);
        appintTable.push(appointItem);
      }
    }
    appintTable.sort((a, b) => {
      if (a.timeFrame < b.timeFrame) {
        return -1;
      }
      return 1;
    });
    return appintTable;
  }

}
