import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Doctor } from '../../model';
import { GlobalValidService } from 'mpr-form-valid';
import { ImageService, ImageUploadData, IMAGE_ERROE } from '../../core';
import { NgForm } from '@angular/forms';
import { DepartMent } from '../../model/department.model';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent implements OnInit {

  @Output() OnUpdate = new EventEmitter();
  @Output() OnCreate = new EventEmitter();
  @Output() OnCancel = new EventEmitter();

  @Input() doctorModify: Doctor;
  @Input() departMent: Array<DepartMent>;
  public doctor = new Doctor();
  @ViewChild(NgForm) form: NgForm;
  private imageUploader: ImageUploadData;

  public errMsg = {
    doctorName: {required: '请输入姓名'},
    doctorPhone: {required: '请输入手机号'},
    doctorImg: {imgError: '图片不符合要求', uploadError: '图片上传失败'}
  };

  constructor(private globalValidServ: GlobalValidService, private imageServ: ImageService) {
    this.imageUploader = imageServ.getDoctorImageUploader((result) => {
      if (result === IMAGE_ERROE.NO_ERRROR) {
        this.form.controls['doctorImg'].setErrors(null, {emitEvent: true});
      } else {
        this.form.controls['doctorImg'].setErrors({imgError: true}, {emitEvent: true});
      }
    });
    this.doctor.doctorSex = 1;
    this.doctor.status = 0;
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if ('doctorModify' in changes && this.doctorModify) {
      this.doctor = Object.assign({}, this.doctorModify);
    }
    if ('departMent' in changes && this.departMent.length) {
      this.doctor.departId = this.departMent[0].id;
    }
  }

  handleFileChange(event) {
    this.imageUploader.setImageFile(event.target.files[0]);
    this.imageUploader.post({}, {}).success((res) => {
      this.form.controls['doctorImg'].setValue(res.data && res.data.imagePath);
    }).error(() => {
      this.form.controls['doctorImg'].setErrors({uploadError: true}, {emitEvent: true});
    });
  }

  handleSubmit() {
    if (this.globalValidServ.validAll()) {
      if (this.doctorModify) {
        this.OnUpdate.emit(this.doctor);
      } else {
        this.OnCreate.emit(this.doctor);
      }
    }
  }

  handleCancel() {
    this.OnCancel.emit();
  }
}
