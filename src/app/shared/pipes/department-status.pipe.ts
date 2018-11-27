import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departmentStatus'
})
export class DepartMentSatusPipes implements PipeTransform {

  transform(status: any, args?: any): any {
    if (Number(status) === 1) {
      return '使用中';
    }
    return '冻结中';
  }

}
