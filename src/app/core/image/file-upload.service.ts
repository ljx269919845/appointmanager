import { Injectable } from '@angular/core';
import { ImageFile } from './http-image-upload';
import { HttpResponse } from '../http';
import { HttpMultiService } from '../http/http-multi.service';

export class FileUpload {
    private imageFile: File;
    private validResult = true;
    private vaildPromise;

    constructor(
        public url: string,
        public imageAlias: string,
        public uploader: FileUploadService) { }

    setFile(imageFile: File) {
        this.imageFile = imageFile;
        return this;
    }

    setFileBase64(strBase64, fileName) {
        const dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;
        const macthes = strBase64.match(dataURIPattern);
        const imgStr = strBase64.substr(macthes[0].length);
        const byteString = atob(imgStr);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        this.imageFile = new File([ab], fileName || 'file.xlsx');
        return this;
    }

    post(formData, urlData): HttpResponse {
        const imageFile = new ImageFile(this.imageFile, this.imageAlias, this.imageFile.name);
        return this.uploader.imageUploader.post(this.url, urlData, {}, this.buildBody(formData, [imageFile])).before(() => {
            if (!this.validResult) {
                return true;
            }
        }).delay(this.vaildPromise);
    }

    put(formData, urlData) {
        const imageFile = new ImageFile(this.imageFile, this.imageAlias, this.imageFile.name);
        return this.uploader.imageUploader.put(this.url, urlData, {}, this.buildBody(formData, [imageFile])).before(() => {
            if (!this.validResult) {
                return true;
            }
        }).delay(this.vaildPromise);
    }

    private buildBody(formData, imageFiles) {
        const form = new FormData();
        formData = formData || {};
        for (const imageFile of imageFiles) {
            form.append(imageFile.alias, imageFile.file, imageFile.fileName);
        }
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                form.append(key, formData[key]);
            }
        }
        return form;
    }
}

const FILE_UPLOADER = '/pgcs/v1/excel';

@Injectable()
export class FileUploadService {
    constructor(public imageUploader: HttpMultiService) {
    }

    getUploader() {
        return new FileUpload(FILE_UPLOADER, 'excelFiles', this);
    }
}
