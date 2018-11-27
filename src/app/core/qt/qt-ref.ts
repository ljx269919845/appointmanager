import { NgZone } from '@angular/core';
import { QtResponse } from './qt-response';
import { QtResponseModel } from './qt.type';
import { AppState } from '../app-state.service';

interface QtConnectType {
    [key: string]: Array<{
        once: boolean,
        func: Function
    }>;
}

export class QtRef {

    private qtConnects: QtConnectType = {};
    private qtRequst = {};
    constructor(public qtObject, private zone: NgZone, private state: AppState) {
        console.log(qtObject);
    }

    // 绑定Qt信号槽, 需要在Qt发送信号前绑定, 否则无法执行相关函数
    // 允许重复绑定, 同一个信号,会关联到最后一次绑定上
    connectSignFunc(signName: string, func: Function, onlyOnce = true, bindOnlyOnce = false) {
        if (this.qtObject.then) {
            return this.qtObject.then((qtRef) => {
                this.qtObject = qtRef.qtObject;
                this.connectSignFunc(signName, func, onlyOnce, bindOnlyOnce);
            });
        }
        if (!(signName in this.qtObject)) {
            this.connectWindowFunc(signName, this.executeSign(signName));
        }
        if ((signName in this.qtObject) && !(signName in this.qtConnects)) {
            console.log('sign first connect: ' + signName);
            this.qtObject[signName].connect(this.executeSign(signName));
        }
        console.log('sign reconnect: ' + signName);
        if (this.qtConnects[signName]) {
            if (bindOnlyOnce) {
                this.qtConnects[signName] = [{ func: func, once: onlyOnce }];
            } else {
                this.qtConnects[signName].push({ func: func, once: onlyOnce });
            }
        } else {
            this.qtConnects[signName] = [{ func: func, once: onlyOnce }];
        }
        return true;
    }

    checkCallExist(callName: string): Promise<boolean> {
        if (this.qtObject instanceof Promise) {
            return this.qtObject.then((qtRef) => {
                this.qtObject = qtRef.qtObject;
                return callName in this.qtObject;
            });
        }
        return Promise.resolve(callName in this.qtObject);
    }

    connectWindowFunc(funcName: string, func: Function) {
        window[funcName] = func;
        // switch(funcName){
        //     case 'SigNotifyClientSelectRmsMprFileMap':                 //RMS获取mpr文件
        //         window['setResourcesFilePath'] = func;
        //         break;
        //     case 'SigNotifyClientSelectLocalMprFileMap':               //本地获取mpr文件
        //         window['setResourcesFilePath'] = func;
        //         break;
        //     case 'SigNotifyJSGetProductCoverLinkFinishedMap':         //商品封面图片链接
        //         window['fetch_rms_url'] = func;
        //         break;
        //     case 'SigNotifyJsGetCoverInfoDecryptFinishedMap':        //商品封面图片解密base64
        //         window['_top_qt_decrypt_callback'] = func;
        //         break;
        // }
    }

    // 调用Qt提供的函数
    callQtFunc(funcName: string, params: any) {
        if (this.qtObject.then) {
            return this.qtObject.then((qtRef) => {
                this.qtObject = qtRef.qtObject;
                this.callQtFunc(funcName, params);
            });
        }
        if (!(funcName in this.qtObject)) {
            console.error('qt object has not the function: ' + funcName);
            return false;
        }
        if (params && params instanceof Array) {
            Promise.resolve(null).then(() => {
                this.qtObject[funcName].apply(null, params);
            });
        } else if (params && typeof params !== 'string') {
            params = JSON.stringify(params);
            Promise.resolve(null).then(() => {
                this.qtObject[funcName](params);
            });

        } else if (params && typeof params === 'string') {
            Promise.resolve(null).then(() => {
                this.qtObject[funcName](params);
            });
        } else {
            Promise.resolve(null).then(() => {
                this.qtObject[funcName]();
            });
        }
        console.log('callFunc: ' + funcName);
        return true;
    }

    qtRequest(callName: string, signName: string, params: string | any, timeout = 10) {
        const responseModel = new QtResponseModel(callName, signName, params);
        const qtResponse = new QtResponse(responseModel);
        if (this.qtObject instanceof Promise) {
            return qtResponse.before(() => {
                this.qtObject.then((qtRef) => {
                    this.qtObject = qtRef.qtObject;
                    this.connectSignFunc(signName, this.recvSignFunc(responseModel.requstId, qtResponse), true, timeout === 0);
                    qtResponse.listenTimeOut(timeout);
                    this.callQtFunc(callName, params);
                });
            });
        }
        this.connectSignFunc(signName, this.recvSignFunc(responseModel.requstId, qtResponse), true, timeout === 0);
        qtResponse.listenTimeOut(timeout);
        return qtResponse.before(() => {
            this.callQtFunc(callName, params);
        });
    }

    generateCacheKey(preFix: string, params) {
        if (params instanceof Array) {
            return preFix + params.join();
        } else if (typeof params === 'string') {
            return preFix + params;
        } else if (typeof params === 'object') {
            return preFix + JSON.stringify(params);
        }
        return preFix + params;
    }

    qtRequestWithCache(callName: string, signName: string, params: string | any, timeout = 10) {
        const cacheKey = this.generateCacheKey(signName, params);
        if (this.state.get(cacheKey)) {
            const responseModel = new QtResponseModel(callName, signName, params);
            const qtResponse = new QtResponse(responseModel);
            return qtResponse.before(() => {
                Promise.resolve(null).then(() => {
                    qtResponse.handleSuccess(this.state.get(cacheKey), true);
                });
            });
        }
        return this.qtRequest(callName, signName, params, timeout).after((qtResponseModel) => {
            if (qtResponseModel.data) {
                this.state.set(cacheKey, qtResponseModel.data);
            }
        });
    }

    recvSignFunc(requstId, qtResponse: QtResponse) {
        //  this.qtRequest[requstId] = qtResponse;
        return (response) => {
            console.log('response: ' + requstId);
            //  if(requstId == response.requstId){
            //   setTimeout(()=>{
            //     qtResponse.handleSuccess(response);
            //   }, 0);
            this.zone.run(() => {
                qtResponse.handleSuccess(response);
            });
            // Promise.resolve(null).then(()=>{
            //     qtResponse.handleSuccess(response);
            // })
            // delete this.qtRequest[requstId];
            //   }else if(this.qtRequest[response.requstId]){
            //       this.qtRequest[response.requstId].handleError(response);
            //       delete this.qtRequest[response.requstId];
            //    }else{
            //         throw Error('requestId not found: ' + response.requestId);
            //     }
        };
    }

    private executeSign(signName: string) {
        return (...params) => {
            console.log('params---:', params);
            if (params.length === 1) {
                const param = params[0];
                if (param && typeof param === 'string' && param.startsWith('{')) {
                    try {
                        params = JSON.parse(param);
                    } catch (e) {
                        console.log(e);
                        params = <any>param;
                    }
                } else {
                    params = <any>param;
                }
            }
            try {
                if (signName in this.qtConnects) {
                    this.qtConnects[signName].forEach(signFunc => {
                        signFunc.func(params, this);
                    });
                    this.qtConnects[signName] = this.qtConnects[signName].filter(signFunc => {
                        return !signFunc.once;
                    });
                } else {
                    console.error('not connect sign: ' + signName);
                }
            } catch (e) {
                console.error(e);
            }

        };
    }
}
