import { Component, OnInit, ContentChild, TemplateRef, Input, Inject, AfterContentInit, ElementRef } from '@angular/core';
import {
  ControlContainer, AbstractControl, AbstractControlDirective,
  FormControl, FormGroup, FormGroupName, FormGroupDirective
} from '@angular/forms';

import { FormValidMsgService } from '../form-valid-msg.service';
import { GlobalValidService } from '../global-valid.service';

@Component({
  selector: 'isli-form-control-valid',
  templateUrl: './form-control-valid.component.html',
  styleUrls: ['./form-control-valid.component.css']
})
export class FormControlValidComponent implements OnInit, AfterContentInit {

  @Input() controlName;

  @ContentChild(TemplateRef) template;

  public errorMsg: string;

  private formControl: AbstractControl | AbstractControlDirective;

  constructor(private container: ControlContainer,
    private errMsgServ: FormValidMsgService,
    private globalValidServ: GlobalValidService,
    private elemRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // Called after ngOnInit when the component's or directive's content has been initialized.
    // Add 'implements AfterContentInit' to the class.
    let path = '';
    if (this.controlName && this.container.name === this.controlName) { // fromGroupName
      this.formControl = this.container.control;
      path = this.container.path.join('.');
      this.globalValidServ.registerValidForm(this.formControl['root'] || this.formControl);
    } else if (this.controlName && this.container.control.get(this.controlName)) {// fromControlName
      this.formControl = this.container.control.get(this.controlName);
      path = this.getPath(this.formControl, this.formControl['root'], this.controlName);
      this.globalValidServ.registerValidForm(this.formControl['root']);
    } else if (this.controlName) { // fromGroup
      this.formControl = this.container.control;
      path = this.container.path.join('.');
      this.globalValidServ.registerValidForm(this.formControl['root'] || this.formControl);
    } else if (this.container instanceof FormGroupName) {
      if (this.parentGroupELem.querySelectorAll('isli-form-control-valid').length <= 1) { // 一个group 配置一个 msg-valid
        this.formControl = this.container.control;
        this.controlName = this.parentGroupELem.getAttribute('formGroupName');
        path = this.container.path.join('.');
        this.globalValidServ.registerValidForm(this.formControl['root'] || this.formControl);
      } else { // 每个formControl 配置一个 valid-msg
        const preSbiling: Element = this.elemRef.nativeElement.previousElementSibling;
        const formControlName = this.getFormControlName(preSbiling);
        if (!formControlName) {
          throw Error('no formControlName find in previousElementSibling');
        }
        this.controlName = formControlName;
        this.formControl = this.container.control.get(this.controlName);
        path = this.getPath(this.formControl, this.formControl['root'], this.controlName);
        this.globalValidServ.registerValidForm(this.formControl['root']);
      }

    } else if (this.container instanceof FormGroupDirective) {
      const preSbiling: Element = this.elemRef.nativeElement.previousElementSibling;
      const formControlName = this.getFormControlName(preSbiling);
      if (!formControlName) {
        throw Error('no formControlName find in previousElementSibling');
      }
      this.controlName = formControlName;
      this.formControl = this.container.control.get(this.controlName);
      path = this.getPath(this.formControl, this.formControl['root'], this.controlName);
      this.globalValidServ.registerValidForm(this.formControl['root']);
    }

    if (this.formControl instanceof FormControl) {
      this.formControl.valueChanges.subscribe((controlStatus) => {
        if (this.formControl.errors) {
          this.errorMsg = this.errMsgServ.getValidMsg(path, this.formControl.errors);
        } else {
          this.errorMsg = '';
        }
      });
    } else {
      // formGroup
      this.formControl.valueChanges.subscribe(() => {
        // if (this.formControl.pristine) {
        //   return;
        // }
        for (const controlName in this.formControl['controls']) {
          if (!this.formControl['controls'][controlName].errors) {
            continue;
          }
          const msg = this.errMsgServ.getValidMsg(path ? path + '.' + controlName : controlName,
            this.formControl['controls'][controlName].errors);
          if (!msg) {
            continue;
          } else {
            this.errorMsg = msg;
            return;
          }
        }
        this.errorMsg = this.errMsgServ.getValidMsg(path || this.controlName, this.formControl.errors);
      });
    }
  }

  get parentGroupELem() {
    let parentElement: Element = this.elemRef.nativeElement.parentElement;
    while (!parentElement.getAttribute('formGroupName')) {
      parentElement = parentElement.parentElement;
    }
    return parentElement;
  }

  getPath(formControl, root, controlName) {
    if (!(root instanceof FormGroup)) {
      if (formControl === root) {
        return controlName;
      }
      return '';
    }
    const path = [];
    for (const ctrlName in root['controls']) {
      if (root['controls'][ctrlName] instanceof FormGroup) {
        const tmpPath = this.getPath(formControl, root['controls'][ctrlName], controlName);
        if (tmpPath) {
          path.push(ctrlName);
          path.push(tmpPath);
          return path.join('.');
        }
      } else if (root['controls'][ctrlName] === formControl) {
        return ctrlName;
      }
    }
    return path.join('.');
  }

  private getFormControlName(elem: Element) {
    if (!elem) {
      return null;
    }
    const formControlName = elem.getAttribute('formControlName');
    if (formControlName) {
      return formControlName;
    }
    let childControlName = null;
    for (let i = 0; i < elem.childElementCount; ++i) {
      childControlName = this.getFormControlName(elem.children[i]);
    }
  }
}
