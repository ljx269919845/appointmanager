import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

export abstract class IHttpHeaderService {
    public abstract getHeader(): Object | Promise<Object>;
    public abstract setHeader(headers: HttpHeaders): void;
}


@Injectable()
export class HttpHeaderService implements IHttpHeaderService {
    public getHeader() {
        return {};
    }

    public setHeader(headers: any) {

    }
}
