import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router, private state: AppState) {
    if (state.get('token') && state.get('remeber')) {
      router.navigate(['content']);
    }
  }
}
