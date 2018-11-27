import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

let mockData = [];

export function registerMock(method: string, url: string, data) {
  const index = mockData.findIndex((value) => {
    return value.url === url && value.method === method.toLocaleLowerCase();
  });
  if (index === -1) {
    mockData.push({ method: method.toLocaleLowerCase(), url: url, data: data });
  }
}

@Injectable()
export class HttpMockDataService {

  constructor() { }

  getMockData(requestUrl: string, requst: HttpRequest<any>) {
    for (const mock of mockData) {
      if (mock.method !== requst.method.toLocaleLowerCase()) {
        continue;
      }
      if (typeof mock.url === 'string' && this.inculde(mock.url, requestUrl)) {
        if (typeof mock.data === 'function') {
          return mock.data(requst);
        }
        return mock.data;
      } else if (typeof mock.url === 'function' && mock.url(requestUrl)) {
        return mock.data;
      }
    }
    return null;
  }

  inculde(url: string, requestUrl: string) {
    const requestUrlArr = requestUrl.split('/');
    const urlArr = url.split('/');
    if (urlArr.length > requestUrlArr.length || !urlArr.length) {
      return false;
    }

    const begin = requestUrlArr.indexOf(urlArr[0]);
    if (begin === -1) {
      return false;
    }

    for (let i = begin; i < urlArr.length; i++) {
      if (urlArr[i].startsWith(':')) {
        continue;
      } else if (urlArr[i] !== requestUrlArr[i + begin]) {
        return false;
      }
    }
    return true;
  }
}
