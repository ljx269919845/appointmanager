import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormGroup } from '@angular/forms';
import { globalValidMsgServ } from 'mpr-form-valid';

@Directive({
    selector: '[appCip]',
    providers: [ { provide: NG_VALIDATORS, useExisting: CipDirective, multi: true } ]
})
export class CipDirective implements Validator {
    constructor() {
        globalValidMsgServ.registerMsg('cipError', '请输入完整CIP');
        globalValidMsgServ.registerMsg('cipYearError', '请输入1900-2299的年份');
        globalValidMsgServ.registerMsg('cipNumError', '请输入5-6位数字--如：第25152号');
    }

    validate(control: FormGroup) {
        const cip = control.value;
        const cipYear = cip.cipYear;
        const cipNum = cip.cipNum;

        if (cipYear && (Number(cipYear) < 1900 || Number(cipNum) > 2299)) {
            return { cipYearError: true };
        }

        if (cipNum && !/^(|\d{1,6})$/.test(cipNum)) {
            return { cipNumError: true };
        }

        if ((cipYear && !cipNum) || (!cipYear && cipNum)) {
            return { cipError: true };
        }
        return null;
    }
}
