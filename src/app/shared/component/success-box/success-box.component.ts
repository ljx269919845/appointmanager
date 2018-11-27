import { Component, OnInit, Input } from '@angular/core';


export class SuccessBoxObj {
    constructor(
        public title:string,
        public visible:boolean=false
    ) {}
}


@Component({
    selector: 'tl-success-box',
    templateUrl: './success-box.component.html',
    styleUrls: ['./success-box.component.css']
})
export class SuccessBoxComponent implements OnInit {

    @Input() successBoxObj;

    constructor() {
    }

    ngOnInit() {
    }

}
