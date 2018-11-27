import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';
export class FormValueAccess {
    protected changeFunc = (v) => v;
    protected touchFunc = (v) => v;
    constructor() {}

    registerOnChange(changeFunc) {
        this.changeFunc = changeFunc;
    }

    registerOnTouched(touchFunc) {
        this.touchFunc = touchFunc;
    }

    writeValue(v) {}
}

export function make_form_value_provide(component) {
    return {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => component)
    };
}
