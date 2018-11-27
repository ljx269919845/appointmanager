import { Injectable } from '@angular/core';
import { HttpJson } from '../core';

const HTTP_POST_LOGIN = '/medical/login/admin';

@Injectable()
export class LoginService {

  constructor(private http: HttpJson) { }

  login(username: string, password: string) {
    return this.http.post(HTTP_POST_LOGIN, {}, {}, {username, password});
  }

}
