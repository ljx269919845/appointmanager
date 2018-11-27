import { Component, OnInit, Input, Output, EventEmitter, QueryList, ContentChildren } from '@angular/core';

import { TemplateRefDirective } from './../../directive/template-ref.directive';

export class DialogObj {

  constructor(
    public visible: boolean,
    public header?: string,
    public width?: number,
    public height?: number,
    public modal?: boolean,
    public closable?: boolean,
    public closeOnEscape?: boolean,
    public dismissableMask?: boolean,
    public yesButton?: string,
    public noButton?: string
  ) { }

}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  @Input() dialogObj: DialogObj;

  @Output() dialogObjChange: EventEmitter<any> = new EventEmitter();
  @Output() onClickYes: EventEmitter<any> = new EventEmitter();
  @Output() onClickNo: EventEmitter<any> = new EventEmitter();

  @ContentChildren(TemplateRefDirective) templates: QueryList<any>;

  visibleChange(event) {
    this.dialogObj.visible = event;
    this.dialogObjChange.emit(this.dialogObj);
  }

  constructor() { }

  ngOnInit() {
  }

}
