import { Response, ResponseOptions } from '@angular/http';

import { HttpJson } from './http-json';
import { RequestModel, ResponseModel, HTTP_HOOKS } from './http.type';
import { HttpHookService } from './http-hook.service';

// 此类是为了方便http调用, 从而对Promise增加了一层封装
export class HttpResponse {
    public response: ResponseModel;

    private beforFunc: Array<Function> = [];
    private afterFunc: Array<Function> = [];
    private successFunc: Array<Function> = [];
    private errorHander: Array<Function> = [];
    private failHander: Array<Function> = [];
    private translateHandler: Function;

    private delayPromise: Promise<any>;
    private executePromiseResolve;
    private executePromiseReject;
    private executePromise: Promise<RequestModel>;
    private noReq = false; // 不发送http请求标志

    constructor(
        private http: HttpJson,
        private request: RequestModel,
        private httpHook: HttpHookService,
        cacheRes?: ResponseModel
    ) {
        this.executePromise = new Promise((resolve, reject) => {
            this.executePromiseResolve = resolve;
            this.executePromiseReject = reject;
        });
        this.response = cacheRes;
        Promise.resolve(null).then(() => {
            if (this.noReq) {
                return;
            }
            if (this.request && !this.response) {
                this.requestHttp();
            } else {
                this.makeCacheResponse();
            }
        });
    }

    private requestHttp() {
        if (this.delayPromise) {
            this.delayPromise.then(() => {
                this.http.makeHttpRequest(this.request, this);
            });
        } else {
            this.http.makeHttpRequest(this.request, this);
        }
    }

    private makeCacheResponse() {
        this.handleHttpEnd();
        let result;
        for (let i = 0; i < this.successFunc.length; ++i) {
            result = this.successFunc[i](this.response, this.request, result);
            if (result === false) {
                break;
            }
        }
        this.executePromiseResolve(result);
        this.handleHttpEnd();
    }

    setNoReq() {
        this.noReq = true;
    }

    before(func: Function) {
        if (typeof func !== 'function') {
            return;
        }
        if (
            this.beforFunc.findIndex((value) => {
                return value === func;
            }) !== -1
        ) {
            return;
        }
        this.beforFunc.push(func);
        return this;
    }

    after(func: Function) {
        if (typeof func !== 'function') {
            return;
        }
        if (
            this.afterFunc.findIndex((value) => {
                return value === func;
            }) !== -1
        ) {
            return;
        }
        this.afterFunc.push(func);
        return this;
    }

    error(func: Function) {
        if (typeof func !== 'function') {
            return;
        }
        if (
            this.errorHander.findIndex((value) => {
                return value === func;
            }) !== -1
        ) {
            return;
        }
        this.errorHander.push(func);
        return this;
    }

    success(func: Function): HttpResponse {
        if (typeof func !== 'function') {
            return;
        }
        if (
            this.successFunc.findIndex((value) => {
                return value === func;
            }) !== -1
        ) {
            return;
        }
        this.successFunc.push(func);
        return this;
    }

    failed(func: Function) {
        if (typeof func !== 'function') {
            return;
        }
        if (
            this.failHander.findIndex((value) => {
                return value === func;
            }) !== -1
        ) {
            return;
        }
        this.failHander.push(func);
        return this;
    }

    translate(func: Function) {
        if (typeof func !== 'function') {
            return;
        }
        this.translateHandler = func;
        return this;
    }

    delay(delay: Promise<any>) {
        this.delayPromise = delay;
        return this;
    }

    handleHttpBegin() {
        for (let i = 0; i < this.beforFunc.length; ++i) {
            if (this.beforFunc[i](this.request)) {
                return true;
            }
        }
        return false;
    }

    handlesuccess(resp: ResponseModel) {
        this.response = resp;
        if (this.translateHandler) {
            this.response.data = this.translateHandler(resp.data);
        }
        let result;
        for (let i = 0; i < this.successFunc.length; ++i) {
            result = this.successFunc[i](this.response, this.request, result);
            if (result === false) {
                break;
            }
        }
        this.executePromiseResolve(result);
    }

    handleFailed(resp: ResponseModel) {
        this.response = resp;
        let result;
        if (this.failHander.length) {
            this.failHander.forEach((failFunc) => {
                result = failFunc(this.response, this.request, result);
                if (result === false) {
                    return true;
                }
            });
            this.executePromiseResolve(result);
        } else {
            this.handleError('http result code failed');
        }
    }

    handleError(error) {
        let result;
        if (this.errorHander.length) {
            this.errorHander.forEach((errorFunc) => {
                result = errorFunc(this.response, this.request, error, result);
            });
            this.executePromiseResolve(result);
        } else {
            console.error('you should set errorhandler');
            console.error(JSON.stringify(this.request));
            console.error(error);
        }
        return this;
    }

    handleHttpEnd() {
        this.afterFunc.forEach((afterFunc) => {
            afterFunc(this.response, this.request);
        });
    }

    toPromise() {
        return this.executePromise;
    }

    clone(newRes: HttpResponse): HttpResponse {
        this.beforFunc.forEach((func) => {
            newRes.before(func);
        });
        this.successFunc.forEach((func) => {
            newRes.success(func);
        });
        newRes.translate(this.translateHandler);
        this.failHander.forEach((func) => {
            newRes.failed(func);
        });
        this.errorHander.forEach((func) => {
            newRes.error(func);
        });
        this.afterFunc.forEach((func) => {
            newRes.after(func);
        });
        return newRes;
    }
}
