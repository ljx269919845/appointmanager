import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goodsTypeTrans'
})
export class GoodsTypeTransPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value & 1 || value & 101) {
      return 'PDF';
    } else {
      return 'ePub';
    }
  }

}
