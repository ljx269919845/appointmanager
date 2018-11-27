import { Directive, Input, EventEmitter, ElementRef, Renderer, Inject } from '@angular/core';

@Directive({
    selector: '[autofocus]'
})
export class AutofocusDirective {
    @Input('autofocus') error: boolean;

    private bFlag?: boolean = false;

    constructor( @Inject(ElementRef) private element: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {

    }

    ngDoCheck() {
        if (this.error) {
            if (!this.bFlag) {
                this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
                this.bFlag = true;
            }
        } else {
            this.bFlag = false;
        }
    }

}