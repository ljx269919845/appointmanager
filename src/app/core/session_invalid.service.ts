import { Injectable } from '@angular/core';

import { HTTP_HOOKS, HttpHookService } from './http';
import { WindowRefService, QtRef } from './qt';
import { AppState } from './app-state.service';
import { SUBJECT, SubjectService } from './subject';

@Injectable()
export class SessionInvalid {
    public called = false;
    state: AppState;

    constructor(private httpHook: HttpHookService, private winRef: WindowRefService, private sub: SubjectService) {
        this.state = winRef.state;
        httpHook.registerHttpHook(HTTP_HOOKS.HTTP_ERROR, (req, res) => {
            if (res !== 200 && (res !== 401)) {
                this.sub.pubscript(SUBJECT.GLOBAL_PROMPT_ERROR, '系统繁忙！');
                return;
            }

            // if (res && res.response && (res.response.status !== 401)) {
            //     return;
            // }
            if (this.called) {
                return;
            }
            this.called = true;

            winRef.qtRef.then((qtRef: QtRef) => {
                qtRef.callQtFunc('JSSessionInvalid', null);
            });
        });
    }
}
