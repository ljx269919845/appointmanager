/**
 * Created by zhangle on 2017/3/22.
 */
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarObj } from '../calendar/calendar.component';

@Component({
  selector: 'tl-start-end-calendar',
  templateUrl: './start-end-calendar.component.html',
  styleUrls: ['./start-end-calendar.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StartEndCalendarComponent),
      multi: true
    }
  ]
})
export class StartEndCalendarComponent {
  @Output() onDateChange: EventEmitter<any> = new EventEmitter();

  @Input() showTimes = false;
  @Input() showOtherMonths = true;
  @Input() set border(border: string) {
    this._beginCalendar.inputStyle = this._beginCalendar.inputStyle ? Object.assign(this._beginCalendar.inputStyle, { 'border': border }) : { 'border': border };
  }
  @Input() set width(width: number) {
    const style = { 'width': width - 22 + 'px' };
    const inputStyle = { 'width': width - 22 + 'px' };
    this._beginCalendar.style = style;
    this._endCalendar.style = style;
    this._beginCalendar.inputStyle = this._beginCalendar.inputStyle ? Object.assign(this._beginCalendar.inputStyle, inputStyle) : inputStyle;
    this._endCalendar.inputStyle = this._beginCalendar.inputStyle ? Object.assign(this._beginCalendar.inputStyle, inputStyle) : inputStyle;
  }
  @Input() set beginCalendar(value) {
    this._beginCalendar = Object.assign(this._beginCalendar || {}, value);
  }

  @Input() set endCalendar(value) {
    this._endCalendar = Object.assign(this._endCalendar || {}, value);
  }

  value: Date;
  private _beginDate: Date;
  private _endDate: Date;
  private _beginCalendar: CalendarObj;
  private _endCalendar: CalendarObj;

  onChange: Function = () => { };
  onTouched: Function = () => { };

  constructor() {
    const now = new Date();
    this._beginCalendar = new CalendarObj();
    this.endCalendar = new CalendarObj();
    this.beginCalendar.maxDate = now;
    this.endCalendar.maxDate = now;
    this._beginCalendar.showTime = this.endCalendar.showTime = this.showTimes; // yan
    this._beginCalendar.showOtherMonths = this.endCalendar.showOtherMonths = this.showOtherMonths; // yan
    this._beginCalendar.showSeconds = this.endCalendar.showSeconds = this.showTimes; // yan
    this._beginCalendar.yearNavigator = this.endCalendar.yearNavigator = true;
    this._beginCalendar.monthNavigator = this.endCalendar.monthNavigator = true;
    this._beginCalendar.readonly = this.endCalendar.readonly = true;
    this._beginCalendar.placeholder = '开始日期';
    this.endCalendar.placeholder = '结束日期';
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
    if (!value) {
      this._beginDate = undefined;
      this._endDate = undefined;
      const now = new Date();
      this.beginCalendar.maxDate = now;   // yan
      // this.beginCalendar.maxDate = undefined;
      this.beginCalendar.minDate = undefined;
      this.endCalendar.maxDate = now;  // yan
      // this.endCalendar.maxDate = undefined;
      this.endCalendar.minDate = undefined;
    } else {
      this._beginDate = new Date(value.startDate);
      this._endDate = new Date(value.endDate);
    }
  }

  get beginCalendar() {
    return this._beginCalendar;
  }

  get endCalendar() {
    return this._endCalendar;
  }

  set beginDate(bDate) {
    console.log(bDate);
    this._beginDate = bDate;
    this.onChange(this.getValue());
    this.onDateChange.emit({ beginDate: this._beginDate, endDate: this._endDate });
    this._endCalendar = Object.assign({}, this._endCalendar, {minDate: bDate});
  }

  get beginDate() {
    return this._beginDate;
  }

  set endDate(eDate) {
    this._endDate = eDate;
    this.onChange(this.getValue());
    this.onDateChange.emit({ beginDate: this._beginDate, endDate: this._endDate });
    this._endCalendar = Object.assign({}, this._endCalendar, {maxDate: eDate});
  }

  get endDate() {
    return this._endDate;
  }

  format_date(date): string {
    if (!date) {
      return '';
    }
    if(typeof date === 'string'){
      date = new Date(date);
    }
    console.log('' + date.getFullYear() + '-' + (
      (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1) + '') + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate() + '')
      + ' ' + (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours() + '') + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes() + '') + ':' +
      (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds() + ''));
    return '' + date.getFullYear() + '-' + (
      (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1) + '') + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate() + '')
      + ' ' + (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours() + '') + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes() + '') + ':' +
      (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds() + '');   // yan
  }

  getValue() {
    return { startDate: this.beginDate && this.beginDate + ' 00:00:00', endDate: this.endDate && (this.endDate + ' 23:59:59') };
  }
}
