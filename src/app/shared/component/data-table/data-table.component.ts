/**
 * Created by zhangle on 2017/3/25.
 */
import {
    Component,
    Input,
    Output,
    OnInit,
    EventEmitter,
    QueryList,
    ContentChildren,
    AfterViewInit,
    ElementRef,
    NgZone,
    OnDestroy
} from '@angular/core';

import { TemplateRefDirective } from '../../directive';
import { PagingBoxObj } from '../paging-box/paging-box.component';

export class DataColumnObj {
    constructor(
        public header: string,
        public hidden?: boolean,
        public field?: string,
        public template?: string,
        public sortable?: boolean,
        public styleClass?: string,
        public style?: any
    ) { }
}

export class RowGroupObj {
    constructor(public mode: string, public field: string, public template: string, public sortable: boolean = false) { }
}

export class SelectionObj {
    constructor(public mode: string, public style?: any, public styleClass?: string) { }
}

export class DataTableObj {
    constructor(
        public columnObjs: Array<DataColumnObj>,
        public value?: Array<any>,
        public rowGroupObj?: RowGroupObj,
        public selectionObj?: SelectionObj,
        public sortField?: string,
        public sortOrder?: number
    ) { }
}

@Component({
    selector: 'tl-data-table',
    templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() paginateObj: PagingBoxObj;
    @Input() dataTableObj: DataTableObj;
    @Input() rowStyleClass: Function;
    @Input() noDataMsg: string;
    @Input() lookupRowStyleClass: Function;
    @Input() styleTop: string;
    @Input() selection: any;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() onPage: EventEmitter<any> = new EventEmitter();
    @Output() onSort: EventEmitter<any> = new EventEmitter();

    private colWidths = [];
    private windowClientWith;
    private tableClientWith;

    @ContentChildren(TemplateRefDirective) templates: QueryList<any>;

    constructor(private elemRef: ElementRef, private zone: NgZone) {
        this.resize = this.resize.bind(this);
    }

    ngOnInit() { }

    ngOnDestroy(): void {
        window.removeEventListener('resize', this.resize);
    }

    ngAfterViewInit() {
        window.addEventListener('resize', this.resize);
        const table: HTMLElement = this.elemRef.nativeElement.querySelector('table');
        let cols = this.elemRef.nativeElement.querySelectorAll('th.ui-resizable-column');
        cols = cols || [];
        for (let i = 0; i < cols.length; i++) {
            this.colWidths.push(cols[i].offsetWidth / table.offsetWidth);
        }
        this.windowClientWith = document.documentElement.clientWidth;
        this.tableClientWith = table.offsetWidth;
    }

    resize(event) {
        // const table: HTMLElement = this.elemRef.nativeElement.querySelector('table');
        let cols: Array<HTMLElement> = this.elemRef.nativeElement.querySelectorAll('th.ui-resizable-column');
        cols = cols || [];
        const width = this.tableClientWith + (document.documentElement.clientWidth - this.windowClientWith);
        this.zone.run(() => {
            for (let i = 0; i < cols.length; i++) {
                cols[i].style.width = width * this.colWidths[i] + 'px';
            }
        });
    }

    getStyle(style) {
        return Object.assign({ 'min-width': '90px' }, style || {});
    }
}
