import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TienHanhTTKTRoutingModule } from './tienhanh-ttkt-routing.module';
import { TienHanhTTKTComponent } from './tienhanh-ttkt.component';
import { ChiTietQDCongBoComponent } from './chitiet-qd-congbo/chitiet-qd-congbo.component';
import { CongBoQDComponent } from './congbo-qd/congbo-qd.component';
import { ChitietHdDonviTinhComponent } from '../tienhanh-ttkt/chitiet-hd-donvi-tinh/chitiet-hd-donvi-tinh.component';
import { TheodoiHdDoanTtktTinhComponent } from '../tienhanh-ttkt/theodoi-hd-doan-ttkt-tinh/theodoi-hd-doan-ttkt-tinh.component';
import { BaocaoKlTtktTinhComponent } from './baocao-kl-ttkt-tinh/baocao-kl-ttkt-tinh.component';
import { VphcTtktTinhComponent } from './vphc-ttkt-tinh/vphc-ttkt-tinh.component';
import { QlHdTtktSharedModule } from '../../../ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';
import { TienhanhTTKTTwModule } from '../../ql-doan-ttkt-tw/tienhanh-ttkt-tw/tienhanh-ttkt-tw.module';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TienHanhTTKTRoutingModule,
    QlHdTtktSharedModule,
  ],
  declarations: [
    TienHanhTTKTComponent,
    ChiTietQDCongBoComponent,
    CongBoQDComponent,
    ChitietHdDonviTinhComponent,
    TheodoiHdDoanTtktTinhComponent,
    BaocaoKlTtktTinhComponent,
    VphcTtktTinhComponent,
  ]
})
export class TienHanhTTKTModule { }
