import { Injectable } from '@angular/core';
import { HttpJson } from '../core';
import { DepartMent } from '../model/department.model';

const HTTP_POST_DEPARTMENT_CREATE = '/medical/depart/add';
const HTTP_POST_DEPARTMENT_UPDATE = '/medical/depart/{id}/update';
const HTTP_DELTE_DEPARTMENT = '/medical/depart/{id}/delete';
const HTTP_POST_DEPARTMENT_STATUS = '/medical/depart/{id}/update/{status}';
const HTTP_GET_DEPARTMENT = '/medical/depart/list/{status}';

@Injectable()
export class DepartMentService {

  constructor(private http: HttpJson) { }

  public createDepartMent(departMent: DepartMent) {
    return this.http.post(HTTP_POST_DEPARTMENT_CREATE, {}, {}, departMent);
  }

  public updateDepartMent(departMent: DepartMent) {
    return this.http.post(HTTP_POST_DEPARTMENT_UPDATE, {id: departMent.id}, {}, departMent);
  }

  public deleteDepartMent(departMentId: string) {
    return this.http.delete(HTTP_DELTE_DEPARTMENT, {id: departMentId});
  }

  public changeDepartMentStatus(departmentId: string, status: number) {
    return this.http.post(HTTP_POST_DEPARTMENT_STATUS, {id: departmentId, status: status}, {}, {});
  }

  public getAllDepartMents(status = 1000) {
    return this.http.get(HTTP_GET_DEPARTMENT, {status});
  }
}
