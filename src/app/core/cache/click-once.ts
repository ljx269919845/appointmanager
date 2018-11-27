import { HttpResponse } from '../http';

/*限制一定时间内点击次数*/
const clickTime: any = {};
export function clickOnce(key, time = 1000): any {
    return (target: Object, propertyKey: String, descriptor?: TypedPropertyDescriptor<any>) => {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        const orgFunc = descriptor.value;
        function click(...args) {
            let dataKey = key;
            const self = this;
            if (typeof key === 'function') {
                dataKey = key.apply(self, args);
            }
            const lastTime = clickTime[dataKey];
            if (!lastTime || Date.now() - lastTime > time) {
                clickTime[dataKey] = Date.now();
                return orgFunc.apply(self, args);
            }
            return false;
        }
        descriptor.value = click;
        return descriptor;
    };
}

/**要求被装饰的函数返回HttpResonse */
const clickHttpTime: any = {};
export function clickWiatHttp(key): any {
    return (target: Object, propertyKey: String, descriptor?: TypedPropertyDescriptor<any>) => {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        const orgFunc = descriptor.value;
        function click(...args) {
            let dataKey = key;
            const self = this;
            if (typeof key === 'function') {
                dataKey = key.apply(self, args);
            }
            if (!clickHttpTime[dataKey]) {
                clickHttpTime[dataKey] = true;
                const httpRes = orgFunc.apply(self, args);
                if (!(httpRes instanceof HttpResponse)) {
                    throw new Error('the function should return httpResponse' + orgFunc);
                }
                httpRes.after(() => {
                    clickHttpTime[dataKey] = false;
                });
                return httpRes;
            }
            return false;
        }
        descriptor.value = click;
        return descriptor;
    };
}
