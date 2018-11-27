import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'isliOrderStatus'
})

export class IsliOrderStatusPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let statusDesc = '未知'
        if (value === 0) {
            statusDesc = "交易成功";
        }

        return statusDesc;
    }
}