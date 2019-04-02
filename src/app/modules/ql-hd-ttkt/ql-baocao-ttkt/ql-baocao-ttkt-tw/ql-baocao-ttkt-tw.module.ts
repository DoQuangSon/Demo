import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QLBaocaoTTKTTwRoutingModule } from './ql-baocao-ttkt-tw-routing.module';
import { SoTheoDoiChiTietComponent } from './so-theo-doi-chi-tiet/so-theo-doi-chi-tiet.component';
import { SoTongHopKetQuaComponent } from './so-tong-hop-ket-qua/so-tong-hop-ket-qua.component';
import { BaoCaoKetQuaToanNganhComponent } from './bao-cao-ket-qua-toan-nganh/bao-cao-ket-qua-toan-nganh.component';
import { BaoCaoTongHopToanNganhComponent } from './bao-cao-tong-hop-toan-nganh/bao-cao-tong-hop-toan-nganh.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DsSoTheodoiDonviTwComponent } from './so-theo-doi-chi-tiet/ds-so-theodoi-donvi-tw/ds-so-theodoi-donvi-tw.component';
import { ChitietSoTheodoiDonviTwComponent } from './so-theo-doi-chi-tiet/chitiet-so-theodoi-donvi-tw/chitiet-so-theodoi-donvi-tw.component';
import { BaoCaoKqChoDuyetComponent } from './bao-cao-ket-qua-toan-nganh/bao-cao-kq-cho-duyet/bao-cao-kq-cho-duyet.component';
import { DetailBckqNganhComponent } from './bao-cao-ket-qua-toan-nganh/detail-bckq-nganh/detail-bckq-nganh.component';
import { ChitietSoTonghopKqTwComponent } from './so-tong-hop-ket-qua/chitiet-so-tonghop-kq-tw/chitiet-so-tonghop-kq-tw.component';
import { TaomoiSoTonghopKqTwComponent } from './so-tong-hop-ket-qua/taomoi-so-tonghop-kq-tw/taomoi-so-tonghop-kq-tw.component';
import { LoaiBcLinhvucTwComponent } from './bao-cao-tong-hop-toan-nganh/loai-bc-linhvuc-tw/loai-bc-linhvuc-tw.component';
import { SharedModule } from '../../../../shared/shared.module';
import { QlHdTtktSharedModule } from '../../ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';
// tslint:disable-next-line:max-line-length
import { TaomoiBcTonghopToannganhComponent } from './bao-cao-tong-hop-toan-nganh/taomoi-bc-tonghop-toannganh/taomoi-bc-tonghop-toannganh.component';
// tslint:disable-next-line:import-spacing
import { ChitietBcTonghopToannganhComponent } from
'./bao-cao-tong-hop-toan-nganh/chitiet-bc-tonghop-toannganh/chitiet-bc-tonghop-toannganh.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QLBaocaoTTKTTwRoutingModule,
    QlHdTtktSharedModule
  ],
  declarations: [
    SoTheoDoiChiTietComponent,
    SoTongHopKetQuaComponent,
    BaoCaoKetQuaToanNganhComponent,
    BaoCaoTongHopToanNganhComponent,
    DsSoTheodoiDonviTwComponent,
    ChitietSoTheodoiDonviTwComponent,
    BaoCaoKqChoDuyetComponent,
    DetailBckqNganhComponent,
    ChitietSoTonghopKqTwComponent,
    TaomoiSoTonghopKqTwComponent,
    ChitietBcTonghopToannganhComponent,
    TaomoiBcTonghopToannganhComponent,
    LoaiBcLinhvucTwComponent
  ]
})
export class QlBaocaoTtktTwModule { }
