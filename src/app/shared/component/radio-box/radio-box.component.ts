import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tl-radio-box',
  templateUrl: './radio-box.component.html',
  styleUrls: ['./radio-box.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioBoxComponent),
      multi: true
    }
  ]
})
export class RadioBoxComponent implements OnInit {

  @Output() onSelectedFn:EventEmitter<any> = new EventEmitter();

  @Input() labelName:string;
  @Input() inputName:string;
  @Input() inputValue:string;
  @Input() width;

  public onChange: Function = () => { };
  public onTouched: Function = () => { };

  private _value:string;

  constructor() { }

  ngOnInit() {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  onInputBlur(event) {
    this.onTouched(event);
  }

  writeValue(value) {
    this._value = value;
  }

  set value(value){
    if(value===null||value===undefined){
      return;
    }
    this._value=value;
    try{
      this.onChange(value);
    }catch(error){
      return;
    }
    this.onSelectedFn.emit(value);
  }

  get value(){
    return this._value
  }

}
