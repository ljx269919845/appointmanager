import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormGroup } from '@angular/forms';
import { globalValidMsgServ } from 'mpr-form-valid';

@Directive({
    selector: '[appEdition]',
    providers: [ { provide: NG_VALIDATORS, useExisting: EditionDirective, multi: true } ]
})
export class EditionDirective implements Validator {
    constructor() {
        globalValidMsgServ.registerMsg('editionError', '请输入完整版次数');
        globalValidMsgServ.registerMsg('editonYearError', '请输入1900-2299的年份');
        globalValidMsgServ.registerMsg('editionMonthError', '请输入1-12的月份');
        globalValidMsgServ.registerMsg('editionNumError', '请输入完整版次数');
    }

    validate(control: FormGroup) {
        const edition = control.value;
        const editionYear = edition.editionYear;
        const editionMonth = edition.editionMonth;
        const editionNum = edition.editionNum;

        if (editionYear && (Number(editionYear) < 1900 || Number(editionYear) > 2299)) {
            return { editonYearError: true };
        }

        if (editionMonth && (Number(editionMonth) < 1 || Number(editionMonth) > 12)) {
            return { editionMonthError: true };
        }

        if (editionNum && !/^(|\d{1,5})$/.test(editionNum)) {
            return { editionNumError: true };
        }

        if (!editionYear || !editionMonth || !editionNum) {
            return { editionError: true };
        }
        return null;
    }
}
