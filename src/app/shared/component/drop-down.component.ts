import {
    Component,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    QueryList,
    ContentChildren,
    OnInit,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TemplateRefDirective } from '../directive';
import { CommonFuncService } from '../../core/common-func.service';

@Component({
    selector: 'tl-drop-down',
    template: `
        <p-dropdown class="tl-drop-down" [disabled]="disabled" [style.color]="disabled?'#BDBDBD':'#000'"
        [style]="style" [options]="_dataValue"
        [(ngModel)]="selectedDropDown" [filter]="filter" [autoWidth]="autoWidth">
            <ng-template let-obj pTemplate="item">
                <div class="ui-helper-clearfix">
                    <div class="label-list" title={{obj.label}}>
                        <span *ngIf="obj?.level == 2">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span *ngIf="obj?.level == 3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        {{obj.label}}
                    </div>
                </div>
            </ng-template>
        </p-dropdown>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropDownComponent),
            multi: true
        }
    ]
})
export class DropDownComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Output() selectedFn = new EventEmitter<any>();

    @Input() style: string;
    @Input() disabled: any;
    @Input() labelName = 'name';
    @Input() valueName = 'id';
    @Input() readOnly;
    @Input() dataValue: Array<any>; // 选项数组
    @Input() autoWidth = true;

    @ContentChildren(TemplateRefDirective) templates: QueryList<any>;

    public _selectedDropDown;
    public oldValue;
    public filter: boolean;
    public _dataValue = [];

    private tempArray;

    onChange: Function = () => { };
    onTouched: Function = () => { };

    constructor() { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        // Add '${implements OnChanges}' to the class.
        if ('readOnly' in changes) {
            this.disabled = this.readOnly;
        }
        if ('dataValue' in changes && this.dataValue && this.dataValue.length) {
            console.log(this.tempArray);
            const dataValue = changes['dataValue']['currentValue'];
            if (!this.tempArray) {
                this.reset();
            } else if (this.tempArray.length !== dataValue.length) {
                this.reset();
            } else if (!CommonFuncService.objectEq(dataValue, this.tempArray)) {
                this.reset();
            }
            this.tempArray = CommonFuncService.clone(dataValue);
        } else if ('dataValue' in changes && this.dataValue) {
            this._dataValue = this.dataValue;
        }
        console.log(this._dataValue);
    }

    reset() {
        this._dataValue = [];
        const labelName = this.labelName ? this.labelName : 'name';
        const valueName = this.valueName ? this.valueName : 'id';
        for (const val of this.dataValue) {
            if (this.dataValue['value']) {
                this._dataValue.push(Object.assign({ label: '' + val[labelName] + '' }, val));
            } else {
                if (val) {
                    this._dataValue.push(
                        Object.assign({ label: '' + val[labelName] + '', value: '' + val[valueName] + '' }, val)
                    );
                }
            }
        }
        // this.filter = this._dataValue.length > 10;
        if (!this._selectedDropDown) {
            this._selectedDropDown = this._dataValue[0][valueName];
        }
    }

    registerOnChange(fn) {
        this.onChange = fn;
        if (this._selectedDropDown) {
            this.onChange(this._selectedDropDown);
        }
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    writeValue(value) {
        if (!value) {
            this._selectedDropDown = '';
        } else {
            this._selectedDropDown = value;
        }
    }

    set selectedDropDown(value) {
        this._selectedDropDown = value;
        if (this._selectedDropDown === this.oldValue) {
            return;
        }
        this.oldValue = value;
        try {
            this.onChange(value);
        } catch (error) {
            return;
        }
        this.selectedFn.emit(value);
    }

    get selectedDropDown() {
        return this._selectedDropDown;
    }
}
