import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'tl-drop-down-box',
  templateUrl: './drop-down-box.component.html',
  styleUrls: ['./drop-down-box.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownBoxComponent),
      multi: true
    }
  ],
  animations: [
    trigger('dialogState', [
      state('hidden', style({
        'max-height': '0',
        'display': 'none'
      })),
      state('visible', style({
        'max-height': '148px',
        'display': 'block'
      })),
      transition('visible => hidden', animate('100ms ease-out')),
      transition('hidden => visible', animate('100ms ease-out'))
    ])
  ],
})
export class DropDownBoxComponent implements OnInit {

  @Output() onSelectedFn: EventEmitter<any> = new EventEmitter();

  @Input() dropDownBoxValue: Array<any>;
  @Input() keyName = 'name';
  @Input() keyId = 'id';
  @Input() placeholder = '请选择';


  @Input() width = 200;
  @Input() height = 26;
  @Input() rows = 5;
  @Input() border: string;
  @Input() color: string;
  @Input() readonly = false;


  public index: number;
  public mouseEnterFlag: boolean;
  public _toggleFlag: boolean;
  public animationFlag: boolean;

  private _value: string;

  public onChange: Function = () => {
  }
  public onTouched: Function = () => {
  }


  constructor() {
  }

  ngOnInit() {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    this._value = value;
    if (this.dropDownBoxValue && this.dropDownBoxValue.length) {
      for (let i = 0; i < this.dropDownBoxValue.length; i++) {
        if (this.dropDownBoxValue[i][this.keyId] === this._value) {
          this.index = i;
          return;
        }
      }
    }
  }

  set value(value) {
    // if (value === undefined || value === '') {
    if (value === undefined) {
      return;
    }
    this._value = value;
    try {
      this.onChange(value);
    } catch (error) {
      return;
    }
    this.onSelectedFn.emit(value);
  }

  get value() {
    if (this.dropDownBoxValue && this.dropDownBoxValue.length && this._value !== undefined) {
      for (const obj of this.dropDownBoxValue) {
        if (obj[this.keyId] === this._value) {
          return obj[this.keyName];
        }
      }
    }
    return undefined;
  }

  set toggleFlag(value) {
    if (value) {
      this._toggleFlag = value;
    } else {
      setTimeout(() => {
        this._toggleFlag = value;
      }, 300);
    }
    this.animationFlag = value;
  }

  get toggleFlag() {
    return this._toggleFlag;
  }

  positionMouseLeave() {
    this.toggleFlag = false;
  }

  clickToggle() {
    if (this.readonly) {
      return;
    }
    this.toggleFlag = !this.toggleFlag;
  }

  select(obj, i) {
    this.toggleFlag = !this.toggleFlag;
    if (this.index === i) {
      return;
    }
    this.index = i;
    this.value = obj[this.keyId];
  }

  onMouseEnter(index) {
    this.mouseEnterFlag = true;
  }

  onMouseLeave() {
    this.mouseEnterFlag = false;
  }

  get ngStylePosition() {
    return {
      'width': this.width + 'px',
      'height': this.height + 'px',
    };
  }

  get ngStyleDiv() {
    return {
      'width': this.width - 2 + 'px',
      'height': this.height - 2 + 'px',
    };
  }

  get ngStyleInput() {
    return {
      'width': this.width - 34 + 'px',
      'height': this.height - 2 + 'px',
      'line-height': this.height - 2 + 'px'
    };
  }

  get ngStyleUl() {
    return {
      'width': this.width - 2 + 'px',
      'max-height': ((this.height) * this.rows + 8) + 'px'
    };
  }

  get ngStyleLi() {
    return {
      'height': this.height + 2 + 'px',
      'line-height': this.height + 2 + 'px'
    };
  }

  get ulHeight() {
    // if(!this.dropDownBoxObj){
    //  return '0px';
    // }
    // return this.dropDownBoxObj.height*this.dropDownBoxObj.rows+'px';
    return '148px';
  }
}
