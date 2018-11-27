import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isliPublicationType'
})
export class IsliPublicationTypePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let type = "全部"
        switch (value) {
            case 1: type = "图书";
                break
            case 2: type = "期刊、杂志";
                break
            case 3: type = "报纸";
                break
            case 4: type = "电子音像";
                break
            default: break
        }

        return type;
    }

}
