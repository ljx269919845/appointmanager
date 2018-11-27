import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteToMb'
})
export class ByteToMbPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    const mb = value / 1024 / 1024;
    const mbFix = mb.toFixed(2);
    const data = mbFix + 'M';
    return data;
  }

}
