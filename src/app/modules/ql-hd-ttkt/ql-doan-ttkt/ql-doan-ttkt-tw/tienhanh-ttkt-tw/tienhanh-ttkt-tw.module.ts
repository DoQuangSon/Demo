import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TienhanhTTKTTwRoutingModule } from './tienhanh-ttkt-tw-routing.module';
import { TienhanhTtktTwComponent } from './tienhanh-ttkt-tw.component';
import { CongboQdTwComponent } from './congbo-qd-tw/congbo-qd-tw.component';
import { TheodoiHdDoanTtktTwComponent } from './theodoi-hd-doan-ttkt-tw/theodoi-hd-doan-ttkt-tw.component';
import { ChitietHdDonviTwComponent } from './chitiet-hd-donvi-tw/chitiet-hd-donvi-tw.component';
import { KetquaTtktComponent } from './ketqua-ttkt/ketqua-ttkt.component';
import { VphcTtktTwComponent } from './vphc-ttkt-tw/vphc-ttkt-tw.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { QlHdTtktSharedModule } from '../../../ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TienhanhTTKTTwRoutingModule,
    QlHdTtktSharedModule
  ],
  declarations: [
    TienhanhTtktTwComponent,
    CongboQdTwComponent,
    TheodoiHdDoanTtktTwComponent,
    ChitietHdDonviTwComponent,
    VphcTtktTwComponent
  ]
})
export class TienhanhTTKTTwModule { }
