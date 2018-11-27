import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'platform'
})
export class PlatformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch(value){
            case 1:
                return '泛媒网';
            case 2:
                return '京东'
            default:
                return '未知'
        }
  }

}
