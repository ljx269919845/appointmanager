import { Injectable } from '@angular/core';

import { HTTP_HOOKS, HttpHookFunc, HttpHooks, RequestModel, ResponseModel } from './http.type'

@Injectable()
export class HttpHookService {

  private hooks: HttpHooks = {};

  constructor() { }

  registerHttpHook(hookType: HTTP_HOOKS, hookFunc: HttpHookFunc) {
    const strHookType = hookType.toString();
    if (strHookType in this.hooks) {
      if (this.hooks[strHookType].indexOf(hookFunc) !== -1) {
        console.log('hooks has already registered with func: ' + hookFunc.toString());
        return;
      }
      this.hooks[strHookType].push(hookFunc);
    } else {
      this.hooks[strHookType] = [hookFunc];
    }
  }

  unregisterHttpHook(hookType: HttpHooks, hookFunc: HttpHookFunc) {
    const strHookType = hookType.toString();
    if (!(strHookType in this.hooks)) {
      console.log('hooks never been registerd: ' + strHookType);
      return;
    }
    if (!hookFunc) {
      this.hooks[strHookType] = [];
    } else {
      const index = this.hooks[strHookType].indexOf(hookFunc);
      index === -1 ? console.log('hook func never registered: ' + hookFunc.toString) :
        this.hooks[strHookType].splice(index, 1);
    }
  }

  runHttpHook(hookType: HTTP_HOOKS, request?: RequestModel, response?: ResponseModel) {
    const strHookType = hookType.toString();
    if (!(strHookType in this.hooks)) {
      // throw Error("hooks should be register first");
      return;
    }
    for (const func of this.hooks[strHookType]) {
      func(request, response);
    }
  }
}
