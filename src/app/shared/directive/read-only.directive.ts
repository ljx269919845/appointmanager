import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[readOnly]'
})
export class ReadOnlyDirective {

    @Input() set readOnly(readonly) {
        if (readonly) {
            if (this.el.nativeElement.tagName === 'SELECT') {
                this.el.nativeElement.disabled = true;
            } else if (this.el.nativeElement.tagName === 'INPUT') {
                this.el.nativeElement.readOnly = true;
            }
            this.el.nativeElement.style.color = '#BDBDBD';
            this.el.nativeElement.style.border = '1px solid #EDEDED';
        } else {
            if (this.el.nativeElement.tagName === 'SELECT') {
                this.el.nativeElement.disabled = false;
            } else if (this.el.nativeElement.tagName === 'INPUT') {
                this.el.nativeElement.readOnly = false;
            }
            this.el.nativeElement.style.color = '#656565';
            this.el.nativeElement.style.border = '1px solid #a5a5a5';
        }
    }

    constructor(private el: ElementRef) {
    }


}
