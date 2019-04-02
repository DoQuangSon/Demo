import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoTheodoiTiepnhanComponent } from './so-theodoi-tiepnhan/so-theodoi-tiepnhan.component';
import { BcTonghopKqComponent } from './bc-tonghop-kq/bc-tonghop-kq.component';
import { ChitietBcTonghopKqComponent } from './bc-tonghop-kq/chitiet-bc-tonghop-kq/chitiet-bc-tonghop-kq.component';
import { TaomoiBcTonghopKqComponent } from './bc-tonghop-kq/taomoi-bc-tonghop-kq/taomoi-bc-tonghop-kq.component';
import { ChitietSoTheodoiTiepnhanTinhComponent } from './so-theodoi-tiepnhan/chitiet-so-theodoi-tiepnhan-tinh/chitiet-so-theodoi-tiepnhan-tinh.component';
import { TaomoiSoTheodoiTiepnhanTinhComponent } from './so-theodoi-tiepnhan/taomoi-so-theodoi-tiepnhan-tinh/taomoi-so-theodoi-tiepnhan-tinh.component';
import { ChitietBcTonghopKqLiveComponent } from '../../ql-tiep-cd-shared/chitiet-bc-tonghop-kq-live/chitiet-bc-tonghop-kq-live.component';
import { ChitietSoTheodoiTiepnhanLiveComponent } from '../../ql-tiep-cd-shared/chitiet-so-theodoi-tiepnhan-live/chitiet-so-theodoi-tiepnhan-live.component';
import { SoTheodoiTiepCdComponent } from '../../ql-tiep-cd-shared/so-theodoi-tiep-cd/so-theodoi-tiep-cd.component';
import { ChiTietSoTheodoiTiepCdComponent } from '../../ql-tiep-cd-shared/chi-tiet-so-theodoi-tiep-cd/chi-tiet-so-theodoi-tiep-cd.component';
import { ChiTietSoTheodoiTiepCdLiveComponent } from '../../ql-tiep-cd-shared/chi-tiet-so-theodoi-tiep-cd-live/chi-tiet-so-theodoi-tiep-cd-live.component';

const routes: Routes = [
  {
    path: 'so-theodoi-tiepnhan',
    children: [
      {
        path: '',
        component: SoTheodoiTiepnhanComponent
      },
      {
        path: 'chitiet/live',
        component: ChitietSoTheodoiTiepnhanLiveComponent
      },
      {
        path: 'chitiet/:id',
        component: ChitietSoTheodoiTiepnhanTinhComponent
      },
      {
        path: 'taomoi',
        component: TaomoiSoTheodoiTiepnhanTinhComponent
      },
    ]
  },
  {
    path: 'so-tonghop-kq',
    children: [
      {
        path: '',
        component: BcTonghopKqComponent
      },
      {
        path: 'chitiet/live',
        component: ChitietBcTonghopKqLiveComponent
      },
      {
        path: 'chitiet/:id/:daGuiTinh',
        component: ChitietBcTonghopKqComponent
      },
      {
        path: 'taomoi',
        component: TaomoiBcTonghopKqComponent
      },
      {
        path: 'chitiet/:id/:year/:month/:daGuiTinh',
        component: ChitietBcTonghopKqComponent
      }
    ]
  },
  {
    path: 'so-theodoi-tiep-cd',
    children: [
      {
        path: '',
        component: SoTheodoiTiepCdComponent
      },
      {
        path: 'chitiet/live',
        component: ChiTietSoTheodoiTiepCdLiveComponent
      },
      {
        path: 'chitiet/:id',
        component: ChiTietSoTheodoiTiepCdComponent
      },
      // {
      //   path: 'taomoi',
      //   component: TaomoiBcTonghopKqTwComponent
      // },
      // {
      //   path: 'chitiet/:id/:year/:month',
      //   component: ChitietBcTonghopKqTwComponent
      // },
    ]
  },
];

export const QLSosachBcTINHRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
