import { Injectable, NgZone } from '@angular/core';

import { QtRef } from './qt-ref'
import { AppState } from '../app-state.service';

@Injectable()
export class WindowRefService {

  private _qtRef: QtRef;
  private qtPromise: Promise<QtRef>;
  constructor(private zone: NgZone, public state: AppState) {
    this.initQtRef();
    // this._qtRef = new QtRef(window['parent']['QtInvokeHelper'], this.zone);
  }

  initQtRef() {
    if (!window['QWebChannel'] || !window["qt"]) {
      console.error('no qt webchannel');
      return;
    }
    this.qtPromise = new Promise<QtRef>((resolve) => {
      new window['QWebChannel'](window['qt'].webChannelTransport, (channel) => {
        console.log(channel.objects);
        //纸质书pbJsAccessObject  数字媒体QtInvokeHelper  书商注册TBookSellerWebPageInteractObj
        this._qtRef = new QtRef(channel.objects.jsAccessObject, this.zone, this.state);
        resolve(this._qtRef);
      });
    });
  }

  get qtRef() {
    if (!this.isQt) {
      return Promise.resolve(new QtRef({}, this.zone, this.state));
    }
    return Promise.all([this.qtPromise]).then(() => {
      return this._qtRef;
    });
  }

  get isQt() {
    return !!this.qtPromise;
  }

  get qt() {
    if (!this.isQt) {
      return new QtRef({}, this.zone, this.state);
    } else if (this._qtRef) {
      return this._qtRef;
    }
    return new QtRef(this.qtPromise, this.zone, this.state);
  }
}
