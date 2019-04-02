import { TaoMoiDoanTtktTwComponent } from './tao-moi-doan-ttkt-tw/tao-moi-doan-ttkt-tw.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TlDoanTtktTwComponent } from './tl-doan-ttkt-tw.component';
import { ChiTietDoanTtktTwComponent } from './chi-tiet-doan-ttkt-tw/chi-tiet-doan-ttkt-tw.component';
import { EditThanhLapDoanComponent } from '../../../ql-hd-ttkt-shared/component/tl-doan-ttkt-form/edit-thanh-lap-doan/edit-thanh-lap-doan.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TlDoanTtktTwComponent
      },
      {
        path: 'tao-moi',
        component: TaoMoiDoanTtktTwComponent
      },
      {
        path: 'chi-tiet/:index',
        // component: TaoMoiDoanTtktTwComponent
        component: ChiTietDoanTtktTwComponent
      },
      {
        path: 'chinh-sua/:index',
        component: EditThanhLapDoanComponent
      }
    ]
  }
];
export const TlDoanTTKTTWRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
