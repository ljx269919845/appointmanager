import { Component, OnInit, Input, forwardRef, ViewChild} from '@angular/core';
import { Doctor } from '../../model';
import { AppointItem } from '../appoint.model';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgForm } from '@angular/forms';
import { FormValueAccess, make_form_value_provide } from '../../core';
import { GlobalValidService } from 'mpr-form-valid';
import { AppointSet } from '../../model/appointment.model';

@Component({
  selector: 'app-appoint-item',
  templateUrl: './appoint-item.component.html',
  styleUrls: ['./appoint-item.component.scss'],
  providers: [make_form_value_provide(AppointItemComponent)]
})
export class AppointItemComponent extends FormValueAccess implements OnInit, ControlValueAccessor {

  @Input() doctors: Array<Doctor>;

  public userNum: string;
  public selected: Array<String> = [];
  public showCreate = false;
  public appointItem: AppointItem;
  public setting = {userNum: '', doctors: [], selectedAll: []};

  @ViewChild(NgForm) settingForm: NgForm;

  public errMsg = {
    userNum: {required: '请输入放号量'},
    doctors: {required: '请选择医生'}
  };

  constructor(private globalValidServ: GlobalValidService) {
    super();
  }

  ngOnInit() {
  }

  handleCreateClick() {
    this.showCreate = true;
  }

  handleSelectAllChange(status) {
    console.log(status);
    if (status) {
      this.setting.doctors = this.waitSettingDoctors.map(elem => elem.id);
    } else {
      this.setting.doctors = [];
    }
  }

  handleSelectChange(doctorId) {
    if (!this.setting.doctors.length) {
      this.setting.selectedAll = [];
    } else if (this.settingForm) {
      this.settingForm.controls['doctors'].setErrors(null, {emitEvent: true});
    }
    if (this.setting.doctors.length === this.waitSettingDoctors.length) {
      this.setting.selectedAll = ['true'];
    } else {
      this.setting.selectedAll = [];
    }
  }

  handleSubmit() {
    if (!this.setting.doctors.length) {
      this.settingForm.controls['doctors'].setErrors({required: true}, {emitEvent: true});
    }
    if (!this.globalValidServ.validAll()) {
      return;
    }
    this.changeData();
    this.handleCancel();
  }

  handleDeleteItem(index: number) {
    this.appointItem.appointSets.splice(index, 1);
    this.changeData();
  }

  changeData() {
    const newItems = this.appointItem.clone();
    const doctors = this.setting.doctors.map(elem => {
      const index = this.doctors.findIndex(fElem => fElem.id === elem);
      return this.doctors[index];
    });
    const appointSets = doctors.map(doctor => {
      return new AppointSet(null, null, doctor, newItems.timeFrame,
        Number(this.setting.userNum), Number(this.setting.userNum), 1, null, null);
    });
    appointSets.forEach(elem => {
      newItems.addAppointSet(elem);
    });
    this.changeFunc(newItems);
  }

  handleCancel() {
    this.showCreate = false;
    this.setting = {userNum: '', doctors: [], selectedAll: []};
  }

  get waitSettingDoctors() {
      if (!this.doctors || !this.appointItem) {
        return this.doctors || [];
      }
      return this.doctors.filter(doctor => {
        return this.appointItem.appointSets.findIndex(felm => felm.doctor.id === doctor.id) < 0;
      });
  }

  writeValue(value) {
    if (!value) {
      return;
    }
    this.appointItem = value;
  }

}
