import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KetthucTtktTinhComponent } from './ketthuc-ttkt-tinh.component';
import { KTDoanTTKTTINHRoutingModule } from './kethuc-ttkt-tinh-routing.module';
import { QlHdTtktSharedModule } from '../../../ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';
import { BaoCaoTtktTinhComponent } from './bao-cao-ttkt-tinh/bao-cao-ttkt-tinh.component';

@NgModule({
  imports: [
    CommonModule,
    KTDoanTTKTTINHRoutingModule,
    QlHdTtktSharedModule
  ],
  declarations: [KetthucTtktTinhComponent, BaoCaoTtktTinhComponent]
})
export class KetthucTtktTinhModule { }
