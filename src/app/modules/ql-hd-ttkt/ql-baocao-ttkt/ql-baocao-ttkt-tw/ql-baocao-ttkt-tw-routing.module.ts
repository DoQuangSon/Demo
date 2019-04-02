import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoTheoDoiChiTietComponent } from './so-theo-doi-chi-tiet/so-theo-doi-chi-tiet.component';
import { SoTongHopKetQuaComponent } from './so-tong-hop-ket-qua/so-tong-hop-ket-qua.component';
import { BaoCaoKetQuaToanNganhComponent } from './bao-cao-ket-qua-toan-nganh/bao-cao-ket-qua-toan-nganh.component';
import { BaoCaoTongHopToanNganhComponent } from './bao-cao-tong-hop-toan-nganh/bao-cao-tong-hop-toan-nganh.component';
import { DsSoTheodoiDonviTwComponent } from './so-theo-doi-chi-tiet/ds-so-theodoi-donvi-tw/ds-so-theodoi-donvi-tw.component';
import { ChitietSoTheodoiDonviTwComponent } from './so-theo-doi-chi-tiet/chitiet-so-theodoi-donvi-tw/chitiet-so-theodoi-donvi-tw.component';
import { BaoCaoKqChoDuyetComponent } from './bao-cao-ket-qua-toan-nganh/bao-cao-kq-cho-duyet/bao-cao-kq-cho-duyet.component';
import { DetailBckqNganhComponent } from './bao-cao-ket-qua-toan-nganh/detail-bckq-nganh/detail-bckq-nganh.component';
import { ChitietSoTonghopKqTwComponent } from './so-tong-hop-ket-qua/chitiet-so-tonghop-kq-tw/chitiet-so-tonghop-kq-tw.component';
import { TaomoiSoTonghopKqTwComponent } from './so-tong-hop-ket-qua/taomoi-so-tonghop-kq-tw/taomoi-so-tonghop-kq-tw.component';
import { TaomoiBcTonghopToannganhComponent } from './bao-cao-tong-hop-toan-nganh/taomoi-bc-tonghop-toannganh/taomoi-bc-tonghop-toannganh.component';
import { ChitietBcTonghopToannganhComponent } from './bao-cao-tong-hop-toan-nganh/chitiet-bc-tonghop-toannganh/chitiet-bc-tonghop-toannganh.component';
import { BaoCaoTongHopComponent } from '../../ql-hd-ttkt-shared/bao-cao-tong-hop/bao-cao-tong-hop.component';
import { ChitietBaoCaoTongHopTwComponent } from '../../ql-hd-ttkt-shared/bao-cao-tong-hop/chitiet-bao-cao-tong-hop-tw/chitiet-bao-cao-tong-hop-tw.component';
import { TaomoiBaoCaoTongHopTwComponent } from '../../ql-hd-ttkt-shared/bao-cao-tong-hop/taomoi-bao-cao-tong-hop-tw/taomoi-bao-cao-tong-hop-tw.component';
import { SoTonghopKqLiveComponent } from '../../ql-hd-ttkt-shared/component/baocao-ttkt-form/so-tonghop-kq-form/so-tonghop-kq-live/so-tonghop-kq-live.component';


const routes: Routes = [
  {
    path: 'so-theo-doi-chi-tiet',
    children: [
      {
        path: '',
        component: SoTheoDoiChiTietComponent
      },
      {
        path: 'ds-so-theodoi-dv/:id',
        children: [
          {
            path: '',
            component: DsSoTheodoiDonviTwComponent
          },
          {
            path: 'chitiet-so-theodoi-dv/:id',
            component: ChitietSoTheodoiDonviTwComponent
          }
        ]
      }
    ]
  },
  {
    path: 'so-tong-hop-kq',
    children: [
      {
        path: '',
        // component: ChitietSoTonghopKqTwComponent
        component: SoTongHopKetQuaComponent
      },
      {
        path: 'chitiet-so-tonghop-kq/live',
        component: SoTonghopKqLiveComponent
      },
      {
        path: 'chitiet-so-tonghop-kq/:id',
        component: ChitietSoTonghopKqTwComponent
      },
      {
        path: 'taomoi-so-tonghop-kq',
        component: TaomoiSoTonghopKqTwComponent
      },
      
    ]
  },
  {
    path: 'bao-cao-tong-hop',
    children: [
      {
        path: '',
        component: BaoCaoTongHopComponent,
      },
      {
        path: 'chitiet/:id',
        component: ChitietBaoCaoTongHopTwComponent
      },
      {
        path: 'taomoi',
        component: TaomoiBaoCaoTongHopTwComponent
      },
    ]
  },
  {
    path: 'bao-cao-kq-nganh',
    children: [
      {
        path: '',
        component: BaoCaoKetQuaToanNganhComponent
      },
      {
        path: 'bc-kq-cho-duyet',
        component: BaoCaoKqChoDuyetComponent
      },
      {
        path: 'detail-bckq-nganh/:id',
        component: DetailBckqNganhComponent
      }
    ]
  },
  {
    path: 'bao-cao-tonghop-nganh',
    children: [
      {
        path: '',
        component: BaoCaoTongHopToanNganhComponent,
      },
      {
        path: 'chitiet/:id',
        component: ChitietBcTonghopToannganhComponent
      },
      {
        path: 'taomoi',
        component: TaomoiBcTonghopToannganhComponent
      },
    ]
  }
];

export const QLBaocaoTTKTTwRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
