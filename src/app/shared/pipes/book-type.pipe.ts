import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookType'
})
export class BookTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'mpr':
        return '点读版';
      case 'target':
        return '全媒版';
    }
  }

}
