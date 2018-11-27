import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mprOrderStatus'
})
export class MprOrderStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let statusDesc = '未知';

    if (value === 4) {
      statusDesc = '交易取消';
    }

    if (value === 3) {
      statusDesc = '交易成功';
    }

    if (value === 0) {
      statusDesc = '待付款';
    }

    return statusDesc;
  }

}
