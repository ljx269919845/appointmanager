import { Injectable } from '@angular/core';
import { HttpImageUpload, ImageFile } from './http-image-upload';
import { HttpResponse } from '../http';

export class ImageVaildOptions {
    constructor(
        public validError?: Function,
        public maxFileSize = 1024 * 1024 * 20,
        public minWidth = 0,
        public minHeight = 0,
        public allowedType = ['jpg', 'jpeg', 'bmp', 'png']
    ) { }
}

export class ImageResponse {
    constructor(
        public resultCode: string,
        public resultMsg: string,
        public imageId: string,
        public imageUrl: string,
        public thumbnailUrl: string,
        public hrefUrl?: string,
        public sort?: number
    ) { }
}

export enum IMAGE_ERROE { NO_ERRROR, WIDTH_ERROR, HRIGHT_ERROR, SIZE_ERROR, FIEL_TYPE_ERROR, CONTENT_ERROR }

export class ImageUploadData {
    private width = 0;
    private height = 0;
    private fileType = 'jpg';
    protected validResult = true;
    private fileSize = 0;

    protected options: ImageVaildOptions;
    protected vaildPromise;
    protected imageFile: File;

    constructor(private imageUploader: HttpImageUpload, private url: string, protected imageAlias = 'imageFile') { }

    setImageFile(imageFile: File) {
        this.imageFile = imageFile;
        this.fileType = imageFile.name.split('.').pop().toLowerCase();
        const image = new Image();
        const oFReader = new FileReader();
        let resolveFunc;
        this.vaildPromise = new Promise((resolve) => {
            resolveFunc = resolve;
        });
        oFReader.onload = (ofEvent: any) => {
            image.src = ofEvent.target.result;
        };
        image.onload = () => {
            this.width = image.width;
            this.height = image.height;
            this.valid();
            resolveFunc(true);
        };

        image.onerror = () => {
            if (this.options.validError) {
                this.options.validError(IMAGE_ERROE.CONTENT_ERROR);
            }
            this.validResult = false;
            resolveFunc(false);
        };
        oFReader.readAsDataURL(imageFile);
        return this;
    }

    formatImageFile(file_base64: string, width?: number, height?: number, fileSize?: number, imageName = 'picture') {
        try {
            this.fileSize = fileSize;
            const dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;
            const macthes = file_base64.match(dataURIPattern);
            if (!macthes) {
                this.valid();
                return false;
            }
            if (width) {
                this.width = width;
            }
            if (height) {
                this.height = height;
            }
            const imgStr = file_base64.substr(macthes[0].length);
            const byteString = atob(imgStr);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            let fileType = macthes[1].split('/').pop();
            this.fileType = fileType.toLowerCase();
            fileType = '.' + fileType;
            imageName = imageName.replace(fileType, '');
            this.imageFile = new File([ab], imageName + fileType, { type: macthes[1] });
            this.fileSize = this.imageFile.size;
            if (!width || !height) {
                this.setImageFile(this.imageFile);
            } else {
                this.valid();
            }
        } catch (e) {
            console.error(e);
        }
        return this;
    }

    valid() {
        this.vaildPromise = undefined;
        let error = IMAGE_ERROE.NO_ERRROR;
        if (this.options.maxFileSize < this.fileSize) {
            error = IMAGE_ERROE.SIZE_ERROR;
        } else if (this.options.minWidth > this.width) {
            error = IMAGE_ERROE.WIDTH_ERROR;
        } else if (this.options.minHeight > this.height) {
            error = IMAGE_ERROE.HRIGHT_ERROR;
        } else if (this.options.allowedType && this.options.allowedType.indexOf(this.fileType) === -1) {
            error = IMAGE_ERROE.FIEL_TYPE_ERROR;
        }
        if (this.options.validError) {
            this.options.validError(error);
        }

        if (error !== IMAGE_ERROE.NO_ERRROR) {
            this.validResult = false;
            return false;
        }
        this.validResult = true;
        return true;
    }

    post(formData, urlData): HttpResponse {
        const imageFile = new ImageFile(this.imageFile, this.imageAlias, this.imageFile && this.imageFile.name);
        return this.imageUploader.post(this.url, urlData, [imageFile], formData).before(() => {
            if (!this.validResult) {
                return true;
            }
        }).delay(this.vaildPromise);
    }

    put(formData, urlData) {
        const imageFile = new ImageFile(this.imageFile, this.imageAlias, this.imageFile && this.imageFile.name);
        return this.imageUploader.put(this.url, urlData, [imageFile], formData).before(() => {
            if (!this.validResult) {
                return true;
            }
        }).delay(this.vaildPromise);
    }

    setImageValidOptions(options: ImageVaildOptions) {
        this.options = Object.assign({}, this.options, options);
    }
}

const PIS_IMAGE_UPLOADER = '/api/publishprotal/common/image-upload/:shopId';

const IMAGE_UPLOAD_PATH = '/medical/upload/single';

@Injectable()
export class ImageService {
    constructor(private imageUploader: HttpImageUpload) {
    }

    getPassImageUploader(validFunc: Function, imageSize?, imageWidth?, imageHeight?) {
        const imgSize = imageSize ? imageSize : 2 * 1024 * 1024;
        const imgWidth = imageWidth ? imageWidth : 800;
        const imgHeight = imageHeight ? imageHeight : 1120;
        const imageUpload = new ImageUploadData(this.imageUploader, PIS_IMAGE_UPLOADER);
        imageUpload.setImageValidOptions(new ImageVaildOptions(validFunc, imgSize, imgWidth, imgHeight));
        return imageUpload;
    }

    getUeditorImageUploader(validFunc: Function, imageSize?, imageWidth?, imageHeight?) {
        const imgSize = imageSize ? imageSize : 2 * 1024 * 1024;
        const imgWidth = imageWidth ? imageWidth : 0;
        const imgHeight = imageHeight ? imageHeight : 0;
        const imageUpload = new ImageUploadData(this.imageUploader, PIS_IMAGE_UPLOADER);
        imageUpload.setImageValidOptions(new ImageVaildOptions(validFunc, imgSize, imgWidth, imgHeight));
        return imageUpload;
    }

    getShopLogoUploader(validFunc: Function, imageSize?, imageWidth?, imageHeight?) {
        const imgSize = imageSize ? imageSize : 100 * 1024;
        const imgWidth = imageWidth ? imageWidth : 200;
        const imgHeight = imageHeight ? imageHeight : 200;
        const imageUpload = new ImageUploadData(this.imageUploader, PIS_IMAGE_UPLOADER);
        imageUpload.setImageValidOptions(new ImageVaildOptions(validFunc, imgSize, imgWidth, imgHeight));
        return imageUpload;
    }

    getDoctorImageUploader(validFunc: Function, imageSize?, imageWidth?, imageHeight?) {
      const imgSize = imageSize ? imageSize : 100 * 1024;
      const imgWidth = imageWidth ? imageWidth : 50;
      const imgHeight = imageHeight ? imageHeight : 50;
      const imageUpload = new ImageUploadData(this.imageUploader, IMAGE_UPLOAD_PATH);
      imageUpload.setImageValidOptions(new ImageVaildOptions(validFunc, imgSize, imgWidth, imgHeight));
      return imageUpload;
  }
}
