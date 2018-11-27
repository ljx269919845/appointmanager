
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MultOptionsService } from './mult-options.service';
import { Component, OnInit, Input, SimpleChanges, forwardRef } from '@angular/core';

export interface MultOptionsItem {
    id: string;
    parentId?: string;
}

const MULT_VAULE_ACCESS = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultOptionsComponent),
    multi: true
};

@Component({
    selector: 'isli-mult-options',
    templateUrl: './mult-options.component.html',
    styleUrls: [ './mult-options.component.scss' ],
    providers: [ MultOptionsService, MULT_VAULE_ACCESS ]
})
export class MultOptionsComponent implements OnInit, ControlValueAccessor {
    @Input() value: Array<MultOptionsItem>;
    @Input() selected: Array<MultOptionsItem>;

    @Input() keyId = 'id';
    @Input() parentKeyId = 'parentId';
    @Input() keyName: string;
    @Input() optionsClass = 'classify';
    @Input() parentId = '-999';
    @Input() width = 115;
    @Input() level = 0;
    @Input() readonly;

    private change = (v) => {};
    private touch = (v) => {};

    constructor(private multOptionsServ: MultOptionsService) {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        // Add '${implements OnChanges}' to the class.
        if ('value' in changes && this.value) {
            this.multOptionsServ.registerData(this.value, this.keyId, this.parentKeyId);
            this.change(this.multOptionsServ.getSelectValue()); // 下拉选择数据稍后到，组件会对设置的数据进行修正，需要再次更新
        }
    }

    registerOnChange(change) {
        this.change = change;
    }

    registerOnTouched(touch) {
        this.touch = touch;
    }

    writeValue(value) {
        if (!value) {
            return;
        }
        this.multOptionsServ.setSelectValue(value);
        Promise.resolve(null).then(() => {
            this.change(this.multOptionsServ.getSelectValue());
        });
        // if(!CommonFuncService.objectEq(this.multOptionsServ.getSelectValue(), value)){
        //   Promise.resolve(null).then(()=>{
        //     this.change(this.multOptionsServ.getSelectValue());
        //   })
        // }
    }

    handleSelectedChange(event) {
        console.log('multi-options selected value:', event);
        this.change(this.multOptionsServ.getSelectValue());
    }
}
