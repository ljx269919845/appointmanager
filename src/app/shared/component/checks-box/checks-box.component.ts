import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tl-checks-box',
  templateUrl: './checks-box.component.html',
  styleUrls: ['./checks-box.component.css']
})
export class ChecksBoxComponent implements OnInit {

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @Input() checksData: Array<any>;
  @Input() maxSelectedLength: number;
  @Input() name: string;
  @Input() width: string;

  constructor() {
  }

  ngOnInit() {
  }

  // 获取选中个数
  get selectedLength() {
    let num = 0;
    for (const obj of this.checksData) {
      if (obj.selected) {
        num += 1;
      }
    }
    return num;
  }

  get selectedData() {
    const arr = [];
    for (const obj of this.checksData) {
      const newObj = {};
      if (obj.selected) {
        for (const key in obj) {
          if (key !== 'selected' && key !== 'disabled') {
            newObj[key] = obj[key];
          }
        }
        arr.push(newObj);
      }
    }
    return arr;
  }

  // check事件
  selectedFn(event) {
    this.disabledFn();
    this.onChange.emit(this.selectedData);
  }

  // disabled事件
  disabledFn() {
    if (!this.maxSelectedLength) {
      return;
    }
    for (const obj of this.checksData) {
      if (this.selectedLength >= this.maxSelectedLength) {
        obj.disabled = obj.selected ? false : true;
      } else {
        obj.disabled = false;
      }
    }
  }

}
