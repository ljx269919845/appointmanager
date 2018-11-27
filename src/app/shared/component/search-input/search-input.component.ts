import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { make_form_value_provide, FormValueAccess } from '../../../core';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'tl-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: [ './search-input.component.scss' ],
    providers: [ make_form_value_provide(SearchInputComponent) ]
})
export class SearchInputComponent extends FormValueAccess implements OnInit {
    @Input() placeholderValue = '';
    public searchWord: string;
    public focusFlag;

    private obServer;
    constructor() {
        super();
        Observable.create((ob) => {
            this.obServer = ob;
        })
            .pipe(debounceTime(1500))
            .subscribe((searchWord) => {
                this.changeFunc((searchWord || '').trim());
            });
    }

    ngOnInit() {}

    // 得到焦点
    focus() {
        this.focusFlag = true;
    }

    // 失去焦点
    blur() {
        this.focusFlag = false;
    }

    writeValue(value) {
        if (value) {
            this.searchWord = value;
        } else {
            this.searchWord = null;
        }
    }

    handleSearchWordChange(searchWord) {
        this.obServer.next(searchWord);
    }
}
