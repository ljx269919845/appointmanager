/**
 * Created by zhangle on 2017/3/25.
 */
import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tl-template]',
  host: { }
})
export class TemplateRefDirective {

  @Input('tl-template') public name: string;

  constructor(public template: TemplateRef<any>) {}

}
