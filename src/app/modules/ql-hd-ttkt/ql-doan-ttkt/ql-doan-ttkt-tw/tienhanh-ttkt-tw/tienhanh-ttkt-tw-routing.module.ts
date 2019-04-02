import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TienhanhTtktTwComponent } from './tienhanh-ttkt-tw.component';
import { CongboQdTwComponent } from './congbo-qd-tw/congbo-qd-tw.component';
import { TheodoiHdDoanTtktTwComponent } from './theodoi-hd-doan-ttkt-tw/theodoi-hd-doan-ttkt-tw.component';
import { ChitietHdDonviTwComponent } from './chitiet-hd-donvi-tw/chitiet-hd-donvi-tw.component';
import { KetquaTtktComponent } from './ketqua-ttkt/ketqua-ttkt.component';
import { VphcTtktTwComponent } from './vphc-ttkt-tw/vphc-ttkt-tw.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TienhanhTtktTwComponent,
        // data: { breadcrumb: 'DANH SÁCH ĐOÀN THANH TRA KIỂM TRA' }
      },
      {
        path: 'congbo-qd-ttkt-tw/:id',
        component: CongboQdTwComponent,
        // data: { breadcrumb: 'CÔNG BỐ QUYẾT ĐỊNH TTKT' }
      },
      {
        path: 'theodoi-hd-ttkt/:id',
        children: [
          {
            path: '',
            component: TheodoiHdDoanTtktTwComponent
          },
          {
            path: 'chitiet-hoatdong-donvi/:id',
            children: [
              {
                path: '',
                component: ChitietHdDonviTwComponent,
              },
              {
                path: 'bien-ban-vphc',
                component: VphcTtktTwComponent
              },
              {
                path: 'quyet-dinh-vphc',
                component: VphcTtktTwComponent
              }
            ]
          },
          {
            path: 'bao-cao-ket-qua',
            component: KetquaTtktComponent
          },
          {
            path: 'ket-luan-ttkt',
            component: KetquaTtktComponent
          }
        ]
      }
    ]
  },
];
export const TienhanhTTKTTwRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
