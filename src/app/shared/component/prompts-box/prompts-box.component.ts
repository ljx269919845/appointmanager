import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

export class PromptsBoxObj {

  public component:any;
  private time;

  constructor(public name?:string,
              public width?:string,
              public height?:string,
              public error:boolean=false,
              public positionFlag:boolean=false,
              public showAnimationsFlag:boolean = true,
              public closeSetTimeoutFlag:boolean = false,
              public _visible:boolean = false,
              public _showAnimations:boolean = true

  ) {
  }

  get visible() {
    return this._visible;
  }

  set visible(bool:boolean) {
    if (bool&&!this.closeSetTimeoutFlag) {
      setTimeout(()=> {
        this.time = setTimeout(() => {
          this._visible = false;
          this.component.visibleChange(false);
          if(this.error){
            this.error=false;
          }
        }, 1000);
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

  setAnimations(bool:boolean){
    if(!this.showAnimationsFlag){
      return;
    }
    this._showAnimations=bool;
  }

}

@Component({
  selector: 'tl-prompts-box',
  templateUrl: './prompts-box.component.html',
  styleUrls: ['./prompts-box.component.css'],
  animations: [
    trigger('dialogState', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('visible => hidden', animate('1000ms ease-in')),
      transition('hidden => visible', animate('100ms ease-out'))
    ])
  ],
})
export class PromptsBoxComponent implements OnInit {

  @Output() onVisibleChange:EventEmitter<any> = new EventEmitter();

  @Input() promptsBoxObj:PromptsBoxObj;

  public ifPromptsBox:boolean;

  constructor() {
  }

  ngOnInit() {
    this.promptsBoxObj.component = this;
  }

  get promptsBoxStyles(){
    return {
      width:this.promptsBoxObj.width,
      height:this.promptsBoxObj.height,
    }
  }

  visibleChange(bool){
    this.onVisibleChange.emit(bool);
  }

}
