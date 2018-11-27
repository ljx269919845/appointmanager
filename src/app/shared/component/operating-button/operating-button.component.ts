import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tl-operating-button',
  templateUrl: './operating-button.component.html',
  styleUrls: ['./operating-button.component.css']
})
export class OperatingButtonComponent implements OnInit {

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  @Input() className: string;
  @Input() disabled: boolean = false;
  @Input() title: string;

  constructor() { }

  ngOnInit() { }

  opraClick() {
    if (this.disabled) {
      return;
    }
    this.onClick.emit();
  }

}
