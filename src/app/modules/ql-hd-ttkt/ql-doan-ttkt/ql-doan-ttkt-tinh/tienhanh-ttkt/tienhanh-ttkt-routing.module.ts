import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChiTietQDCongBoComponent } from './chitiet-qd-congbo/chitiet-qd-congbo.component';
import { TienHanhTTKTComponent } from './tienhanh-ttkt.component';
import { CongBoQDComponent } from './congbo-qd/congbo-qd.component';
import { ChitietHdDonviTinhComponent } from './chitiet-hd-donvi-tinh/chitiet-hd-donvi-tinh.component';
import { TheodoiHdDoanTtktTinhComponent } from './theodoi-hd-doan-ttkt-tinh/theodoi-hd-doan-ttkt-tinh.component';
import { BaocaoKlTtktTinhComponent } from './baocao-kl-ttkt-tinh/baocao-kl-ttkt-tinh.component';
import { VphcTtktTinhComponent } from './vphc-ttkt-tinh/vphc-ttkt-tinh.component';
import { KetquaTtktComponent } from '../../ql-doan-ttkt-tw/tienhanh-ttkt-tw/ketqua-ttkt/ketqua-ttkt.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TienHanhTTKTComponent
      },
      {
        path: 'chitiet-qd-congbo-ttkt',
        component: ChiTietQDCongBoComponent
      },
      {
        path: 'congbo-qd-ttkt/:id',
        component: CongBoQDComponent
      },
      {
        path: 'theodoi-hd-ttkt/:id',
        children: [
          {
            path: '',
            component: TheodoiHdDoanTtktTinhComponent,
          },
          {
            path: 'chitiet-hoatdong-donvi/:id',
            children: [
              {
                path: '',
                component: ChitietHdDonviTinhComponent
              },
              {
                path: 'bien-ban-vphc',
                component: VphcTtktTinhComponent
              },
              {
                path: 'quyet-dinh-vphc',
                component: VphcTtktTinhComponent
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
  }
];
export const TienHanhTTKTRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
