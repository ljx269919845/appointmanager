import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FormValidModule } from 'mpr-form-valid';
import { DropdownModule, ButtonModule, InputTextareaModule, FieldsetModule, CheckboxModule, RadioButtonModule, DialogModule } from 'primeng/primeng';

import { ComponentModule } from './component/component.module';
import { DirectiveModule } from './directive/directive.module';
import { PipesModule } from './pipes/pipes.module';
// import { FormValidMsgService } from './service/form-valid-msg.service';
import { ValidDirectiveModule } from './valid-directive/valid-directive.module';
import {ToastModule} from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        FormValidModule,
        DropdownModule,
        ReactiveFormsModule,
        FormsModule,
        ComponentModule,
        DirectiveModule,
        PipesModule,
        ValidDirectiveModule,
        ButtonModule,
        InputTextareaModule,
        FieldsetModule,
        CheckboxModule,
        ToastModule,
        RadioButtonModule,
        DialogModule,
    ],
    exports: [
        DropdownModule,
        FormValidModule,
        ReactiveFormsModule,
        FormsModule,
        ComponentModule,
        DirectiveModule,
        PipesModule,
        ValidDirectiveModule,
        ButtonModule,
        InputTextareaModule,
        FieldsetModule,
        CheckboxModule,
        ToastModule,
        RadioButtonModule,
        DialogModule
    ],
    providers: [ ]
})
export class SharedModule {}
