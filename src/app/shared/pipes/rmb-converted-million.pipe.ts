import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rmbConvertedMillionPipe'
})
export class RmbConvertedMillionPipe implements PipeTransform {
    transform(value: any): any {
        if (!value) {
            return 0;
        }
        let str = value.toString().split('.');
        if (str[0].length > 4) {
            return value / 10000;
        } else {
            return value;
        }
    }
}

