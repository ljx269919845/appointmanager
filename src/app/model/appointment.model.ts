import { DepartMent } from './department.model';
import { Doctor } from './doctor.model';

export class User {
  constructor(
    public id: string,
    public userName: string,
    public userDay: string,
    public userAge: number,
    public userSex: number,
    public userPhone: string,
    public openId: string
  ) {}
}

export class AppointMent {
  constructor(
    public id?: string,
    public depart?: DepartMent,
    public doctor?: Doctor,
    public user?: User,
    public appointDate?: String,
    public appointTime?: string,
    public status?: number,
    public remark?: string,
    public createTime?: string,
    public updateTime?: string
  ) {}
}

export class AppointSet {
  constructor(
    public id: string,
    public depart: DepartMent,
    public doctor: Doctor,
    public timeFrame: String,
    public userNum: number,
    public surplusNum: number,
    public status: number,
    public updateTime: string,
    public createTime: string
  ) {}
}
