import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TlDoanTtktTwComponent } from './tl-doan-ttkt-tw.component';
import { TlDoanTTKTTWRoutingModule } from './tl-doan-ttkt-tw-routing.module';
import { TaoMoiDoanTtktTwComponent } from './tao-moi-doan-ttkt-tw/tao-moi-doan-ttkt-tw.component';
import { ChiTietDoanTtktTwComponent } from './chi-tiet-doan-ttkt-tw/chi-tiet-doan-ttkt-tw.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { QlHdTtktSharedModule } from '../../../ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TlDoanTTKTTWRoutingModule,
    QlHdTtktSharedModule
  ],
  declarations: [
    TlDoanTtktTwComponent,
    TaoMoiDoanTtktTwComponent,
    ChiTietDoanTtktTwComponent
  ]
})
export class TlDoanTTKTTwModule { }
