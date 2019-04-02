import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhSachSoTheodoiTTKTComponent } from '../sotheodoi-ketluan-ttkt-tinh/danhsach-sotheodoi-ttkt/danhsach-sotheodoi-ttkt.component';
import { CapNhatSoTheoDoiComponent } from '../sotheodoi-ketluan-ttkt-tinh/capnhat-sotheodoi/capnhat-sotheodoi.component';


const routes: Routes = [
  {
    path: 'danhsach-sotheodoi-ttkt',
    children: [
      {
        path: '',
        component: DanhSachSoTheodoiTTKTComponent
      },
      {
        path: 'chitiet/:id/:hasKetLuan/:tenDoan',
        component: CapNhatSoTheoDoiComponent
      },
    ]
  },
];
export const SoTheodoiKLTTKTTINHRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
