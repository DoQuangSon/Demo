import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tinh',
    loadChildren: './ql-donvi-ttkt-tinh/ql-donvi-ttkt-tinh.module#QlDonviTtktTinhModule',
    data: {
      preload: true
    }
  },
  {
    path: 'tw',
    loadChildren: './ql-donvi-ttkt-tw/ql-donvi-ttkt-tw.module#QlDonviTtktTwModule',
    data: {
      preload: true
    }
  }
];

export const QLDonViTTKTRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
