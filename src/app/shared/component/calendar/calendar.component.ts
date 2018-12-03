/**
 * Created by zhangle on 2017/3/22.
 */
import { Component, Input, Output, EventEmitter, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export class CalendarObj {
    constructor(
        public defaultDate: Date = new Date(),
        public dateFormat: string = 'yy-mm-dd',
        public placeholder?: string,
        public disabled?: boolean,
        public minDate?: Date,
        public maxDate?: Date,
        public showTime?: boolean,
        public showSeconds?: boolean,
        public monthNavigator?: boolean,
        public yearNavigator?: boolean,
        public readonly?: boolean,
        public showOtherMonths?: boolean,
        public style?: { [key: string]: any },
        public inputStyle?: { [key: string]: any }
    ) {}
}

const CALENDAR = {
    firstDayOfWeek: 0,
    dayNames: [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
    dayNamesShort: [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
    dayNamesMin: [ '日', '一', '二', '三', '四', '五', '六' ],
    monthNames: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
    monthNamesShort: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ]
};

@Component({
    selector: 'tl-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CalendarComponent),
            multi: true
        }
    ]
})
export class CalendarComponent implements ControlValueAccessor, OnChanges {
    @Input() calendarObj: CalendarObj = new CalendarObj();
    @Input() readonly: boolean;

    @Output() calendarObjChange: EventEmitter<any> = new EventEmitter();

    calendarData = CALENDAR;
    value: Date;

    public currentYear;

    onChange: Function = () => {};
    onTouched: Function = () => {};

    constructor() {
        this.currentYear = '' + (new Date().getFullYear() + 10);
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('readonly' in changes) {
            console.log(changes);
            const readonly = changes['readonly'] && changes['readonly'].currentValue;
            {
            }
            this.calendarObj.disabled = readonly;
        }
        if ('calendarObj' in changes && this.calendarObj) {
            if (this.calendarObj.minDate) {
                this.calendarObj.minDate = this.strToDate(this.calendarObj.minDate);
            }
            if (this.calendarObj.maxDate) {
                this.calendarObj.maxDate = this.strToDate(this.calendarObj.maxDate);
            }
        }
    }

    changValue(event) {
        this.value = event;
        if (typeof event !== 'string') {
            this.onChange(this.formatDate(event));
        } else {
            this.onChange(event);
        }
    }

    registerOnChange(fn) {
        this.onChange = fn;
        //  this.changValue(new Date());
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    onInputBlur(event) {
        this.onTouched(event);
    }

    writeValue(value) {
        console.log(value);
        if (typeof value === 'string') {
            this.value = this.strToDate(value);
        } else {
            this.value = value;
        }
    }
    // 字符串转化为日期格式
    strToDate(str) {
        if (str instanceof Date) {
            return str;
        }
        if (!str) {
            return new Date();
        }
        str = str.split(' ')[0];
        const arr = str.split('-');
        const date = new Date(arr[0], Number(arr[1]) - 1, arr[2]);
        return date;
    }

    // 日期格式转化
    formatDate(date) {
        if (!date) {
            return '';
        }
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }
}
