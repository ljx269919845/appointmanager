import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditFocusDirective } from './edit-focus.directive';
import { FloatOnlyDirective } from './float-only.directive';
import { FocusDirective } from './focus.directive';
import { GetFocusDirective } from './get-focus.directive';
import { IntegerOnlyDirective } from './integer-only.directive';
import { PatternInputDirective } from './pattern-input.directive';
import { ReadOnlyDirective } from './read-only.directive';
import { AutofocusDirective } from './auto-focus.directive';
import { TemplateRefDirective } from './template-ref.directive';
import { ScrollDirective } from './scroll.directive';

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        EditFocusDirective,
        FloatOnlyDirective,
        FocusDirective,
        GetFocusDirective,
        IntegerOnlyDirective,
        PatternInputDirective,
        AutofocusDirective,
        ReadOnlyDirective,
        TemplateRefDirective,
        ScrollDirective
    ],
    exports: [
        EditFocusDirective,
        FloatOnlyDirective,
        FocusDirective,
        GetFocusDirective,
        IntegerOnlyDirective,
        PatternInputDirective,
        ReadOnlyDirective,
        AutofocusDirective,
        TemplateRefDirective,
        ScrollDirective
    ]
})
export class DirectiveModule {}
