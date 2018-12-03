import { Injectable } from '@angular/core';
import { HttpJson } from '../core';
import { Doctor } from '../model';
import { AppointSet } from '../model/appointment.model';

const HTTP_POST_APPOINTSET_CREATE = '/medical/appoint/setting/add';
const HTTP_POST_APPOINTSET_UPDATE = '/medical/appoint/setting/{id}/update';
const HTTP_DELTE_APPOINTSET = '/medical/appoint/setting/{id}/delete';
const HTTP_POST_APPOINTMENT_STATUS = '/medical/doctor/appoint/{appointId}/{status}';
const HTTP_GET_APPOINTMENT = '/medical/appoint/setting/list';
const HTTP_GET_APPOINTEENTS = '/medical/doctor/appoint/list';

@Injectable()
export class AppointService {

  constructor(private http: HttpJson) { }

  public addAPointSet(appointSet: AppointSet) {
    return this.http.post(HTTP_POST_APPOINTSET_CREATE, {}, {}, {departId: appointSet.doctor.departId,
      doctorId: appointSet.doctor.id, timeFrame: appointSet.timeFrame, userNum: appointSet.userNum,
      surplusNum: appointSet.userNum, status: 1});
  }

  public updateAPointSet(appointSet: AppointSet) {
    return this.http.post(HTTP_POST_APPOINTSET_UPDATE, {id: appointSet.id}, {}, {departId: appointSet.doctor.departId,
      doctorId: appointSet.doctor.id, timeFrame: appointSet.timeFrame, userNum: appointSet.userNum, surplusNum: appointSet.userNum});
  }

  public deleteAPointSet(appointId: string) {
    return this.http.delete(HTTP_DELTE_APPOINTSET, {id: appointId});
  }

  public changeAppointStatus(appointId: string, status: number) {
     return this.http.post(HTTP_POST_APPOINTMENT_STATUS, {id: appointId, status: status}, {}, {});
  }

  public cancelAppointMent(appointId: string, status: number) {
    return this.http.post(HTTP_POST_APPOINTMENT_STATUS, {appointId, status}, {}, {});
  }

  public getAllAppoints(status?: number, departId?: string, doctorId?: string) {
    return this.http.get(HTTP_GET_APPOINTMENT, {}, {status, departId, doctorId});
  }

  public getAllAppointMents(searchWord?: string, timeFrame?: string, departId?: string, doctorId?: string,
     dateStart?: string, dateEnd?: string, pageIndex?: number, pageSize?: number) {
    return this.http.get(HTTP_GET_APPOINTEENTS, {}, {searchWord, timeFrame, departId, doctorId, dateStart, dateEnd, pageIndex, pageSize});
  }
}
