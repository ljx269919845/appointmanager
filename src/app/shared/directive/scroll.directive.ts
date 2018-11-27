import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[isliScroll]'
})
export class ScrollDirective {
  private maxScrollHeight;
  private height;
  constructor(private elemRef: ElementRef) { }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.maxScrollHeight = this.elemRef.nativeElement.scrollHeight;
    this.height = this.elemRef.nativeElement.clientHeight;
  }

  @HostListener('mousewheel', ['$event'])
  handleMouseWheel(event) {
    if (event.deltaY > 0 && this.elemRef.nativeElement.scrollTop + this.height >= this.maxScrollHeight) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
