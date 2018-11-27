import { Component, OnInit } from '@angular/core';
import { LoginInfo } from '../model';
import { GlobalValidService } from 'mpr-form-valid';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/primeng';
import { AppState } from '../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = new LoginInfo();
  public errMsg = {
    username: {required: '请输入账号'},
    password: {required: '请输入密码'}
  };

  constructor(private globalValidServ: GlobalValidService,
    private loginServ: LoginService, private router: Router,
    private messageServ: MessageService, private state: AppState) { }

  ngOnInit() {
    if (this.state.get('remeber')) {
      this.user.remember = ['1'];
    }
    this.state.set('token', '');
  }


  handleLogin() {
    if (!this.globalValidServ.validAll()) {
      return;
    }
    this.loginServ.login(this.user.username, this.user.password).success((res) => {
      if (this.user.remember.length) {
        this.state.set('remeber', 1);
      } else {
        this.state.set('remeber', 0);
      }
      this.state.set('token', res.data.token);
      this.router.navigate(['content']);
    }).error(() => {
      this.messageServ.add({severity: 'error', summary: '登录失败'});
    });
  }
}