import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tinh',
    loadChildren: './ql-baocao-ttkt-tinh/ql-baocao-ttkt-tinh.module#QlBaocaoTtktTinhModule',
    data: {
      preload: true
    }
  },
  {
    path: 'tw',
    loadChildren: './ql-baocao-ttkt-tw/ql-baocao-ttkt-tw.module#QlBaocaoTtktTwModule',
    data: {
      preload: true
    }
  }
];

export const QLBaoCaoTTKTRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
