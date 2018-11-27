import { Component, OnInit, Input, TemplateRef, Directive, ContentChildren, QueryList,ViewChild } from '@angular/core';



@Component({
  selector: 'isli-tooltips',
  templateUrl: './tooltips.component.html',
  styleUrls: ['./tooltips.component.scss']
})
export class TooltipsComponent implements OnInit {


  /**
   * 文本内容
   */

  @Input()
  public template:any;
  @Input()
  private contentText: string = "tooltips text";

  /**
   * 持续显示时间
   */
  @Input()
  private duration: Number = 9999999;

  constructor() { }

  ngOnInit() {
  }
  
  ngAfterContentInit() {
  }


}


