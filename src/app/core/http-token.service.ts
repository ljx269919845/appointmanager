import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AppState } from './app-state.service';
import { IHttpHeaderService } from './http/http-header.service';
import { WindowRefService, QtRef, QtResponseModel } from './qt';

const QT_GET_TOKEN_CALL = 'JSGetFanmeiToken';
const QT_GET_TOKEN_SIGN = 'SigNotifyJsGetFanmeiTokenFinish';

@Injectable()
export class HttpTokenService implements IHttpHeaderService {
    constructor(private state: AppState, private windowRefService: WindowRefService) {}

    public getHeader() {
        const lastTime = this.state.get('last_get_token');
        const token = this.state.get('token') || '';
        // if (!token || !lastTime || (new Date().getTime() - lastTime > 100000)) {
        //     this.state.set('last_get_token', new Date().getTime());
        //    console.log('444444444444444begin', new Date().getTime());
        //     return new Promise(resolve => {
        //         this.windowRefService.qtRef.then((qtRef: QtRef) => {
        //             qtRef.qtRequest(QT_GET_TOKEN_CALL, QT_GET_TOKEN_SIGN, null, 2).success((res: QtResponseModel) => {
        //                 if (res.data) {
        //                     resolve({ token: res.data });
        //                     console.log('444444444444444end', new Date().getTime());
        //                 }
        //             }).error(() => {
        //                 resolve({ token: '' });
        //             });
        //         });
        //     });
        // }
        return { token: token };
    }

    public setHeader(headers: HttpHeaders) {
        const token = headers.get('token');
        if (token && token !== this.state.get('token')) {
            this.state.set('token', token);
            this.windowRefService.qtRef.then((qtRef) => {
                qtRef.callQtFunc('JSSetFanmeiToken', token);
            });
        }
    }
}
