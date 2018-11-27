import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {QtRefMockService} from './qt-ref.mock.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    QtRefMockService
  ]
})
export class QtMockModule { }
