import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KetthucTtktTwComponent } from './ketthuc-ttkt-tw.component';
import { KTDoanTTKTTWRoutingModule } from './ketthuc-ttkt-tw-routing.module';
import { QlHdTtktSharedModule } from '../../../ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';
import { BaoCaoTtktTwComponent } from './bao-cao-ttkt-tw/bao-cao-ttkt-tw.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { GiaiTrinhChapHanhTtktTwComponent } from './giai-trinh-chap-hanh-ttkt-tw/giai-trinh-chap-hanh-ttkt-tw.component';
import { GiaiTrinhChapHanhTtktDonViTwComponent } from './giai-trinh-chap-hanh-ttkt-tw/giai-trinh-chap-hanh-ttkt-don-vi-tw/giai-trinh-chap-hanh-ttkt-don-vi-tw.component';

@NgModule({
  imports: [
    CommonModule,
    KTDoanTTKTTWRoutingModule,
    QlHdTtktSharedModule,
    SharedModule
  ],
  declarations: [BaoCaoTtktTwComponent, GiaiTrinhChapHanhTtktTwComponent,GiaiTrinhChapHanhTtktDonViTwComponent]
})
export class KetthucTtktTwModule { }
