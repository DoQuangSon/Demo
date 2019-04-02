import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoTheodoiKLTTKTTWRoutingModule } from './sotheodoi-ketluan-ttkt-tw-routing.module';
import { DanhSachSoTheodoiTTKTComponent } from '../sotheodoi-ketluan-ttkt-tw/danhsach-sotheodoi-ttkt/danhsach-sotheodoi-ttkt.component';
import { CapNhatSoTheoDoiComponent } from '../sotheodoi-ketluan-ttkt-tw/capnhat-sotheodoi/capnhat-sotheodoi.component';
import { TwTheoDoiTinhComponent } from '../sotheodoi-ketluan-ttkt-tw/tw-theodoi-tinh/tw-theodoi-tinh.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SoTheodoiKLTTKTTWRoutingModule,
  ],
  declarations: [
    DanhSachSoTheodoiTTKTComponent,
    CapNhatSoTheoDoiComponent,
    TwTheoDoiTinhComponent
  ]
})
export class SoTheodoiKLTtktTwMudule { }
