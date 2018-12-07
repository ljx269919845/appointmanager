import { Injectable } from '@angular/core';
import { HttpJson } from '../core';

const HTTP_GET_USERS = '/medical/user/list';
const HTTP_GET_USER_INFO = '/medical//user/{openId}';
const HTTP_GET_USER_APPOINT_LIST = '/medical/user/appoint/list/{userId}';

@Injectable()
export class UserService{
  constructor(private http: HttpJson){
  }

  public getUserList(searchWord?: string, beginDate?:string, endDate?:string, pageIndex?: number, pageSize?:number){
    return this.http.get(HTTP_GET_USERS, {}, {searchWord, pageIndex, pageSize, beginDate, endDate});
  }
}
