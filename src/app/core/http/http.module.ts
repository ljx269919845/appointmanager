import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpJson } from './http-json';
import { HttpHookService } from './http-hook.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IHttpHeaderService, HttpHeaderService } from './http-header.service';
import { IHttpResponseConvert, HttpResponseCovert } from './http-respone-convert.service';
import { HttpMultiService } from './http-multi.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    HttpHookService,
    {
      provide: IHttpResponseConvert,
      useClass: HttpResponseCovert
    },
    HttpJson,
    HttpMultiService
  ]
})
export class HttpModule { }
