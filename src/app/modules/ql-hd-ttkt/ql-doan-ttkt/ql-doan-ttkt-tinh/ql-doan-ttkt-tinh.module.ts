import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QLDoanTTKTTINHRoutingModule } from './ql-doan-ttkt-tinh-routing.module';
import { TlDoanTtktCapTinhModule } from './tl-doan-ttkt-cap-tinh/tl-doan-ttkt-cap-tinh.module';
import { QdTtktTinhModule } from './qd-ttkt-bhxh-vn/qd-ttkt-tinh.module';
import { TienHanhTTKTModule } from './tienhanh-ttkt/tienhanh-ttkt.module';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QLDoanTTKTTINHRoutingModule,
  ],
  declarations: []
})
export class QLDoanTTKTTinhModule { }
