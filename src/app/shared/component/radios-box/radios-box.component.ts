import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tl-radios-box',
  templateUrl: './radios-box.component.html',
  styleUrls: ['./radios-box.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiosBoxComponent),
      multi: true
    }
  ]
})
export class RadiosBoxComponent implements OnInit {

  @Output() onSelectedFn:EventEmitter<any> = new EventEmitter();

  @Input() radiosData:Array<any>;
  @Input() name:string;
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
    console.log(value);
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
