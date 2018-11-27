import { ResponseModel, HttpResponse } from '../http';
import { CommonFuncService } from '../common-func.service';

class HttpCacheService {
    private cacheServ: any = {};
    constructor() {
        //   this.cacheServ = (window['native_route'] && window['native_route']['setItem']) || localStorage;
    }

    public set(key, value) {
        this.cacheServ[key] = value;
    }

    public get(key) {
        return this.cacheServ[key];
    }
}

const cache = new HttpCacheService();

/***
 * 此接口会优先从缓存中调取，但每次依然要从服务器获取数据，拉取数据后发现有不同的， 会通知再次通知到sccess
 * 即： 一次http请求可能会触发两次http调用，第一次是缓存数据， 第二次是服务器数据
 */
export function httpCache(key, time = 1): any {
    return function(target: Object, propertyKey: String, descriptor?: TypedPropertyDescriptor<any>) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        const orgFunc = descriptor.value;
        function httpRequst(...args) {
            let dataKey = key;
            const self = this;
            if (typeof key === 'function') {
                dataKey = key.apply(self, args);
            }
            const data: ResponseModel = cache.get(dataKey);

            if (data) {
                data.isCached = true;
                const res = new HttpResponse(null, null, null, data);
                if (Date.now() - data.endTime > time * 1000) {
                    Promise.resolve(null).then(() => {
                        let newRes: HttpResponse = orgFunc.apply(self, args);
                        newRes.success((res) => {
                            if (CommonFuncService.objectEq(res.data, data.data)) {
                                return false;
                            }
                        });
                        newRes = res.clone(newRes);
                        newRes.after((res: ResponseModel) => {
                            if (res && res.success) {
                                cache.set(dataKey, res);
                            }
                        });
                    });
                } else {
                    const newReq: HttpResponse = orgFunc.apply(self, args);
                    newReq.setNoReq();
                    return res.clone(newReq);
                }
                return res;
            } else {
                return orgFunc.apply(self, args).after((res: ResponseModel) => {
                    if (res && res.success) {
                        cache.set(dataKey, res);
                    }
                });
            }
        }
        descriptor.value = httpRequst;
        return descriptor;
    };
}

export function httpCacheForEver(key): any {
    return function(target: Object, propertyKey: String, descriptor?: TypedPropertyDescriptor<any>) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        const orgFunc = descriptor.value;
        function httpRequst(...args) {
            let dataKey = key;
            const self = this;
            if (typeof key === 'function') {
                dataKey = key.apply(self, args);
            }
            const data: ResponseModel = cache.get(dataKey);

            if (data) {
                data.isCached = true;
                const res = new HttpResponse(null, null, null, data);
                return res;
            } else {
                return orgFunc.apply(self, args).after((res: ResponseModel) => {
                    if (res && res.success) {
                        cache.set(dataKey, res);
                    }
                });
            }
        }
        descriptor.value = httpRequst;
        return descriptor;
    };
}

/***
 * 多个形同的http请求发送时合并为一次请求
 */
const httpReqCache: any = {};
const httpWaitCache: any = {};
export function httpMerge(key) {
    return function(target: Object, propertyKey: String, descriptor?: TypedPropertyDescriptor<any>) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        const orgFunc = descriptor.value;
        function httpRequst(...args) {
            let dataKey = key;
            const self = this;
            if (typeof key === 'function') {
                dataKey = key.apply(self, args);
            }
            if (!httpReqCache[key]) {
                const httpRes: HttpResponse = orgFunc.apply(self, args);
                httpReqCache[key] = httpRequst;
                httpRes.after((res) => {
                    if (httpWaitCache[key]) {
                        for (const cacheRes of httpWaitCache[key]) {
                            const httpCacheRes = new HttpResponse(null, null, null, res);
                            httpCacheRes.clone(cacheRes);
                        }
                        httpWaitCache[key] = [];
                    }
                    httpReqCache[key] = undefined;
                });
                return httpRes;
            } else {
                const httpWaitRes: HttpResponse = orgFunc.apply(self, args);
                httpWaitRes.setNoReq();
                if (!httpWaitCache[key]) {
                    httpWaitCache[key] = [ httpWaitRes ];
                } else {
                    httpWaitCache[key].push(httpWaitRes);
                }
                return httpWaitRes;
            }
        }
        descriptor.value = httpRequst;
        return descriptor;
    };
}
