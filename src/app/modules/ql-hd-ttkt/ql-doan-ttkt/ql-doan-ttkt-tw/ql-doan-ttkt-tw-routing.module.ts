import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tl-doan-ttkt-tw'
  },
  {
    path: 'tl-doan-ttkt-tw',
    loadChildren: './tl-doan-ttkt-tw/tl-doan-ttkt-tw.module#TlDoanTTKTTwModule',
    data: {
      preload: true
    }
  },
  {
    path: 'tien-hanh-ttkt-tw',
    loadChildren: './tienhanh-ttkt-tw/tienhanh-ttkt-tw.module#TienhanhTTKTTwModule',
    data: {
      preload: true
    }
  },
  {
    path: 'ket-thuc-ttkt-tw',
    loadChildren: './ketthuc-ttkt-tw/ketthuc-ttkt-tw.module#KetthucTtktTwModule',
    data: {
      preload: true
    }
  },
];
export const QLDoanTTKTTWRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
