import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QLSosachBcTINHRoutingModule } from './ql-sosach-bc-tinh-routing.module';
import { SoTheodoiTiepnhanComponent } from './so-theodoi-tiepnhan/so-theodoi-tiepnhan.component';
import { BcTonghopKqComponent } from './bc-tonghop-kq/bc-tonghop-kq.component';
import { ChitietBcTonghopKqComponent } from './bc-tonghop-kq/chitiet-bc-tonghop-kq/chitiet-bc-tonghop-kq.component';
import { TaomoiBcTonghopKqComponent } from './bc-tonghop-kq/taomoi-bc-tonghop-kq/taomoi-bc-tonghop-kq.component';
import { ChitietSoTheodoiTiepnhanTinhComponent } from './so-theodoi-tiepnhan/chitiet-so-theodoi-tiepnhan-tinh/chitiet-so-theodoi-tiepnhan-tinh.component';
import { TaomoiSoTheodoiTiepnhanTinhComponent } from './so-theodoi-tiepnhan/taomoi-so-theodoi-tiepnhan-tinh/taomoi-so-theodoi-tiepnhan-tinh.component';
import { QLTiepCDSharedModule } from '../../ql-tiep-cd-shared/ql-tiep-cd-shared.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QLSosachBcTINHRoutingModule,
    QLTiepCDSharedModule
  ],
  declarations: [
    SoTheodoiTiepnhanComponent,
    BcTonghopKqComponent,
    ChitietBcTonghopKqComponent,
    TaomoiBcTonghopKqComponent,
    ChitietSoTheodoiTiepnhanTinhComponent,
    TaomoiSoTheodoiTiepnhanTinhComponent,
  ]
})
export class QLSosachBcTINHModule { }
