import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhSachSoTheodoiTTKTComponent } from '../sotheodoi-ketluan-ttkt-tw/danhsach-sotheodoi-ttkt/danhsach-sotheodoi-ttkt.component';
import { CapNhatSoTheoDoiComponent } from '../sotheodoi-ketluan-ttkt-tw/capnhat-sotheodoi/capnhat-sotheodoi.component';
import { TwTheoDoiTinhComponent } from '../sotheodoi-ketluan-ttkt-tw/tw-theodoi-tinh/tw-theodoi-tinh.component';


const routes: Routes = [
  {
    path: 'ds-sotheodoi-kl',
    children: [
      {
        path: '',
        component: DanhSachSoTheodoiTTKTComponent
      },
      {
        path: 'capnhat/:id/:hasKetLuan/:tenDoan',
        component: CapNhatSoTheoDoiComponent
      },
    ]
  },
  {
    path: 'ds-sotheodoi-tinh',
    children: [
      {
        path: '',
        component: TwTheoDoiTinhComponent
      },
      {
        path: 'chitiet/:id',
        component: CapNhatSoTheoDoiComponent
      },
    ]
  },
];
export const SoTheodoiKLTTKTTWRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
