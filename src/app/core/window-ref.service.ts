/**
 * Created by zhangle on 2017/3/18.
 */
import { Injectable, NgZone } from '@angular/core';

import { AppState } from './app-state.service';

function getWindow (): any {

  if(!window['_rmsImgCallback']){
    window['_rmsImgCallback'] = function(response, params){
      window['rmsImgCallback'] && window['rmsImgCallback'](response,params);
    }
  }

  if (!window['bindQTRef']) {
    /**
     * 绑定QT客户端提供的接口到window对象
     * @param callback
     */
    window['bindQTRef'] = function (callback) {
      if (!window['QWebChannel'])   return;
      try {
        window['NGRef'].zone.run(function() {
          document.addEventListener("DOMContentLoaded", function () {
            new window['QWebChannel'](window['qt'].webChannelTransport, function (channel) {
              channel.objects.pbJsAccessObject.JSCustomLog("bound.");
              callback(channel.objects.pbJsAccessObject, channel.objects.QtInvokeHelper);
              channel.objects.pbJsAccessObject.SigNotifyWebRequestRMSCoverFinished.connect(window['_rmsImgCallback']);
              //重写console的函数将日志重定向到客户端便于调试
              function simpleStringify(object) {
                try {
                  if (typeof(object) === 'string' || typeof(object) === 'boolean' || typeof(object) === 'number')  return '' + object;
                  if (object === undefined) return 'undefined';
                  if (object === null) return 'null';
                  return JSON.stringify(object); // returns cleaned up JSON
                } catch (error) {}
              };
              // window.console.log = function () {
              //   channel.objects.pbJsAccessObject.JSCustomLog('[INFO]:' + (simpleStringify(arguments) || ''));
              // };
              // window.console.error = function () {
              //   channel.objects.pbJsAccessObject.JSCustomLog('[ERROR]:' + (simpleStringify(arguments) || ''));
              // }
            });
          });
        });
      } catch (error) {}
    }
  }

  if (!window['fetch_init_config']) {
    /**
     * QT客户端初始化时会主动调用的接口，用于将数据传给NG端
     */
    window['fetch_init_config'] = function (arg) {
      try {
        window['NGRef'].zone.run(function() {
          if (window['initCallback'])
            window['initCallback'](arg);
        });
      } catch (error) {}
    }
  }

  if (!window['_top_qt_decrypt_callback']) {
    /**
     * QT客户端上传图片函数所需的回调
     * @param file_base64
     * @param resourceUid
     * @param index
     * @param fileSize
     * @param imgWidthHeight
     */
    window['_top_qt_decrypt_callback'] = function (file_base64, resourceUid, index, fileSize, imgWidthHeight) {
      try {
        window['NGRef'].zone.run(function() {
          if(window['uploadImgCallback']){
            window['uploadImgCallback'](file_base64, resourceUid, index, fileSize, imgWidthHeight);
          }
        });
      } catch (error) {}
    }
  }

  if(!window['fetch_rms_url']){
      window['fetch_rms_url'] = function(url){
      window['paper_rms_url'] = url;
    };
  }
  return window;
}

export class QTRef {

  private userPromise;
  constructor(private window: any, private qtRef: any) {}

  public user(): Promise<any> {
    if(this.userPromise){
      return this.userPromise;
    }
    this.userPromise = new Promise<any>((resolve, reject) => {
      if (!this.qtRef) {
        reject('QTRef is null.');
        return;
      }
      try {
        console.log("connect SigInitPapaerBookWeb...");
        //‘fetch_init_config’接口需要的回调函数
        this.window['initCallback'] = function (param) {
          resolve(param);
        };
        this.qtRef.JSGetWebInitConfig(); //此方法会触发QT客户端调用‘fetch_init_config’接口
        //this.qtRef.SigInitPaperBookWeb.connect(param => resolve(param));
      } catch (error) {
        reject(error);
      }
    });
    return this.userPromise;
  }

  public uploadImg(callback) {
    try {
      console.log("connect JSSelectPicture...");
      this.window['uploadImgCallback'] = callback;
      this.qtRef.JSSelectPicture('*.png *.jpg *.jpeg', "logo || 0");
    } catch (error) {
    }
  }

  public exportExcel(path, fileName){
    if(!this.isQt){
      return;
    }
    this.qtRef.JSExportFile(path, fileName);
  }

  public bindImageRecv(callback){
    this.window['uploadImgCallback'] = callback;
  }

  public bindRMSPictureRecv(callback){
    this.window['rmsImgCallback'] = callback;
    // if(!this.window['rmsImgCallback']){
    //   this.window['rmsImgCallback'] = callback;
    //   this.qtRef.SigNotifyWebRequestRMSCoverFinished && 
    //     this.qtRef.SigNotifyWebRequestRMSCoverFinished.connect(callback);
    // }
  }

  public qtSelectPictureDialg(strUUID: string, strIndex: string){
    if(!this.isQt){
      return;
    }
    this.qtRef.JSSelectPicture('*.png *.jpg *.jpeg', strUUID+'||'+strIndex);
  }

  get isQt(): boolean{
    return !! window.hasOwnProperty('qt');
  }

  getRMSProudctCoverURL(){
    if(!this.isQt){
      return '';
    }
   // return 'https://172.16.3.251:8443/mpr/portal-rms-api/mvc/prodMeaterial/getProductCover';
    return window['paper_rms_url'];
    // return this.qtRef.JSGetProductCoverLink();  
  }

  JSSynConverInfo(filePath:string, secureKey:string, strUUID:string, strIndex:string){
    if(!this.isQt){
      return '';
    }
    return this.qtRef.JSSynConverInfo(filePath, secureKey, strUUID, strIndex);
  }

  getRMSPictures(mprCode,proTye){
    if(this.isQt){
      Promise.resolve(null).then(()=>{
        this.qtRef.JSSynRMSCoverRequest(mprCode, proTye);
      });
    }
  }
}

@Injectable()
export class WindowRefService {

  private _qtRef: Promise<QTRef>;

  constructor(
     private _ngZone: NgZone,
    // private appState: AppState
  ) {
     this.window['NGRef'] = { zone: _ngZone };
    this._qtRef = new Promise<QTRef>((resolve, reject) => {
      try {
        this.window['bindQTRef']((qtRef) => resolve(new QTRef(this.window, qtRef)));
      } catch (error) {
        reject(error);
      }
    });
    // this._qtRef.then(qtRef => qtRef.user().then(user => {
    //   let userInfo = JSON.parse(user);
    //   this.appState.set('user_info', userInfo);
    //   this.appState.set('shop_id', (userInfo&&userInfo.mprshopid||'') + '+' + (userInfo&&userInfo.islishopid||''));
    // }));
    // console.log("132132132132132131312");
  }

  get qtRef(): Promise<QTRef> {
    return this._qtRef;
  }

  get window() {
    return getWindow();
  }


}
