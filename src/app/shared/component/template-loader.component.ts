/**
 * Created by zhangle on 2017/3/25.
 */
import { Component, ViewContainerRef, Input, Output, TemplateRef, OnInit, OnDestroy, EmbeddedViewRef } from '@angular/core';

@Component({
  selector: 'tl-templateLoader',
  template: ``
})
export class TemplateLoaderComponent implements OnInit, OnDestroy {

  @Input() template: TemplateRef<any>;

  @Input() data: any;
  @Input() index: any;

  view: EmbeddedViewRef<any>;

  constructor(public viewContainer: ViewContainerRef) { }

  ngOnInit() {
    if (this.template) {
      this.view = this.viewContainer.createEmbeddedView(this.template, {
        '\$implicit': this.data, index: this.index
      });
    }
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}
