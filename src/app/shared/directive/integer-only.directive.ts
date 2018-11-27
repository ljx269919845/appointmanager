import { Directive,  ElementRef, HostListener, Input, forwardRef, Renderer} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const INTEFGER_VALUE_ACCESSOR:any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IntegerOnlyDirective),
  multi: true
};

@Directive({
  selector: 'input[IntegerOnly]',
  host: {
    '(change)': 'onChange($event.target.value)',
    '(input)': 'onChange($event.target.value)',
    '(blur)': 'onTouched()'
  },
  providers: [INTEFGER_VALUE_ACCESSOR]
})
export class IntegerOnlyDirective {

  onChange = (_: any) => {};
  onTouched = () => {};

  private _pattern=/^\d*$/;

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) {}

  writeValue(value: number): void {
    // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
    const normalizedValue = value == null ? '' : value;
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = (value) => {
      //let integer = value.replace(/\D/g, '');
      let integer = this.patternOnly(value);
      if(integer != value){
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', integer);
      }
      fn(value == '' ? null : integer);
    };
  }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  patternOnly(val){
    while(val.length > 0 && !this._pattern.test(val)){
      val = val.substr(0, val.length - 1);
    }
    return val;
  }

}
