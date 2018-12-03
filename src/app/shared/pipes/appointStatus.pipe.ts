import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appointStatus'
})
export class AppointSatusPipes implements PipeTransform {

  transform(status: any, args?: any): any {
    if (Number(status) === 0) {
      return '患者取消';
    } else if (Number(status) === 1) {
      return '预约成功';
    } else if (Number(status) === 2) {
      return '后台取消';
    } else if (Number(status) === 3) {
      return '服务完成';
    }
    return '未知';
  }

}
