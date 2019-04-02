import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TienHanhTiepCdComponent } from '../tiep-cd/tc-tiep-cd/tien-hanh-tiep-cd/tien-hanh-tiep-cd.component';
import { TcTiepCdComponent } from './tc-tiep-cd/tc-tiep-cd.component';
import { LichTiepCdComponent } from './lich-tiep-cd/lich-tiep-cd.component';
import { LsTiepCdComponent } from '../ls-tiep-cd/ls-tiep-cd.component';
import { ChitietLsTiepCdComponent } from '../ls-tiep-cd/chitiet-ls-tiep-cd/chitiet-ls-tiep-cd.component';
import { DtTiepCdComponent } from './dt-tiep-cd/dt-tiep-cd.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'lich-tiep-cong-dan',
      },
      {
        path: 'lich-tiep-cong-dan',
        component: LichTiepCdComponent
      },
      {
        path: 'tiep-cong-dan',
        children: [
          {
            path: '',
            component: TcTiepCdComponent
          },
          {
            path: 'tien-hanh-tiep-cd',
            component: TienHanhTiepCdComponent,
          }
        ]
      },
      {
        path: 'ls-tiep-cd',
        children: [
          {
            path: '',
            component: LsTiepCdComponent
          },
          {
            path: 'chi-tiet/:id',
            component: ChitietLsTiepCdComponent
          }
        ]
      },
      {
        path: 'dt-tiep-cd',
        component: DtTiepCdComponent,
      }

    ]
  },
];

export const TiepCdRouting: ModuleWithProviders = RouterModule.forChild(routes);
