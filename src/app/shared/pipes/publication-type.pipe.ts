import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'publicationType'
})
export class PublicationTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
            case "1":
                return '图书';
            case "2":
                return '期刊';
            case "3":
                return '报纸';
            case "4":
                return '音像';
            case "5":
                return '音像';
            case "6":
                return '互联网出版物';
            default:
                return '未知';
        }
  }

}
