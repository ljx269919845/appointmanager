import { Pipe, PipeTransform } from '@angular/core';
// import { GOODS_TRAIL, GoodsTrailParameter } from '../../service/model/goods.model';

const GOODS_TRAIL: any = {}; // 在电子书项目中找具体定义

@Pipe({
    name: 'goodsTrailTrans'
})
export class GoodsTrailTransPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (!value) {
            return;
        }
        const goodsTrailId = value.goodsTrialId;
        const isliGoodsType = value.isliGoodsType;

        const chapterFree = value.goodsTrailParameterTrans.chapterFree;
        const startDate = value.goodsTrailParameterTrans.startDate;
        const endDate = value.goodsTrailParameterTrans.endDate;
        const startTime = value.goodsTrailParameterTrans.startTime;
        const endTime = value.goodsTrailParameterTrans.endTime;
        if (goodsTrailId === GOODS_TRAIL.SECTION_TRAIL && isliGoodsType & 2) {
            return '前' + chapterFree + '章免费';
        } else if (goodsTrailId === GOODS_TRAIL.SECTION_TRAIL && isliGoodsType & 1) {
            return '前' + chapterFree + '页免费';
        } else if (goodsTrailId === GOODS_TRAIL.PERCENT_TRAIL) {
            return '前' + chapterFree + '%免费';
        } else if (goodsTrailId === GOODS_TRAIL.DATE_LIMIT_TRAIL) {
            return startDate + ' ' + startTime.substr(0, 5) + ' 至<br/>' + endDate + ' ' + endTime.substr(0, 5) + ' 免费';
        } else if (goodsTrailId === GOODS_TRAIL.TIME_LIMIT_TRAIL) {
            return (
                startDate + ' 至 ' + endDate + '<br/>每天 ' + startTime.substr(0, 5) + ' 至 ' + endTime.substr(0, 5) + ' 免费'
            );
        } else if (goodsTrailId === GOODS_TRAIL.FREE_TRAIL) {
            return '免费';
        }
    }
}
