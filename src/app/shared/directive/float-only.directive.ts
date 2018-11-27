import { Directive, ElementRef, Input, Renderer, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const FLOAT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FloatOnlyDirective),
  multi: true
};

@Directive({
  selector: 'input[FloatOnly]',
  host: {
    '(change)': 'onChanged($event.target.value)',
    '(input)': 'onChange($event.target.value)',
    '(blur)': 'onChanged($event.target.value)'
  },
  providers: [FLOAT_VALUE_ACCESSOR]
})
export class FloatOnlyDirective {
  onChange = (_: any) => { };
  onTouched = () => { };
  _pattern = /^\d+\.?\d{0,2}$/;
  int_pattern = /^\d+$/;

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

  writeValue(value: number): void {
    // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
    const normalizedValue = value == null ? '' : value;
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = (value) => {
      let floatVal = this.floatOnly(value);
      if (floatVal != value) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', floatVal);
      }
      fn(value == '' ? null : floatVal);
    };
  }

  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  onChanged(value) {
    let floatVal = parseFloat(value).toFixed(2);
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', floatVal.toString());
    this.onChange(floatVal.toString());
  }


  floatOnly(value) {
    let elemRef = this._elementRef;
    let maxlength = elemRef.nativeElement.maxLength || 0;
    while ((value.length > 0 && !this._pattern.test(value)) || (maxlength && this.int_pattern.test(value) && value.length > maxlength - 3)) {
      value = value.substr(0, value.length - 1);
    }
    return value;
  }
}
