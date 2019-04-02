import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoTheodoiChitietTinhComponent } from './so-theodoi-chitiet-tinh/so-theodoi-chitiet-tinh.component';
import { DsSoTheodoiDonviComponent } from './so-theodoi-chitiet-tinh/ds-so-theodoi-donvi/ds-so-theodoi-donvi.component';
import { ChitietSoTheodoiDonviComponent } from './so-theodoi-chitiet-tinh/chitiet-so-theodoi-donvi/chitiet-so-theodoi-donvi.component';
import { SoTonghopKqTinhComponent } from './so-tonghop-kq-tinh/so-tonghop-kq-tinh.component';
import { BcTonghopTinhComponent } from './bc-tonghop-tinh/bc-tonghop-tinh.component';
import { ChitietSoTonghopKqComponent } from './so-tonghop-kq-tinh/chitiet-so-tonghop-kq/chitiet-so-tonghop-kq.component';
import { TaomoiSoTonghopKqComponent } from './so-tonghop-kq-tinh/taomoi-so-tonghop-kq/taomoi-so-tonghop-kq.component';
import { ChitietBcTonghopTinhComponent } from './bc-tonghop-tinh/chitiet-bc-tonghop-tinh/chitiet-bc-tonghop-tinh.component';
import { TaomoiBcTonghopTinhComponent } from './bc-tonghop-tinh/taomoi-bc-tonghop-tinh/taomoi-bc-tonghop-tinh.component';
import { TaomoiBcLinhvucTinhComponent } from './bc-tonghop-tinh/taomoi-bc-linhvuc-tinh/taomoi-bc-linhvuc-tinh.component';
import { TaomoiBcTonghopKqTwComponent } from '../../../ql-tiep-cd/ql-sosach-bc/ql-sosach-bc-tw/bc-tonghop-kq-tw/taomoi-bc-tonghop-kq-tw/taomoi-bc-tonghop-kq-tw.component';
import { ChitietBaoCaoTongHopTwComponent } from '../../ql-hd-ttkt-shared/bao-cao-tong-hop/chitiet-bao-cao-tong-hop-tw/chitiet-bao-cao-tong-hop-tw.component';
import { TaomoiBaoCaoTongHopTwComponent } from '../../ql-hd-ttkt-shared/bao-cao-tong-hop/taomoi-bao-cao-tong-hop-tw/taomoi-bao-cao-tong-hop-tw.component';
import { BaoCaoTongHopComponent } from '../../ql-hd-ttkt-shared/bao-cao-tong-hop/bao-cao-tong-hop.component';
import { SoTonghopKqLiveComponent } from '../../ql-hd-ttkt-shared/component/baocao-ttkt-form/so-tonghop-kq-form/so-tonghop-kq-live/so-tonghop-kq-live.component';

const routes: Routes = [
  {
    path: 'so-theodoi-chitiet',
    children: [
      {
        path: '',
        component: SoTheodoiChitietTinhComponent
      },
      {
        path: 'ds-so-theodoi-dv/:id',
        children: [
          {
            path: '',
            component: DsSoTheodoiDonviComponent
          },
          {
            path: 'chitiet-so-theodoi-dv/:id',
            component: ChitietSoTheodoiDonviComponent
          }
        ]
      }
    ]
  },
  {
    path: 'so-tonghop-kq',
    children: [
      {
        path: '',
        // component:  ChitietSoTonghopKqComponent
        component: SoTonghopKqTinhComponent
      },
      {
        path: 'chitiet-so-tonghop-kq/live',
        component: SoTonghopKqLiveComponent
      },
      {
        path: 'chitiet-so-tonghop-kq/:id',
        component: ChitietSoTonghopKqComponent
      },
      {
        path: 'taomoi-so-tonghop-kq',
        component: TaomoiSoTonghopKqComponent
      },
    ]
  },
  {
    path: 'bc-tonghop-tinh',
    children: [
      {
        path: '',
        component: BaoCaoTongHopComponent// dung chung vs tw
      },
      {
        path: 'chitiet-bc-tonghop-tinh/:id', // dung chung vs tw
        component: ChitietBaoCaoTongHopTwComponent
      },
      {
        path: 'taomoi-bc-tonghop-tinh',// dung chung vs tw
        component: TaomoiBaoCaoTongHopTwComponent
      },
      {
        path: 'taomoi-bc-linhvuc-tinh',
        component: TaomoiBcLinhvucTinhComponent
      },
    ]
  },

];
export const QLDoanTTKTTINHRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
