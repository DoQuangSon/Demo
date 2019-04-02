import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanlyNguoidungComponent } from './quanly-nguoidung/quanly-nguoidung.component';
import { QuanlyNhomnguoidungComponent } from './quanly-nhomnguoidung/quanly-nhomnguoidung.component';
import { PhanloaiDoituongTtktComponent } from './phanloai-doituong-ttkt/phanloai-doituong-ttkt.component';
import { ViewAllNotificationComponent } from '../components/view-all-notification/view-all-notification.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'quanly-nhomnguoidung',
    pathMatch: 'full'
  },
  {
    path: 'quanly-nhomnguoidung',
    component: QuanlyNhomnguoidungComponent
  },
  {
    path: 'quanly-nguoidung',
    component: QuanlyNguoidungComponent
  },
  {
    path: 'phanloai-doituong-ttkt',
    component: PhanloaiDoituongTtktComponent
  },
  {
    path:'view-all-notification',
    component:ViewAllNotificationComponent
  },
  {
    path: '',
    children: [
      {
        path: 'danhmuc-hethong',
        loadChildren: './danhmuc-hethong/danhmuc-hethong.module#DanhMucHeThongModule',
        data: {
          preload: true
        }
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'cauhinh-hethong',
        loadChildren: './cauhinh-hethong/cauhinh-hethong.module#CauHinhHeThongModule',
        data: {
          preload: true
        }
      },
    ]
  }
];

export const QLHeThongTTKTRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
