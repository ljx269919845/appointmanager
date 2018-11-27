import { Injectable } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Injectable()
export class GlobalValidService {

  private validForms: Array<AbstractControl> = [];

  constructor() { }

  public registerValidForm(form: AbstractControl) {
    if (this.validForms.indexOf(form) !== -1) {
      return;
    }
    this.validForms.push(form);
  }

  public validAll() {
    this.validForms.forEach(elemForm => {
      elemForm.markAsDirty({onlySelf: true});
      if (elemForm instanceof FormGroup) {
        this.validFormGroup(elemForm);
      }
      elemForm.patchValue(elemForm.value, { emitModelToViewChange: false, emitViewToModelChange: false });
    });
  }

  private validFormGroup(formGroup: FormGroup) {
    formGroup.markAsDirty({onlySelf: true});
    const formControls = formGroup.controls;
    for (const name in formControls) {
      if (formControls[name] instanceof FormGroup) {
        this.validFormGroup(<FormGroup>formControls[name]);
      } else {
        formControls[name].markAsDirty({onlySelf: true});
      }
    }
  }

}
