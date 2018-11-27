import { Injectable } from '@angular/core';

import { HttpResponse } from '@angular/common/http';
import { ResponseModel } from './http.type';

export abstract class IHttpResponseConvert {
    public abstract convertHttpResponse(response: any): ResponseModel;
    public abstract checkHttpResponseSuccess(response: ResponseModel): boolean;
}

@Injectable()
export class HttpResponseCovert extends IHttpResponseConvert {

    convertHttpResponse(response): ResponseModel {
        return new ResponseModel(response.resultCode, response.msg, response.data === undefined ? {} : response.data);
    }

    checkHttpResponseSuccess(response: ResponseModel){
        return response.code === '00000000';
    }
}
