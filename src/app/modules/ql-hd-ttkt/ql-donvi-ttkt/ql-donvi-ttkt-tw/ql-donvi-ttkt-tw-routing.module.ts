import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QLDonViTTKTTWComponent } from './ql-donvi-ttkt-tw.component';
import { ChitietDsDonviQlComponent } from './chitiet-ds-donvi-ql/chitiet-ds-donvi-ql.component';

const routes: Routes = [
  {
    path: 'ds-tinh',
    children: [
      {
        path: '',
        component: QLDonViTTKTTWComponent
      },
      {
        path: 'chitiet-tinh/:id',
        component: ChitietDsDonviQlComponent
      }
    ]
  },
];
export const QlDonviTTKTTWRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
