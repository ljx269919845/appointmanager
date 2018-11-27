import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[td-focus]'
})
export class FocusDirective {

  constructor(private elemRef: ElementRef) { }

  @HostListener('keyup', ['$event'])
  keyUp(event){
    if(event.keyCode === 8 || event.ctrlKey){
      return;
    }
    if(!this.elemRef.nativeElement.maxLength || this.elemRef.nativeElement.value.length < parseInt(this.elemRef.nativeElement.maxLength)){
      return;
    }
    let curIndex = this.elemRef.nativeElement.tabIndex;
    let tabables = document.querySelectorAll('input, textarea, button');
    let length = tabables.length;
    for(var i=0; i<length; ++i){
      if((<any>tabables[i]).tabIndex == curIndex + 1 && ((<any>tabables[i]).readOnly || (<any>tabables[i]).disabled)){
        curIndex++;
        continue;
      }
      if((<any>tabables[i]).tabIndex == curIndex + 1 ){
        (<any>tabables[i]).focus();
      }
    }
  }

}
