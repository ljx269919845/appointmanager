import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { HttpResponse, RequestModel, ResponseModel } from '../http';
import { HttpMultiService } from '../http/http-multi.service';

export class ImageFile {
    constructor(public file: File, public alias: string, public fileName?: string) { }
}

@Injectable()
export class HttpImageUpload {

    constructor(private http: HttpMultiService) {
    }

    post(url: string, pathParam: any, imageFiles: Array<ImageFile>, formData?: any): HttpResponse {
        const form = new FormData();
        pathParam = pathParam || {};
        formData = formData || {};
        for (const imageFile of imageFiles) {
            form.append(imageFile.alias, imageFile.file, imageFile.fileName);
        }
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                form.append(key, formData[key]);
            }
        }
        return this.http.post(url, pathParam, {}, form);
    }

    put(url: string, pathParam: any, imageFiles: Array<ImageFile>, formData?: any): HttpResponse {
        const form = new FormData();
        pathParam = pathParam || {};
        formData = formData || {};
        for (const imageFile of imageFiles) {
            form.append(imageFile.alias, imageFile.file, imageFile.fileName);
        }
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                form.append(key, formData[key]);
            }
        }
        return this.http.put(url, pathParam, {}, form);
    }
}
