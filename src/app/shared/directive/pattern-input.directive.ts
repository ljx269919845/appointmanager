import { Directive, ElementRef, Input, Renderer, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PATTERN_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PatternInputDirective),
  multi: true
};


@Directive({
  selector: '[patternInput]',
  host: {
    '(change)': 'onChange($event.target.value)',
    '(input)': 'onChange($event.target.value)',
    '(blur)': 'onTouched()'
  },
  providers: [PATTERN_VALUE_ACCESSOR]
})
export class PatternInputDirective {

  @Input('patternInput') set patternInput(value) {
    if (!value) {
      return;
    }
    this._pattern = new RegExp(value);
  }

  private _pattern;

  onChange = (_: any) => { };
  onTouched = () => { };

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

  writeValue(value: number): void {
    // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
    const normalizedValue = value == null ? '' : value;
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = (value) => {
      const patternVal = this.patternOnly(value);
      if (patternVal !== value) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', patternVal);
      }
      fn(value === '' ? null : patternVal);
    };
  }

  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  patternOnly(val) {
    while (val.length > 0 && !this._pattern.test(val)) {
      val = val.substr(0, val.length - 1);
    }
    return val;
  }
}
