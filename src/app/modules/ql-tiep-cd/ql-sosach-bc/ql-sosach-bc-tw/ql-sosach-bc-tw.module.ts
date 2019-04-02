import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QLSosachBcTWRoutingModule } from './ql-sosach-bc-tw-routing.module';
import { BcKetquaToannganhComponent } from './bc-ketqua-toannganh/bc-ketqua-toannganh.component';
import { ChitietBckqToannganhComponent } from './bc-ketqua-toannganh/chitiet-bckq-toannganh/chitiet-bckq-toannganh.component';
import { SoTheodoiTiepnhanTwComponent } from './so-theodoi-tiepnhan-tw/so-theodoi-tiepnhan-tw.component';
import { TaomoiSoTheodoiTiepnhanTwComponent } from './so-theodoi-tiepnhan-tw/taomoi-so-theodoi-tiepnhan-tw/taomoi-so-theodoi-tiepnhan-tw.component';
import { ChitietSoTheodoiTiepnhanTwComponent } from './so-theodoi-tiepnhan-tw/chitiet-so-theodoi-tiepnhan-tw/chitiet-so-theodoi-tiepnhan-tw.component';
import { BcTonghopKqTwComponent } from './bc-tonghop-kq-tw/bc-tonghop-kq-tw.component';
import { TaomoiBcTonghopKqTwComponent } from './bc-tonghop-kq-tw/taomoi-bc-tonghop-kq-tw/taomoi-bc-tonghop-kq-tw.component';
import { ChitietBcTonghopKqTwComponent } from './bc-tonghop-kq-tw/chitiet-bc-tonghop-kq-tw/chitiet-bc-tonghop-kq-tw.component';
import { SharedModule } from '../../../../shared/shared.module';
import { QLTiepCDSharedModule } from '../../ql-tiep-cd-shared/ql-tiep-cd-shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QLSosachBcTWRoutingModule,
    QLTiepCDSharedModule
  ],
  declarations: [
    BcKetquaToannganhComponent,
    ChitietBckqToannganhComponent,
    SoTheodoiTiepnhanTwComponent,
    TaomoiSoTheodoiTiepnhanTwComponent,
    ChitietSoTheodoiTiepnhanTwComponent,
    BcTonghopKqTwComponent,
    TaomoiBcTonghopKqTwComponent,
    ChitietBcTonghopKqTwComponent
  ]
})
export class QLSosachBcTWModule { }
