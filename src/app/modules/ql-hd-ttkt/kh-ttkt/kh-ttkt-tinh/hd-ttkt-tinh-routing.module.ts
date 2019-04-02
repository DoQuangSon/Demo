import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KHBHXHTinhComponent } from './kh-bhxh-tinh/kh-bhxh-tinh.component';
import { CreateKHBHXHTinhComponent } from './kh-bhxh-tinh/create-kh-bhxh-tinh/create-kh-bhxh-tinh.component';
import { DetailKHBHXHTinhComponent } from './kh-bhxh-tinh/detail-kh-bhxh-tinh/detail-kh-bhxh-tinh.component';
import { EditKHBHXHTinhComponent } from './kh-bhxh-tinh/edit-kh-bhxh-tinh/edit-kh-bhxh-tinh.component';
import { CapNhatKHBHXHTinhComponent } from './kh-bhxh-tinh/capnhat-kh-bhxh-tinh/capnhat-kh-bhxh-tinh.component';
import { XayDungKeHoachTinhComponent } from './xay-dung-ke-hoach-tinh/xay-dung-ke-hoach-tinh.component';
import { ChiTietKeHoachTinhComponent } from './xay-dung-ke-hoach-tinh/chi-tiet-ke-hoach-tinh/chi-tiet-ke-hoach-tinh.component';
import { TaoKeHoachTinhComponent } from './xay-dung-ke-hoach-tinh/tao-ke-hoach-tinh/tao-ke-hoach-tinh.component';
import { KhBhxhVnTinhComponent } from './kh-bhxh-vn-tinh/kh-bhxh-vn-tinh.component';
import { ChitietKhBhxhVnTinhComponent } from './kh-bhxh-vn-tinh/chitiet-kh-bhxh-vn-tinh/chitiet-kh-bhxh-vn-tinh.component';
import { DsDonviQlTinhComponent } from './xay-dung-ke-hoach-tinh/ds-donvi-ql-tinh/ds-donvi-ql-tinh.component';
import { DsDonviQlTinhtpComponent } from './kh-bhxh-tinh/ds-donvi-ql-tinhtp/ds-donvi-ql-tinhtp.component';
import { TuchoiDieuchinhKhbhxhComponent } from './kh-bhxh-vn-tinh/tuchoi-dieuchinh-khbhxh/tuchoi-dieuchinh-khbhxh.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'xay-dung-ke-hoach',
        pathMatch: 'full'
      },
      {
        path: 'xay-dung-ke-hoach',
        children: [
          {
            path: '',
            component: XayDungKeHoachTinhComponent
          },
          {
            path: 'chi-tiet-ke-hoach/:id',
            component: ChiTietKeHoachTinhComponent
          },
          {
            path: 'chi-tiet-ke-hoach/:id/dieu-chinh',
            component: TaoKeHoachTinhComponent
          },
          {
            path: 'tao-ke-hoach',
            component: TaoKeHoachTinhComponent
          },
        ]
      },
      {
        path: 'ds-donvi-ql-tinh',
        component: DsDonviQlTinhComponent
      }
    ]
  },
  {
    path: 'kh-bhxh-vn',
    children: [
      {
        path: '',
        component: KhBhxhVnTinhComponent
      },
      {
        path: 'chitiet/:id',
        component: ChitietKhBhxhVnTinhComponent
      },
      {
        path: 'tu-choi-dieu-chinh',
        component: TuchoiDieuchinhKhbhxhComponent
      }
    ]
  },
  {
    path: 'kh-bhxh-tinh',
    children: [
      {
        path: '',
        component: KHBHXHTinhComponent
      },
      {
        path: 'create-kh-bhxh-tinh',
        component: CreateKHBHXHTinhComponent
      },
      {
        path: 'detail-kh-bhxh-tinh/:id',
        component: DetailKHBHXHTinhComponent
      },
      {
        path: 'edit-kh-bhxh-tinh/:id/:type',
        component: EditKHBHXHTinhComponent
      },
      {
        path: 'capnhat-kh-bhxh-tinh/:id',
        component: CapNhatKHBHXHTinhComponent
      },
      {
        path: 'ds-donvi-ql-tinh/tp',
        component: DsDonviQlTinhtpComponent
      }
    ]
  }
];
export const KHTTKTTINHRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
