import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tinh',
    loadChildren: './sotheodoi-ketluan-ttkt-tinh/sotheodoi-ketluan-ttkt-tinh.module#SoTheodoiKLTtktTinhMudule',
    data: {
      preload: true
    }
  },
  {
    path: 'tw',
    loadChildren: './sotheodoi-ketluan-ttkt-tw/sotheodoi-ketluan-ttkt-tw.module#SoTheodoiKLTtktTwMudule',
    data: {
      preload: true
    }
  }
];

export const SoTheoDoiKLTTKTRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
