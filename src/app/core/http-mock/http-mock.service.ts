import { Injectable } from '@angular/core';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

let mockData = [];

export function registerMock(url, data) {
  //console.log(data);
  let index = mockData.findIndex((value) => {
    return value.url == url;
  });
  if (index == -1) {
    mockData.push({ url: url, data: data });
  }
}

@Injectable()
export class HttpMockService {

  constructor() {
  }

  getMockData(requestUrl: string, connection) {
    let result, pathParams;
    for (let mock of mockData) {
      if (typeof mock.url == 'string' && ([result, pathParams] = this.inculde(mock.url, requestUrl), result)) {
        if (typeof mock.data == 'function') {
          return mock.data(pathParams, this.paramsConvert(connection), this.getBody(connection));
        }
        return mock.data;
      } else if (typeof mock.url == 'function' && mock.url(requestUrl)) {
        return mock.data;
      }
    }
    return null;
  }

  inculde(url: string, requestUrl: string) {
    let requestUrlArr = requestUrl.split('/');
    let urlArr = url.split('/');
    if (urlArr.length != requestUrlArr.length || !urlArr.length) {
      return [false, undefined];
    }

    let begin = requestUrlArr.indexOf(urlArr[0]);
    if (begin == -1) {
      return [false, undefined];
    }
    let params = {};
    let key;
    let value;
    for (let i = begin; i < urlArr.length; i++) {
      if (urlArr[i].startsWith(':') || urlArr[i].startsWith('{')) {
        key = urlArr[i].substr(1, urlArr[i].length)
        value = requestUrlArr[i + begin];
        params[key] = value;
        continue;
      } else if (urlArr[i] != requestUrlArr[i + begin]) {
        return [false, undefined];
      }
    }
    return [true, params];
  }

  //解析URL查询queryParams;
  paramsConvert(connection) {
    let url = connection.request.url;
    let paramsUrl = url.split('?')[1] || null;
    if (!paramsUrl) {
      return null;
    }
    let paramsArr = paramsUrl.split('&');
    let queryParams: { [key: string]: string } = {};
    for (let ele of paramsArr) {
      let eleArr = ele.split('=');
      queryParams[eleArr[0]] = eleArr[1];
    }
    return queryParams;
  }

  //解析body参数
  getBody(connection: MockConnection){
    let body = connection.request.getBody();
    if(typeof body == 'string'){
      try{
        body = JSON.parse(body);
      }catch(e){
      }
    }
    return body;
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: mockFactory,
  deps: [MockBackend, BaseRequestOptions, XHRBackend, HttpMockService]
};

export function mockFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend, httpMock: HttpMockService) {
  backend.connections.subscribe(
    (connection: MockConnection) => {
      setTimeout(() => {
        let responseBody = httpMock.getMockData(connection.request.url, connection);
        console.log("request url: " + connection.request.url + "\n",responseBody)
        if (responseBody === false) {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 500,
                body: 'server error'
              })
            )
          );
        } else if (!responseBody) {
          console.log("--------------no body data register----------------------");
          return makeRealConnection(connection, options, realBackend);
        } else {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 200,
                body: responseBody
              })
            )
          );
        }
      }, 10);
    }
  );
  return new Http(backend, options);
}

function makeRealConnection(connection, options, realBackend) {
  const realHttp = new Http(realBackend, options);
  const requestOptions = new RequestOptions({
    method: connection.request.method,
    headers: connection.request.headers,
    body: connection.request.getBody(),
    url: connection.request.url,
    withCredentials: connection.request.withCredentials,
    responseType: connection.request.responseType
  });
  realHttp.request(connection.request.url, requestOptions)
    .subscribe((response: Response) => {
      connection.mockRespond(response);
    },
    (error: any) => {
      connection.mockError(error);
    });

}
