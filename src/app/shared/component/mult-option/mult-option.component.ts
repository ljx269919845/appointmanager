import { MultOptionsService } from './../mult-options/mult-options.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'isli-mult-option',
  templateUrl: './mult-option.component.html',
  styleUrls: ['./mult-option.component.css']
})
export class MultOptionComponent implements OnInit {

  @Output() onSelectedChange = new EventEmitter(true);
  @Input() keyId: string;
  @Input() keyName: string;
  @Input() optionsClass = 'classify';
  @Input() parentId: string;
  @Input() width = 115;
  @Input() level = 0;
  @Input() readonly = false;

  constructor(private multOptionsServ: MultOptionsService) { }

  ngOnInit() {
  }

  get itemValues(){
    return this.multOptionsServ.getNextLevel(this.parentId);
  }

  get selected(){
    return this.multOptionsServ.getSelected(this.level, this.parentId);
  }

  set selected(value){
    this.onSelectedChange.emit({value: value, level: this.level});
    this.multOptionsServ.setSelected(this.level, value, this.parentId);
  }

  handleSelectedChange(event){
    this.onSelectedChange.emit(event);
  }

}
