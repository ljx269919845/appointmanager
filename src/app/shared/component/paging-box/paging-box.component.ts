import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

export class PagingBoxObj {
  constructor(
    public page: number = 1,
    public totalRecords: number = 0,
    public rows: number = 10,
    public first: number = 0,
    public pageLinkSize: number = 5
  ) { }
}

@Component({
  selector: 'tl-paging-box',
  templateUrl: './paging-box.component.html',
  styleUrls: ['./paging-box.component.css']
})
export class PagingBoxComponent implements OnInit, OnChanges {

  @Output() onPageChange: EventEmitter<any> = new EventEmitter();

  @Input() pagingBoxObj: PagingBoxObj;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  pageChange(event) {
    this.onPageChange.emit(event);
  }
}
