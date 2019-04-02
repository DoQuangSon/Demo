import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoTheodoiKLTTKTTINHRoutingModule } from './sotheodoi-ketluan-ttkt-tinh-routing.module';
import { DanhSachSoTheodoiTTKTComponent } from '../sotheodoi-ketluan-ttkt-tinh/danhsach-sotheodoi-ttkt/danhsach-sotheodoi-ttkt.component';
import { CapNhatSoTheoDoiComponent } from '../sotheodoi-ketluan-ttkt-tinh/capnhat-sotheodoi/capnhat-sotheodoi.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SoTheodoiKLTTKTTINHRoutingModule,
  ],
  declarations: [
    DanhSachSoTheodoiTTKTComponent,
    CapNhatSoTheoDoiComponent
  ]
})
export class SoTheodoiKLTtktTinhMudule { }
