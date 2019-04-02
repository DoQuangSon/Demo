import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'qd-ttkt-bhxh-vn',
  },
  {
    path: 'qd-ttkt-bhxh-vn',
    loadChildren: './qd-ttkt-bhxh-vn/qd-ttkt-tinh.module#QdTtktTinhModule',
    data: {
      preload: true
    }
  },
  {
    path: 'tl-doan-ttkt-tinh',
    loadChildren: './tl-doan-ttkt-cap-tinh/tl-doan-ttkt-cap-tinh.module#TlDoanTtktCapTinhModule',
    data: {
      preload: true
    }
  },
  {
    path: 'tienhanh-ttkt',
    loadChildren: './tienhanh-ttkt/tienhanh-ttkt.module#TienHanhTTKTModule',
    data: {
      preload: true
    }
  },
  {
    path: 'ket-thuc-ttkt-tinh',
    loadChildren: './ketthuc-ttkt-tinh/ketthuc-ttkt-tinh.module#KetthucTtktTinhModule',
    data: {
      preload: true
    }
  }
];
export const QLDoanTTKTTINHRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
