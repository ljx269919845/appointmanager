import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export class ConfirmCancelBoxObj {

  public component;

  constructor(
    public header?: string,
    public btnYes?: string,
    public btnNo?: string,
    public headerClose: boolean = false,
    public _visible: boolean = false
  ) { }

  get visible() {
    return this._visible;
  }

  set visible(value) {
    this._visible = value;
    if (this.component && !this.component.ifConfirmCancelBox) {
      this.component.ifConfirmCancelBox = true;
    }
  }
}

@Component({
  selector: 'tl-confirm-cancel-box',
  templateUrl: './confirm-cancel-box.component.html',
  styleUrls: ['./confirm-cancel-box.component.css']
})
export class ConfirmCancelBoxComponent implements OnInit {

  @Output() onClickYes: EventEmitter<any> = new EventEmitter();
  @Output() onClickNo: EventEmitter<any> = new EventEmitter();

  @Input() confirmCancelBoxObj: ConfirmCancelBoxObj;

  public ifConfirmCancelBox = false;

  constructor() {

  }

  ngOnInit() {
    this.confirmCancelBoxObj.component = this;
  }

  clickYes() {
    this.confirmCancelBoxObj.visible = false;
    this.onClickYes.emit();
  }

  clickNo() {
    this.confirmCancelBoxObj.visible = false;
    this.onClickNo.emit();
  }

  get headerArr() {
    if (this.confirmCancelBoxObj && this.confirmCancelBoxObj.header) {
      return this.confirmCancelBoxObj.header.split('|');
    }
    return [];
  }

}
