import { Component, OnInit, Input, OnChanges } from '@angular/core';

export class LoadingBoxObj {
  constructor(
    public _visible: boolean = false,
    public loadClass?: string
  ) { }

  set visible(value) {
    this._visible = value;
  }

  get visible() {
    return this._visible;
  }

}

@Component({
  selector: 'tl-loading-box',
  templateUrl: './loading-box.component.html',
  styleUrls: ['./loading-box.component.css']
})
export class LoadingBoxComponent implements OnInit {

  @Input() loadingBoxObj: LoadingBoxObj;

  constructor() {
  }

  ngOnInit() {
  }
}
