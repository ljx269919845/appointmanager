import { Directive } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS, FormGroup } from '@angular/forms';
import { globalValidMsgServ } from 'mpr-form-valid';

@Directive({
    selector: '[appIsbn]',
    providers: [ { provide: NG_VALIDATORS, useExisting: IsbnDirective, multi: true } ]
})
export class IsbnDirective implements Validator {
    constructor() {
        globalValidMsgServ.registerMsg('isbn', '请输入正确的ISBN号');
        globalValidMsgServ.registerMsg('isbn1Error', '第一组必须为978或979');
        globalValidMsgServ.registerMsg('isbn2Error', '第二组为1位数字');
        globalValidMsgServ.registerMsg('isbn3Error', '第三组2~7位数字');
        globalValidMsgServ.registerMsg('isbn4Error', '第四组为1~6位数字');
        globalValidMsgServ.registerMsg('isbn5Error', '第五组为1位数字');
        globalValidMsgServ.registerMsg('isbn34Error', '第三组和第四组一共为8位数字');
    }

    validate(control: FormGroup) {
        const isbn = control.value;
        const isbn1 = isbn.isbn1;

        // 验证第一段isbn
        if (isbn1 && isbn1 !== '000' && isbn1 !== '978' && isbn1 !== '979' && isbn1 !== '999') {
            return { isbn1Error: true };
        }

        // 验证第二段isbn
        const isbn2 = isbn.isbn2;
        if (isbn2 && !/^\d{1,2}|[0]{1,2}$/.test(isbn2)) {
            return { isbn2Error: true };
        }

        // 验证第三段isbn
        const isbn3 = isbn.isbn3;
        if (isbn3 && !/^\d{2,7}|[0]{2,7}$/.test(isbn3)) {
            return { isbn3Error: true };
        }

        // 验证第四段isbn
        const isbn4 = isbn.isbn4;
        if (isbn4 && !/^\d{1,6}|[0]{1,6}$/.test(isbn4)) {
            return { isbn4Error: true };
        }

        if (isbn3 && isbn4 && isbn3.length + isbn4.length != 8) {
            return { isbn34Error: true };
        }

        // 验证第五段isbn
        const isbn5 = isbn.isbn5;
        if (isbn5 && !/^\d{1}|0$/.test(isbn5)) {
            return { isbn5Error: true };
        }

        if (!this.validISBNCode([ isbn1, isbn2, isbn3, isbn4, isbn5 ].join(''))) {
            return { isbn: true };
        }
        return null;
    }

    private isBarCode(s): boolean {
        if (s.length !== 13) {
            return false;
        }
        const reg = new RegExp(/^[0-9]{12}$/);
        return reg.exec(s.substring(0, 12)) != null;
    }

    private validISBNCode(s) {
        if (s === '9999999999999') {
            return true;
        }
        if (!this.isBarCode(s)) {
            return false;
        }
        let a = 0;
        let b = 0;
        let c = 0;
        let d = 0;
        let e;
        let i = 0;
        for (i = 1; i <= 12; i++) {
            const sc = parseInt(s[i - 1], 10);
            if (i <= 12 && i % 2 === 0) {
                a += sc;
            } else if (i <= 11 && i % 2 === 1) {
                b += sc;
            }
        }
        c = a * 3;
        d = b + c;
        if (d % 10 === 0) {
            e = d - d;
        } else {
            e = d + (10 - d % 10) - d;
        }
        return e === parseInt(s[i - 1], 10);
    }
}
