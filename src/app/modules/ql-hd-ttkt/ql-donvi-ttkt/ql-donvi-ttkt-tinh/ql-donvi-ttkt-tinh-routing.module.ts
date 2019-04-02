import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QLDonViTTKTTinhComponent } from './ql-donvi-ttkt.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ds-donvi',
        component: QLDonViTTKTTinhComponent
      }
    ]
  },
];
export const QlDonviTTKTTINHRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
