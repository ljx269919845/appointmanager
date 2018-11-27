import {Directive, ElementRef, HostListener, Input, Renderer, OnChanges} from '@angular/core';
@Directive({
  selector: '[tlEditFocus]'
})
export class EditFocusDirective {

  @Input() tlEditFocus: boolean;

  constructor(private el:ElementRef, private renderer:Renderer) {   
  } 
 
  ngDoCheck(){ 
    if(this.tlEditFocus){ 
     setTimeout(()=>{
      this.renderer.invokeElementMethod(this.el.nativeElement, 'focus');
     }, 10);
     this.tlEditFocus = false;
    }  
  } 
}
 