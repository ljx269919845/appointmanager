import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsbnDirective } from './isbn.directive';
import { CipDirective } from './cip.directive';
import { EditionDirective } from './edition.drective';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ IsbnDirective, CipDirective, EditionDirective ],
    exports: [ IsbnDirective, CipDirective, EditionDirective ]
})
export class ValidDirectiveModule {}
