import { Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appGetFocus]'
})
export class GetFocusDirective {

  @Input('appGetFocus') appGetFocus: string;

  constructor(private el: ElementRef) { }

  @HostListener('focus')
  onFocus(){
    this.el.nativeElement.classList.add(this.appGetFocus);
  }
  @HostListener('blur')
  onBlur(){
    this.el.nativeElement.classList.remove(this.appGetFocus);
  }

  @HostListener('click')
  onClick(){

  }
  ngDoCheck(){

  }
  @HostListener('dblclick')
  dblclick(){
    
  }
}
