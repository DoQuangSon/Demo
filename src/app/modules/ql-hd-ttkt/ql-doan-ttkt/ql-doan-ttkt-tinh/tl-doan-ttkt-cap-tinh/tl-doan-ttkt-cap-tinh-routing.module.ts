import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TlDoanTtktCapTinhComponent } from './tl-doan-ttkt-cap-tinh.component';
import { TaoMoiDoanTtktComponent } from './tao-moi-doan-ttkt/tao-moi-doan-ttkt.component';
import { ChiTietDoanTtktComponent } from './chi-tiet-doan-ttkt/chi-tiet-doan-ttkt.component';
import { EditThanhLapDoanComponent } from '../../../ql-hd-ttkt-shared/component/tl-doan-ttkt-form/edit-thanh-lap-doan/edit-thanh-lap-doan.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TlDoanTtktCapTinhComponent
      },
      {
        path: 'tao-moi',
        component: TaoMoiDoanTtktComponent
      },
      {
        path: 'chi-tiet/:index',
        component: ChiTietDoanTtktComponent
      },
      {
        path: 'chinh-sua/:index',
        component: EditThanhLapDoanComponent
      }
    ]
  }
];
export const TLDOANTTKTCAPTINHRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
