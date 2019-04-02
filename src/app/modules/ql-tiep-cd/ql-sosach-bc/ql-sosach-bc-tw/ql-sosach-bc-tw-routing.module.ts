import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BcKetquaToannganhComponent } from './bc-ketqua-toannganh/bc-ketqua-toannganh.component';
import { ChitietBckqToannganhComponent } from './bc-ketqua-toannganh/chitiet-bckq-toannganh/chitiet-bckq-toannganh.component';
import { SoTheodoiTiepnhanTwComponent } from './so-theodoi-tiepnhan-tw/so-theodoi-tiepnhan-tw.component';
import { ChitietSoTheodoiTiepnhanTwComponent } from './so-theodoi-tiepnhan-tw/chitiet-so-theodoi-tiepnhan-tw/chitiet-so-theodoi-tiepnhan-tw.component';
import { TaomoiSoTheodoiTiepnhanTwComponent } from './so-theodoi-tiepnhan-tw/taomoi-so-theodoi-tiepnhan-tw/taomoi-so-theodoi-tiepnhan-tw.component';
import { BcTonghopKqTwComponent } from './bc-tonghop-kq-tw/bc-tonghop-kq-tw.component';
import { ChitietBcTonghopKqTwComponent } from './bc-tonghop-kq-tw/chitiet-bc-tonghop-kq-tw/chitiet-bc-tonghop-kq-tw.component';
import { TaomoiBcTonghopKqTwComponent } from './bc-tonghop-kq-tw/taomoi-bc-tonghop-kq-tw/taomoi-bc-tonghop-kq-tw.component';
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
        component: SoTheodoiTiepnhanTwComponent
      },
      {
        path: 'chitiet/live',
        component: ChitietSoTheodoiTiepnhanLiveComponent
      },
      {
        path: 'chitiet/:id',
        component: ChitietSoTheodoiTiepnhanTwComponent
      },
      {
        path: 'taomoi',
        component: TaomoiSoTheodoiTiepnhanTwComponent
      },
    ]
  },
  {
    path: 'so-tonghop-kq',
    children: [
      {
        path: '',
        component: BcTonghopKqTwComponent
      },
      {
        path: 'chitiet/live',
        component: ChitietBcTonghopKqLiveComponent
      },
      {
        path: 'chitiet/:id',
        component: ChitietBcTonghopKqTwComponent
      },
      {
        path: 'taomoi',
        component: TaomoiBcTonghopKqTwComponent
      },
      {
        path: 'chitiet/:id/:year/:month',
        component: ChitietBcTonghopKqTwComponent
      },
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
  {
    path: 'bc-ketqua-toannganh',
    children: [
      {
        path: '',
        component: BcKetquaToannganhComponent
      },
      {
        path: 'chitiet/:id',
        component: ChitietBckqToannganhComponent
      },
      {
          path: 'chitiet/:dmbhxhID/:id',
          component: ChitietBcTonghopKqTwComponent
      },
    ]
  }
];

export const QLSosachBcTWRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
