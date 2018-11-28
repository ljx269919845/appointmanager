import { DepartMent } from './department.model';
import { Doctor } from './doctor.model';

export const TIME_FRAME_DRAOPS = [
  {name: '8:00-9:00'}, {name: '9:00-10:00'}, {name: '10:00-11:00'}, {name: '11:00-12:00'},
  {name: '14:00-15:00'}, {name: '15:00-16:00'}, {name: '16:00-17:00'}, {name: '17:00-18:00'}
];

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

export class AppointSetVo {
  constructor(
    public id: string,
    public departId: number,
    public doctorId: number,
    public timeFrame: String,
    public userNum: number,
    public surplusNum: number,
    public status: number,
    public updateTime: string,
    public createTime: string
  ) {}
}

export class AppointMents {
  constructor(
    public appointSetList: Array<AppointSetVo>,
    public appointNum: number
  ) {}
}
