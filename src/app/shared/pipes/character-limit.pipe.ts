import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterLimit'
})
export class CharacterLimitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return '导航名称不能为空';
    }
    // const reg = /[\u4E00-\u9FA5]{0,8}/;
    // console.log(reg.test(value));
    // if (reg.test(value)) {
    //   return null;
    // }
    // return '导航名称限制8个汉字（16个字符）';
  }

}
