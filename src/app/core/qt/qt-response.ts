import { QtResponseModel } from './qt.type'

export class QtResponse {

    private beforFunc: Array<Function> = [];
    private afterFunc: Array<Function> = [];
    private errorHander: Function;
    private failHander: Function;
    private translateHandler: Function;
    private afterExecute: boolean = false;
    private successFunc: Function;
    private timer: any


    constructor(public qtResponseModel: QtResponseModel, ) {

    }

    before(func: Function) {
        if (typeof func != 'function') {
            return;
        }
        if (this.beforFunc.findIndex((value) => {
            return value == func;
        }) != -1) {
            return;
        }
        this.beforFunc.push(func);
        return this;
    }

    after(func: Function) {
        if (typeof func != 'function') {
            return;
        }
        if (this.afterFunc.findIndex((value) => {
            return value == func;
        }) != -1) {
            return;
        }
        this.afterFunc.push(func);
        return this;
    }

    error(func: Function) {
        if (typeof func != 'function') {
            return;
        }
        this.errorHander = func;
        return this;
    }

    handleSuccess(response: any, isCache = false) {
        try {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = undefined;
            }
            if (this.translateHandler && !isCache) {
                response = this.translateHandler(response);
            }
            this.qtResponseModel.data = response;
            if (!this.successFunc || typeof this.successFunc != 'function') {
                console.log(this.successFunc);
            }
            this.successFunc(this.qtResponseModel);
            this.afterExecute = true;
            for (let i = 0; i < this.afterFunc.length; ++i) {
                if (this.afterFunc[i](this.qtResponseModel)) {
                    return;
                }
            }
        } catch (e) {
            this.handlerError(e);
        }
    }

    handleError(response: any) {
        this.afterExecute = true;
        for (let i = 0; i < this.afterFunc.length; ++i) {
            if (this.afterFunc[i](this.qtResponseModel)) {
                return;
            }
        }
        this.handlerError(response);
    }

    success(func: Function) {
        if (typeof func != 'function') {
            return;
        }
        Promise.resolve(null).then(() => {
            for (let i = 0; i < this.beforFunc.length; ++i) {
                if (this.beforFunc[i](this.qtResponseModel)) {
                    return;
                }
            }
        })
        this.successFunc = func;
        return this;
    }

    failed(func: Function) {
        if (typeof func != 'function') {
            return;
        }
        this.failHander = func;
        return this;
    }

    handlerError(error) {
        console.error(error);
        console.log("error happend: " + error);
        if (this.errorHander) {
            this.errorHander(error, this.qtResponseModel);
        } else {
            console.log("you should set errorhandler");
            console.log(this.qtResponseModel);
        }
        if (this.afterExecute) {
            return;
        }
        for (let i = 0; i < this.afterFunc.length; ++i) {
            if (this.afterFunc[i](this.qtResponseModel)) {
                return;
            }
        }
    }

    translate(func: Function) {
        if (typeof func != 'function') {
            return;
        }
        this.translateHandler = func;
        return this;
    }

    listenTimeOut(timeout = 10) {
        if (timeout > 0) {
            console.log("listen time out ----------------------");
            this.timer = setTimeout(() => {
                this.handleError('qt-response time out');
            }, timeout * 1000);
        }
    }
}