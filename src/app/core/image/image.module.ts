import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageService } from './image.service';
import { HttpImageUpload } from './http-image-upload';
import { FileUploadService } from './file-upload.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        HttpImageUpload,
        ImageService,
        FileUploadService
    ]
})
export class ImageModule { }
