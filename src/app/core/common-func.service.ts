import { Injectable } from '@angular/core';

const UUID = {};

@Injectable()
export class CommonFuncService {
    constructor() {}

    public static mergeString(a: string, b: string) {
        if (a <= b) {
            return a + ',' + b;
        }
        return b + ',' + a;
    }

    public static clone(object: any) {
        if (object == null) {
            return object;
        } else if (object instanceof Array) {
            return CommonFuncService.cloneArray(object);
        } else if (object instanceof Date) {
            return new Date(object.getTime());
        } else if (typeof object === 'object') {
            return CommonFuncService.cloneObject(object);
        } else {
            return object;
        }
    }

    private static cloneObject(object) {
        const result = new Object();
        for (const name in object) {
            result[name] = CommonFuncService.clone(object[name]);
        }
        return result;
    }

    private static cloneArray(object) {
        const result = [];
        for (const ob of object) {
            result.push(CommonFuncService.clone(ob));
        }
        return result;
    }

    public static makeUUID() {
        let id = '' + parseInt('' + Math.random() * 100000, 10);
        while (UUID[id]) {
            id = '' + parseInt('' + Math.random() * 100000, 10);
        }
        UUID[id] = 1;
        return id;
    }

    public static objectEq(object1, object2) {
        if (object1 && !object2) {
            return false;
        }
        if (!object1 && object2) {
            return false;
        }
        if (object1 instanceof Array) {
            if (!(object2 instanceof Array)) {
                return false;
            }
            if (object1.length !== object2.length) {
                return false;
            }
            const len = object1.length;
            for (let i = 0; i < len; ++i) {
                if (!CommonFuncService.objectEq(object1[i], object2[i])) {
                    return false;
                }
            }
            return true;
        } else if (object1 && typeof object1 === 'object') {
            if (typeof object2 !== 'object') {
                return false;
            }
            if (Object.getOwnPropertyNames(object1).length !== Object.getOwnPropertyNames(object2).length) {
                return false;
            }
            for (const name in object1) {
                if (!CommonFuncService.objectEq(object1[name], object2[name])) {
                    return false;
                }
            }
            return true;
        }
        return object1 === object2;
    }

    public static emptyObject(object) {
        if (typeof object !== 'object' || !object) {
            return '';
        }
        const newObj = {};
        for (const name of object) {
            if (typeof object[name] === 'object') {
                newObj[name] = CommonFuncService.emptyObject(object[name]);
            }
            newObj[name] = '';
        }
        return newObj;
    }

    public static mergeObject(object1, object2) {
        const ret = Object.assign({}, object1);
        for (const name in object2) {
            if (object2[name] !== null && object2[name] !== undefined && object2[name] !== '') {
                if (typeof object2[name] === 'object' && !(object2[name] instanceof Array)) {
                    ret[name] = CommonFuncService.mergeObject(ret[name], object2[name]);
                } else if (object2[name] instanceof Array) {
                    ret[name] = CommonFuncService.clone(object2[name]);
                } else {
                    ret[name] = object2[name];
                }
            }
        }
        return ret;
    }
}
