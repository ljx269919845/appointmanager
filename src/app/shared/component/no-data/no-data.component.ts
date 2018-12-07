import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { SUBJECT } from '../../../core';

// export class NoDataObj {
//   constructor(
//     public top?: string,
//     public noDataTips?: string
//   ) { }
// }

export class NoDataCommonObj {
  constructor(
    public visible?: boolean,
    public tips?: string
  ) { }
}

@Component({
  selector: 'isli-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.css']
})
export class NoDataComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() noDataString: string;

  public noDataBoxObj: NoDataCommonObj;
  public localLoadingBoxObj: NoDataCommonObj;

  constructor() {
    this.initLocalLoadingBoxObj();
    this.initNoDataBoxObj();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if ('data' in changes) {
      const data = changes['data'] && changes['data'].currentValue;
      console.log('no data- data---:', data);
      if (data === undefined) {
        this.showLocalLoadingBox(true);
        this.showNoDataBox(false);
      } else if (data === null || (data instanceof Array && data.length === 0)) {
        // console.log(data.length);
        this.showLocalLoadingBox(false);
        this.showNoDataBox(true);
      } else {
        this.showLocalLoadingBox(false);
        this.showNoDataBox(false);
      }
    }
    // const data = changes[ && changes.data && changes.data.currentValue];
    // switch (data) {
    //   case undefined:
    //     this.showLocalLoadingBox(true);
    //     this.showNoDataBox(false);
    //     break;
    //   case null:
    //     this.showLocalLoadingBox(false);
    //     this.showNoDataBox(true);
    //     break;
    //   default:
    //     this.showLocalLoadingBox(false);
    //     this.showNoDataBox(false);
    //     console.log(123445);
    //     break;
    // }
  }

  ngOnInit() { }

  // 初始化-LocalLoadingBoxObj
  initLocalLoadingBoxObj() {
    this.localLoadingBoxObj = new NoDataCommonObj();
  }

  // 初始化-NoDataBoxObj
  initNoDataBoxObj() {
    this.noDataBoxObj = new NoDataCommonObj();
  }

  // 显示加载菊花
  showLocalLoadingBox(bol: boolean) {
    this.localLoadingBoxObj.visible = bol;
    if (bol === true) {
      this.localLoadingBoxObj.tips = '数据加载中...';
      setTimeout(() => {
        this.localLoadingBoxObj && (this.localLoadingBoxObj.visible = false);
      }, 3000);
    }
  }

  // 显示暂无数据
  showNoDataBox(bol: boolean) {
    console.log(this.noDataString);
    this.noDataBoxObj.visible = bol;
    if (bol === true) {
      this.noDataBoxObj.tips = this.noDataString;
    }
  }
}
