import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'settlementStatusPipe'
})
export class SettlementStatusPipe implements PipeTransform {

    transform(value:any, args?:any):any {
        switch(value){
            case '0':
                return value = '等待平台受理';
            case '1':
                return value = "平台接受申请 ";
            case '2':
                return value = "等待平台结算";
            case '3':
                return value = "结算成功";
            case '4':
                return value = "结算失败 ";
            case '5':
                return value = "等待申请结算";
            default:
                return value = "其他未知状态";
        
        }
    }

}