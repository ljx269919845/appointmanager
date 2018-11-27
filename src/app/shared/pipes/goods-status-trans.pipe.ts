import { Pipe, PipeTransform } from '@angular/core';
/**
 * 商品状态
 * 0 待销售/待上架、1上架中/在售中、2下架/已下架、3 强制下架、4上传中、
 * 5上传失败、6 预处理中、7预处理失败、8CP后台删除、9商品信息缺失、10 暂停、11 用户删除
 */
export enum GOODS_STATUS {
    FOR_SALE = 0, ON_SALE = 1, CANCEL_SALE = 2, FORCE_SALE = 3, UPLOADING = 4,
    UPLOAD_FAILED = 5, DEALING = 6, DEAL_FAILED = 7, CP_DELETE = 8, INFO_LOST = 9, UPLOAD_PAUSE = 10, USER_DELETE = 11
}

@Pipe({
    name: 'goodsStatusTrans'
})
export class GoodsStatusTransPipe implements PipeTransform {
    transform(value: string, args?: any): any {
        if (Number(value) === GOODS_STATUS.FOR_SALE) {
            return '待上架';
        } else if (Number(value) === GOODS_STATUS.ON_SALE) {
            return '在售中';
        } else if (Number(value) === GOODS_STATUS.CANCEL_SALE) {
            return '已下架';
        } else if (Number(value) === GOODS_STATUS.FORCE_SALE) {
            return '强制下架';
        } else if (Number(value) === GOODS_STATUS.UPLOADING) {
            return '上传中';
        } else if (Number(value) === GOODS_STATUS.UPLOAD_FAILED) {
            return '上传失败';
        } else if (Number(value) === GOODS_STATUS.DEALING) {
            return '预处理中';
        } else if (Number(value) === GOODS_STATUS.DEAL_FAILED) {
            return '预处理失败';
        } else if (Number(value) === GOODS_STATUS.CP_DELETE) {
            return 'CP后台删除';
        } else if (Number(value) === GOODS_STATUS.INFO_LOST) {
            return '商品信息缺失';
        } else if (Number(value) === GOODS_STATUS.UPLOAD_PAUSE) {
            return '暂停';
        } else if (Number(value) === GOODS_STATUS.USER_DELETE) {
            return '用户删除';
        }
    }
}
