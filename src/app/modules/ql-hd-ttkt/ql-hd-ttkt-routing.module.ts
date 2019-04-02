import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'kh-ttkt'
      },
      {
        path: 'kh-ttkt',
        loadChildren: './kh-ttkt/kh-ttkt.module#KHTTKTModule',
        data: {
          preload: true
        }
      },
      {
        path: 'ql-doan-ttkt',
        loadChildren: './ql-doan-ttkt/ql-doan-ttkt.module#QLDoanTTKTModule',
        data: {
          preload: true
        }
      },
      {
        path: 'ql-baocao-ttkt',
        loadChildren: './ql-baocao-ttkt/ql-baocao-ttkt.module#QLBaoCaoTTKTModule',
        data: {
          preload: true
        }
      },
      {
        path: 'ql-donvi-ttkt',
        loadChildren: './ql-donvi-ttkt/ql-donvi-ttkt.module#QlDonviTtktModule',
        data: {
          preload: true
        }
      },
      {
        path: 'ql-sotheodoi-ketluan-ttkt',
        loadChildren: './sotheodoi-ketluan-ttkt/sotheodoi-ketluan-ttkt.module#SoTheoDoiKetLuanModule',
        data: {
          preload: true
        }
      }
    ]
  }
];

export const QLHDTTKTRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
