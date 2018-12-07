import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarModule, DropdownModule, DataTableModule, PaginatorModule, DialogModule } from 'primeng/primeng';

import { ConfirmCancelBoxComponent } from './confirm-cancel-box';
import { ImageMagnifyBoxComponent } from './image-magnify-box';
import { LoadingBoxComponent } from './loading-box';
import { PopUpBoxComponent } from './pop-up-box';
import { PromptBoxComponent } from './prompt-box';
import { PromptsBoxComponent } from './prompts-box';
import { DropDownBoxComponent } from './drop-down-box';
import { SuccessBoxComponent } from './success-box';
import { StartEndCalendarComponent } from './start-end-calendar';
import { CalendarComponent } from './calendar';
import { OperatingButtonComponent } from './operating-button';
import { DropDownComponent } from './drop-down.component';
import { DataTableComponent } from './data-table/data-table.component';
import { TemplateLoaderComponent } from './template-loader.component';
import { PipesModule } from '../pipes';
import { DirectiveModule } from '../directive/directive.module';
import { PagingBoxComponent } from './paging-box';
import { PagingBoxChildrenComponent } from './paging-box/paging-box-children';
import { CheckBoxComponent } from './check-box/check-box.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { RadiosBoxComponent } from './radios-box/radios-box.component';
import { RadioBoxComponent } from './radio-box/radio-box.component';
import { ChecksBoxComponent } from './checks-box/checks-box.component';
import { FormValidModule } from './form-valid/form-valid.module';
import { MultOptionsComponent } from './mult-options/mult-options.component';
import { MultOptionComponent } from './mult-option/mult-option.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { DialogComponent } from './dialog/dialog.component';
import { NoDataComponent } from './no-data/no-data.component';

// const SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto',
//   keyboardControl: true
// };

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CalendarModule,
        DropdownModule,
        DataTableModule,
        PipesModule,
        PaginatorModule,
        DirectiveModule,
        FormValidModule,
        DialogModule
    ],
    declarations: [
        DropDownBoxComponent,
        CalendarComponent,
        StartEndCalendarComponent,
        ConfirmCancelBoxComponent,
        ImageMagnifyBoxComponent,
        LoadingBoxComponent,
        PopUpBoxComponent,
        PromptBoxComponent,
        PromptsBoxComponent,
        SuccessBoxComponent,
        OperatingButtonComponent,
        DropDownComponent,
        DataTableComponent,
        TemplateLoaderComponent,
        PagingBoxChildrenComponent,
        PagingBoxComponent,
        CheckBoxComponent,
        TooltipsComponent,
        RadiosBoxComponent,
        RadioBoxComponent,
        ChecksBoxComponent,
        MultOptionsComponent,
        MultOptionComponent,
        SearchInputComponent,
        DialogComponent,
        NoDataComponent
    ],
    exports: [
        FormValidModule,
        DropDownBoxComponent,
        CalendarComponent,
        StartEndCalendarComponent,
        ConfirmCancelBoxComponent,
        ImageMagnifyBoxComponent,
        LoadingBoxComponent,
        PopUpBoxComponent,
        PromptBoxComponent,
        PromptsBoxComponent,
        SuccessBoxComponent,
        OperatingButtonComponent,
        DropDownComponent,
        DataTableComponent,
        TemplateLoaderComponent,
        PagingBoxChildrenComponent,
        PagingBoxComponent,
        TooltipsComponent,
        CheckBoxComponent,
        RadiosBoxComponent,
        RadioBoxComponent,
        ChecksBoxComponent,
        MultOptionsComponent,
        SearchInputComponent,
        DialogComponent,
        NoDataComponent
    ]
})
export class ComponentModule { }
