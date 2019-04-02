import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QLDoanTTKTTINHRoutingModule } from './ql-baocao-ttkt-tinh-routing.module';
import { SoTheodoiChitietTinhComponent } from './so-theodoi-chitiet-tinh/so-theodoi-chitiet-tinh.component';
import { DsSoTheodoiDonviComponent } from './so-theodoi-chitiet-tinh/ds-so-theodoi-donvi/ds-so-theodoi-donvi.component';
import { ChitietSoTheodoiDonviComponent } from './so-theodoi-chitiet-tinh/chitiet-so-theodoi-donvi/chitiet-so-theodoi-donvi.component';
import { SoTonghopKqTinhComponent } from './so-tonghop-kq-tinh/so-tonghop-kq-tinh.component';
import { BcTonghopTinhComponent } from './bc-tonghop-tinh/bc-tonghop-tinh.component';
import { ChitietSoTonghopKqComponent } from './so-tonghop-kq-tinh/chitiet-so-tonghop-kq/chitiet-so-tonghop-kq.component';
import { TaomoiSoTonghopKqComponent } from './so-tonghop-kq-tinh/taomoi-so-tonghop-kq/taomoi-so-tonghop-kq.component';
import { TaomoiBcTonghopTinhComponent } from './bc-tonghop-tinh/taomoi-bc-tonghop-tinh/taomoi-bc-tonghop-tinh.component';
import { ChitietBcTonghopTinhComponent } from './bc-tonghop-tinh/chitiet-bc-tonghop-tinh/chitiet-bc-tonghop-tinh.component';
import { TaomoiBcLinhvucTinhComponent } from './bc-tonghop-tinh/taomoi-bc-linhvuc-tinh/taomoi-bc-linhvuc-tinh.component';
import { LoaiBcLinhvucTinhComponent } from './bc-tonghop-tinh/loai-bc-linhvuc-tinh/loai-bc-linhvuc-tinh.component';
import { SharedModule } from '../../../../shared/shared.module';
import { QlHdTtktSharedModule } from '../../ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QLDoanTTKTTINHRoutingModule,
    QlHdTtktSharedModule
  ],
  declarations: [
    SoTheodoiChitietTinhComponent,
    DsSoTheodoiDonviComponent,
    ChitietSoTheodoiDonviComponent,
    SoTonghopKqTinhComponent,
    BcTonghopTinhComponent,
    ChitietSoTonghopKqComponent,
    TaomoiSoTonghopKqComponent,
    TaomoiBcTonghopTinhComponent,
    ChitietBcTonghopTinhComponent,
    TaomoiBcLinhvucTinhComponent,
    LoaiBcLinhvucTinhComponent,
  ]
})
export class QlBaocaoTtktTinhModule { }
