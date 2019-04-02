
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KetthucTtktTinhComponent } from './ketthuc-ttkt-tinh.component';
import { BaoCaoTtktTwComponent } from '../../ql-doan-ttkt-tw/ketthuc-ttkt-tw/bao-cao-ttkt-tw/bao-cao-ttkt-tw.component';
import { KetquaTtktComponent } from '../../ql-doan-ttkt-tw/tienhanh-ttkt-tw/ketqua-ttkt/ketqua-ttkt.component';
import { KetthucTtktTwComponent } from '../../ql-doan-ttkt-tw/ketthuc-ttkt-tw/ketthuc-ttkt-tw.component';
import { BaoCaoTtktTinhComponent } from './bao-cao-ttkt-tinh/bao-cao-ttkt-tinh.component';

const routes: Routes = [
  {   
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'ket-thuc'
      },
      {
        path: 'ket-thuc',
        component: KetthucTtktTwComponent
      },
      {
        path: 'bao-cao-ttkt-tinh',
        children: [
          {
            path: '',
            component: BaoCaoTtktTinhComponent,
          },
          {
            path: ':id/bao-cao-ket-qua',
            component: KetquaTtktComponent
          },]
      },
      {
        path: 'ket-luan-ttkt-tinh',
        children: [
          {
            path: '',
            component: BaoCaoTtktTinhComponent,
          },
          {
            path: ':id/ket-luan-ttkt',
            component: KetquaTtktComponent
          }
        ]
      }
    ]
  }
];
export const KTDoanTTKTTINHRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
