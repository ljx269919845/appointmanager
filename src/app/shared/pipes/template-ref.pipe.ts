/**
 * Created by zhangle on 2017/3/25.
 */
import { Pipe, PipeTransform } from '@angular/core';

import { TemplateRefDirective } from '../directive';

@Pipe({
    name: 'tlTemplate'
})
export class TemplateRefPipe implements PipeTransform {
    transform(value: Array<TemplateRefDirective>, name: string): any {
        if (!value || value.length < 1 || !name) {
            return null;
        }
        let result: TemplateRefDirective = null;
        value.some((temRef) => {
            if (temRef.name === name) {
                result = temRef;
                return true;
            }
        });
        return result && result.template;
    }
}
