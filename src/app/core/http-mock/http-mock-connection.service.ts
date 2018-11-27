import {Injectable} from '@angular/core';
import { HttpBackend, HttpRequest, HttpEvent, HttpXhrBackend, HttpResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { HttpMockDataService } from './http-mock-data.service';

@Injectable()
export class HttpMockConnection implements HttpBackend{
    constructor(private xhrBackend: HttpXhrBackend, private mockDataServ: HttpMockDataService){

    }

    handle(req: HttpRequest<any>): Observable<HttpEvent<any>>{
        const data = this.mockDataServ.getMockData(req.url, req);
        if(data){
            return new Observable((observer: Observer<HttpEvent<any>>)=>{
                observer.next(new HttpResponse({
                    body: data,
                    status: 200,
                    url: req.url
                }));
            })
        }
        return this.xhrBackend.handle(req);
    }
}