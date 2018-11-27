import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DepartMent } from '../../model/department.model';
import { GlobalValidService } from 'mpr-form-valid';

@Component({
  selector: 'app-deparment-info',
  templateUrl: './deparment-info.component.html',
  styleUrls: ['./deparment-info.component.scss']
})
export class DeparmentInfoComponent implements OnInit {
  @Output() OnUpdate = new EventEmitter();
  @Output() OnCreate = new EventEmitter();
  @Output() OnCancel = new EventEmitter();

  @Input() departMentModify: DepartMent;

  public errMsg = {
    departName: { required: '请输入科室名称'}
  };

  public departMent = new DepartMent();
  constructor(private globalValidServ: GlobalValidService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if ('departMentModify' in changes && this.departMentModify) {
      this.departMent = Object.assign({}, this.departMentModify);
    }
  }

  handleSubmit() {
    if (this.globalValidServ.validAll()) {
      if (this.departMentModify) {
        this.OnUpdate.emit(this.departMent);
      } else {
        this.OnCreate.emit(this.departMent);
      }
    }
  }

  handleCancel() {
    this.OnCancel.emit();
  }

}
