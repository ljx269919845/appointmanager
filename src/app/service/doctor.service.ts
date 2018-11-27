import { Injectable } from '@angular/core';
import { HttpJson } from '../core';
import { Doctor } from '../model';

const HTTP_POST_DOCTOR_CREATE = '/medical/doctor/add';
const HTTP_POST_DOCTOR_UPDATE = '/medical/doctor/{id}/update';
const HTTP_DELTE_DOCTOR = '/medical/doctor/{id}/delete';
const HTTP_POST_DOCTOR_STATUS = '/medical/doctor/{id}/update/{status}';
const HTTP_GET_DOCTOR = '/medical/doctor/list';

@Injectable()
export class DoctorService {

  constructor(private http: HttpJson) { }

  public createDoctor(doctor: Doctor) {
    return this.http.post(HTTP_POST_DOCTOR_CREATE, {}, {}, doctor);
  }

  public updateDoctor(doctor: Doctor) {
    return this.http.post(HTTP_POST_DOCTOR_UPDATE, {id: doctor.id}, {}, doctor);
  }

  public deleteDoctor(doctorId: string) {
    return this.http.delete(HTTP_DELTE_DOCTOR, {id: doctorId});
  }

  public changeDoctorStatus(doctorId: string, status: number) {
    return this.http.post(HTTP_POST_DOCTOR_STATUS, {id: doctorId, status: status}, {}, {});
  }

  public getAllDoctors(status?: number, departId?: string) {
    return this.http.get(HTTP_GET_DOCTOR, {}, {status, departId});
  }
}
