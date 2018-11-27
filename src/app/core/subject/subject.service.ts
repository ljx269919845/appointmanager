import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export enum SUBJECT {
    GLOBAL_LOADING,
    GLOBAL_PROMPT,
    GLOBAL_PROMPT_ERROR,
    GLOBAL_CONFIRM_CANCEL,
    GLOBAL_HANDDLE_ERROR,
    GLOBAL_IMAGE,
    NAV_MENU_CLICK,
    NO_DATA,
    LOCAL_LOADING,
    GOODS_INFO,
    CONFIRMATION_GOODS_RMS_PICTURE,
    CAN_LEAVE_FLAG,
    URL_CHANGE,
    GOODS_PRICE_CHANGES,
    GET_BOOK_EDIRORS,
    SAVE_BOOK_SUCCESS,
    REFRESH_LIST
}

export enum GOODS_CREATE {
    SHOW_EDITING = 1000,
    SHOW_EDITING_OK,
    SHOW_EDITING_NO,
    GOODS_DELTE
}

export enum UPDATE_DATA {
    PORTAL_INFO = 2018
}

export enum FINANCE_LIST_TYPE {
    CHECK_DETAIL = 3000,
    SETTLEMENT_DETAIL
}

@Injectable()
export class SubjectService {
    private subjects = {};

    constructor() {}

    subscript(subType: GOODS_CREATE | SUBJECT | string): Observable<any> {
        if (this.subjects[subType]) {
            return this.subjects[subType];
        }
        this.subjects[subType] = new Subject<any>();
        // this.subjects[subType + '_ob'] = this.subjects[subType].asObservable();
        return this.subjects[subType];
    }

    pubscript(subType: GOODS_CREATE | SUBJECT | string, params = null) {
        if (!this.subjects[subType]) {
            console.log('no subject find');
            return;
        }
        this.subjects[subType].next(params);
    }
}
