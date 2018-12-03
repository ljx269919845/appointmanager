import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRefPipe } from './template-ref.pipe';
import { GoodsTrailTransPipe } from './goods-trail-trans.pipe';
import { GoodsStatusTransPipe } from './goods-status-trans.pipe';
import { GoodsTypeTransPipe } from './goods-type-trans.pipe';
import { SettlementStatusPipe } from './settlement-status.pipe';
import { SettlementPayerPipe } from './settlement-payer.pipe';
import { ByteToMbPipe } from './byte-to-mb.pipe';
import { CharacterLimitPipe } from './character-limit.pipe';
import { MprOrderStatusPipe } from './mpr-order-status.pipe';
import { IsliOrderStatusPipe } from './isli-order-status.pipe';
import { IsliPublicationTypePipe } from './isli-publication-type.pipe';
import { RmbConvertedMillionPipe } from './rmb-converted-million.pipe';
import { BookTypePipe } from './book-type.pipe';
import { PublicationTypePipe } from './publication-type.pipe';
import { PlatformPipe } from './platform.pipe';
import { DepartMentSatusPipes } from './department-status.pipe';
import { AppointSatusPipes } from './appointStatus.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TemplateRefPipe,
        GoodsTrailTransPipe,
        GoodsStatusTransPipe,
        GoodsTypeTransPipe,
        SettlementStatusPipe,
        SettlementPayerPipe,
        ByteToMbPipe,
        CharacterLimitPipe,
        MprOrderStatusPipe,
        IsliOrderStatusPipe,
        IsliPublicationTypePipe,
        RmbConvertedMillionPipe,
        BookTypePipe,
        PublicationTypePipe,
        PlatformPipe,
        DepartMentSatusPipes,
        AppointSatusPipes
    ],
    exports: [
        TemplateRefPipe,
        GoodsTrailTransPipe,
        GoodsStatusTransPipe,
        GoodsTypeTransPipe,
        SettlementStatusPipe,
        SettlementPayerPipe,
        ByteToMbPipe,
        CharacterLimitPipe,
        MprOrderStatusPipe,
        IsliOrderStatusPipe,
        IsliPublicationTypePipe,
        RmbConvertedMillionPipe,
        BookTypePipe,
        PublicationTypePipe,
        PlatformPipe,
        DepartMentSatusPipes,
        AppointSatusPipes
    ]
})
export class PipesModule { }
