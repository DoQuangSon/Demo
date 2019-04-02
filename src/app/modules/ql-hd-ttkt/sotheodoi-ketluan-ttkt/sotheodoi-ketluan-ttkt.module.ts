import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoTheodoiKLTtktTinhMudule } from './sotheodoi-ketluan-ttkt-tinh/sotheodoi-ketluan-ttkt-tinh.module';
import { SoTheodoiKLTtktTwMudule } from './sotheodoi-ketluan-ttkt-tw/sotheodoi-ketluan-ttkt-tw.module';
import { SoTheoDoiKLTTKTRoutingModule } from './sotheodoi-ketluan-ttkt-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SoTheoDoiKLTTKTRoutingModule
  ],
  declarations: []
})
export class SoTheoDoiKetLuanModule { }
