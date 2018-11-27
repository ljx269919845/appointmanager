import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export class ImageMagnifyBoxObj {

    public component:ImageMagnifyBoxComponent;

    constructor(public width:number = 400,
                public height:number = 400,
                public _visible:boolean = false,
                public imgUrl?:string) {
    }

    set visible(value) {
        if (value && this.component && !this.component.ifImageMagnifyBox) {
            this.component.ifImageMagnifyBox = true;
        }
        this._visible = value;
    }

    get visible() {
        return this._visible;
    }
}

@Component({
    selector: 'tl-image-magnify-box',
    templateUrl: './image-magnify-box.component.html',
    styleUrls: ['./image-magnify-box.component.css']
})
export class ImageMagnifyBoxComponent implements OnInit {

    @Input() imageMagnifyBoxObj:ImageMagnifyBoxObj;

    public ifImageMagnifyBox:boolean = false;

    constructor() {
    }

    ngOnInit() {
        this.imageMagnifyBoxObj.component = this;
    }

    imageMagnifyClose() {
        this.imageMagnifyBoxObj.visible = false;
    }

    get borderBoxStyle() {
        return {
            'width': this.imageMagnifyBoxObj.width + 'px',
            'height': this.imageMagnifyBoxObj.height + 'px',
            'margin-top': '-' + this.imageMagnifyBoxObj.height / 2 + 'px',
            'margin-left': '-' + this.imageMagnifyBoxObj.width / 2 + 'px',
        }
    }

    get imgStyle(){
        return {
            'max-width':this.imageMagnifyBoxObj.width + 'px',
            'max-height':this.imageMagnifyBoxObj.height + 'px',
        }
    }
}
