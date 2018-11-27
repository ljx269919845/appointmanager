import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '../../../environments/environment';
import { HttpBackend } from '@angular/common/http';
import { HttpMockConnection } from './http-mock-connection.service';
import { HttpMockDataService } from './http-mock-data.service';

// import {HttpMockService,fakeBackendProvider} from './http-mock.service';
// import {MockBackend, MockConnection} from '@angular/common/http/testing';
// import {BaseRequestOptions} from '@angular/http';

// let providers:Array<any> = [HttpMockService];
// if(!environment.production){
//   providers = providers.concat([fakeBackendProvider, MockBackend, BaseRequestOptions]);
// }

@NgModule({
    imports: [ CommonModule ],
    declarations: [],
    providers: [
        HttpMockDataService,
        {
            provide: HttpBackend,
            useClass: HttpMockConnection
        }
    ]
})
export class HttpMockModule {}
