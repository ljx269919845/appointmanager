import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'settlementPayerPipe'
})
export class SettlementPayerPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch (value) {
            case "alipay":
                return value = "支付宝 ";
            case 'weixin':
                return value = "微信";
            case 'fmpay':
                return value = '饭粒';
            case 'applepay':
                return value = '饭票';
            default:
                return value = "全部";

        }
    }

}