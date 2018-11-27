import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

export class PromptBoxObj {

  public component: any;
  private time;

  constructor(
    public name?: string,
    public width?: string,
    public height?: string,
    public error: boolean = false,
    public positionFlag: boolean = false,
    public showAnimationsFlag: boolean = true,
    public closeSetTimeoutFlag: boolean = false,
    public _visible: boolean = false,
    public _showAnimations: boolean = true

  ) {
  }

  get visible() {
    return this._visible;
  }

  // set visible(show: boolean) {
  //   if (show) {
  //     this._visible = true;
  //     if (this.time) {
  //       clearTimeout(this.time);
  //     }
  //     this.time = setTimeout(() => {
  //       this._visible = false;
  //       this.time = undefined;
  //     }, 1500);
  //   } else {
  //     this._visible = false;
  //   }
  // }

  set visible(bool: boolean) {
    if (bool && !this.closeSetTimeoutFlag) {
      setTimeout(() => {
        this.time = setTimeout(() => {
          this._visible = false;
          this.component.visibleChange(false);
          if (this.error) {
            this.error = false;
          }
        }, 3000);
        this.setAnimations(false);
      }, 1000);
      clearTimeout(this.time);
    }
    this._visible = bool;
    this.setAnimations(bool);
    if (this.component && !this.component.ifPromptsBox) {
      this.component.ifPromptsBox = true;
    }
  }

  setAnimations(bool: boolean) {
    if (!this.showAnimationsFlag) {
      return;
    }
    this._showAnimations = bool;
  }

}

@Component({
  selector: 'tl-prompt-box',
  templateUrl: './prompt-box.component.html',
  styleUrls: ['./prompt-box.component.css'],
  animations: [
    trigger('dialogState', [
      state('hidden', style({
        opacity: 0,
      })),
      state('visible', style({
        opacity: 1,
      })),
      transition('visible => hidden', animate('1000ms ease-in')),
      transition('hidden => visible', animate('100ms ease-out'))
    ])
  ],
})
export class PromptBoxComponent implements OnInit, OnChanges {

  @Output() onVisibleChange: EventEmitter<any> = new EventEmitter();

  @Input() promptBoxObj: PromptBoxObj;

  public ifPromptsBox: boolean;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.promptBoxObj) {
      this.promptBoxObj.component = this;
    }
  }


  get promptsBoxStyles() {
    return {
      width: this.promptBoxObj.width,
      height: this.promptBoxObj.height,
    };
  }

  visibleChange(bool) {
    this.onVisibleChange.emit(bool);
  }

}
