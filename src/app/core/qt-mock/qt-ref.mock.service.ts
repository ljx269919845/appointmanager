import { Injectable, NgZone} from '@angular/core';

import { QtRef, QtResponse, QtResponseModel } from '../qt'
import { AppState } from '../app-state.service';

let qtObject = {};

export function registerCallSign(callName: string, signName: string, value: any) {
    qtObject[callName] = () => { };
    qtObject[signName] = makeSignResponse(value);
}

function makeSignResponse(value) {
    return {
        connect: (func: Function) => {
            setTimeout(() => {
                func(value);
            }, 1500);
        }
    }
}

@Injectable()
export class QtRefMockService {
    private _qtRef: QtRef;
    
    constructor(private zone: NgZone, private state: AppState) {
        this._qtRef = new QtRef(qtObject, zone, state);
        this._qtRef.qtRequest = this.qtRequest.bind(this);
    }

    qtRequest(callName:string, signName:string, params:string, timeout=10){
        let responseModel = new QtResponseModel(callName, signName, params);
        let qtResponse = new QtResponse(responseModel);
      //  this._qtRef.connectSignFunc(signName, this.recvSignFunc(responseModel.requstId, qtResponse))
        qtResponse.listenTimeOut(timeout);
        return qtResponse.before(()=>{
            qtObject[signName].connect((value)=>{
                qtResponse.handleSuccess(value)
            });
        });
    }

    get qtRef() {
        return Promise.resolve(this._qtRef);
    }
}