import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KeHoachBhxhTinhComponent } from './ke-hoach-bhxh-tinh/ke-hoach-bhxh-tinh.component';
import { XayDungKeHoachTrungUongComponent } from './xay-dung-ke-hoach-trung-uong/xay-dung-ke-hoach-trung-uong.component';
import { KeHoachChiTietComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-chi-tiet/ke-hoach-chi-tiet.component';
import { GiaoKeHoachChoCacTinhComponent } from './xay-dung-ke-hoach-trung-uong/giao-ke-hoach-cho-cac-tinh/giao-ke-hoach-cho-cac-tinh.component';
import { KeHoachBhxhVnComponent } from './ke-hoach-bhxh-vn/ke-hoach-bhxh-vn.component';
import { TaoKeHoachTWComponent } from './ke-hoach-bhxh-vn/tao-ke-hoach/tao-ke-hoach.component';
import { KeHoachChiTietBhxhvnComponent } from './ke-hoach-bhxh-vn/ke-hoach-chi-tiet-bhxhvn/ke-hoach-chi-tiet-bhxhvn.component';
import { DieuChinhComponent } from './ke-hoach-bhxh-vn/ke-hoach-chi-tiet-bhxhvn/dieu-chinh/dieu-chinh.component';
import { DanhSachTinhComponent } from './ke-hoach-bhxh-vn/danh-sach-tinh/danh-sach-tinh.component';
import { KeHoachChoDuyetComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-cho-duyet/ke-hoach-cho-duyet.component';
import { DsDonviQlComponent } from './ke-hoach-bhxh-tinh/ds-donvi-ql/ds-donvi-ql.component';
import { DsTinhDieuchinhComponent } from './xay-dung-ke-hoach-trung-uong/ds-tinh-dieuchinh/ds-tinh-dieuchinh.component';
import { ChitietDsDonviComponent } from './ke-hoach-bhxh-vn/chitiet-ds-donvi/chitiet-ds-donvi.component';
import { KeHoachDaGiaoChoTinhComponent } from '../../../ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-da-giao-cho-tinh/ke-hoach-da-giao-cho-tinh.component';
import { KeHoachXinDieuChinhDuocChapNhanComponent } from '../../../ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-xin-dieu-chinh-duoc-chap-nhan/ke-hoach-xin-dieu-chinh-duoc-chap-nhan.component';
import { TaoKhDuThaoBhxhvnComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-du-thao-bhxhvn/tao-kh-du-thao-bhxhvn/tao-kh-du-thao-bhxhvn.component';
import { KeHoachDuThaoBhxhvnComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-du-thao-bhxhvn/ke-hoach-du-thao-bhxhvn.component';
import { ChiTietKeHoachDuThaoBhxhvnComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-du-thao-bhxhvn/chi-tiet-ke-hoach-du-thao-bhxhvn/chi-tiet-ke-hoach-du-thao-bhxhvn.component';
import { EditKhDtComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-du-thao-bhxhvn/edit-kh-dt/edit-kh-dt.component';
import { ChitietKhBhxhVnTinhComponent } from '../kh-ttkt-tinh/kh-bhxh-vn-tinh/chitiet-kh-bhxh-vn-tinh/chitiet-kh-bhxh-vn-tinh.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'ke-hoach-toan-nganh',
        pathMatch: 'full'
      },
      {
        path: 'ke-hoach-toan-nganh',
        children: [
          {
            path: '',
            redirectTo: 'ke-hoach-cho-duyet'
          },
          {
            path: 'ke-hoach-cho-duyet',
            data: { breadcrumb: 'DS kế hoạch chờ duyệt' },
            children: [
              {
                path: '',
                component: KeHoachChoDuyetComponent,
                data: { breadcrumb: false }
              },
              {
                path: 'ke-hoach-chi-tiet/:id',
                component: KeHoachChiTietComponent,
                data: { breadcrumb: 'Chi tiết kế hoạch' }
              }
            ]
          },
          {
            path: 'ds-ke-hoach-da-duyet',
            data: { breadcrumb: 'DS kế hoạch đã duyệt' },
            children: [
              {
                path: '',
                component: XayDungKeHoachTrungUongComponent,
                data: { breadcrumb: false }
              },
              {
                path: 'ke-hoach-chi-tiet/:id',
                component: KeHoachChiTietComponent,
                data: { breadcrumb: 'Chi tiết kế hoạch' }
              },
            ]
          },
          {
            path: 'ke-hoach-du-thao-bhxhvn',
            data: { breadcrumb: 'Kế hoạch dự thảo BHXH VN' },
            children: [
              {
                path: '',
                component: KeHoachDuThaoBhxhvnComponent,
                data: { breadcrumb: false }
              },
              {
                path: 'tao-ke-hoach',
                component: TaoKhDuThaoBhxhvnComponent,
                data: { breadcrumb: 'Tạo kế hoạch' }
              },
              {
                path: 'chi-tiet-ke-hoach/:id',
                component: ChiTietKeHoachDuThaoBhxhvnComponent,
                data: { breadcrumb: 'Chi tiết kế hoạch' }
              },
              {
                path: 'chi-tiet-ke-hoach/edit/:id/:type',
                component: EditKhDtComponent
              },
            ]
          },
        ]
      },
      {
        path: 'ke-hoach-bhxh-vn-giao',
        children: [
          {
            path: '',
            redirectTo: 'giao-ke-hoach-cho-cac-tinh',
            pathMatch: 'full'
          },
          {
            path: 'giao-ke-hoach-cho-cac-tinh',
            data: { breadcrumb: 'DS kế hoạch giao cho các tỉnh' },
            children: [
              {
                path: '',
                component: GiaoKeHoachChoCacTinhComponent,
                data: { breadcrumb: false }
              },
              {
                path: 'ke-hoach-chi-tiet/:id',
                component: KeHoachChiTietComponent,
                data: { breadcrumb: 'Chi tiết kế hoạch' }
              }
            ]
          },
          {
            path: 'giao-ke-hoach-cho-cac-tinh/:year',
            component: GiaoKeHoachChoCacTinhComponent
          },
          {
            path: 'ds-tinh-dieuchinh',
            children:[
              {
                path: '',
                component: DsTinhDieuchinhComponent
              },
              {
                path: 'chitiet/:id',
                component: ChitietKhBhxhVnTinhComponent
              }
            ]
            
          },
          {
            path: 'ke-hoach-da-giao-cho-tinh',
            data: { breadcrumb: 'DS kế hoạch đã giao cho tỉnh' },
            children: [
              {
                path: '',
                component: KeHoachDaGiaoChoTinhComponent,
                data: { breadcrumb: false }
              },
              {
                path: 'ke-hoach-chi-tiet/:id',
                component: KeHoachChiTietComponent,
                data: { breadcrumb: 'Chi tiết kế hoạch' }
              }
            ]
          },
          {
            path: 'ke-hoach-da-giao-cho-tinh/:year',
            component: KeHoachDaGiaoChoTinhComponent
          },
          {
            path: 'ke-hoach-xin-dieu-chinh-duoc-chap-nhan',
            data: { breadcrumb: 'DS kế hoạch xin điều chỉnh được duyệt' },
            children: [
              {
                path: '',
                component: KeHoachXinDieuChinhDuocChapNhanComponent,
                data: { breadcrumb: false },
              },
              {
                path: 'ke-hoach-chi-tiet/:id',
                component: KeHoachChiTietComponent,
                data: { breadcrumb: 'Chi tiết kế hoạch' }
              }
            ]
          },
          {
            path: 'ke-hoach-xin-dieu-chinh-duoc-chap-nhan/:year',
            component: KeHoachXinDieuChinhDuocChapNhanComponent
          }
        ]
      },
      {
        path: 'ke-hoach-bhxh-vn',
        children: [
          {
            path: '',
            component: KeHoachBhxhVnComponent
          },
          {
            path: 'tao-ke-hoach',
            component: TaoKeHoachTWComponent
          },
          {
            path: 'chi-tiet-ke-hoach/:id',
            component: KeHoachChiTietBhxhvnComponent
          },
          {
            path: 'chi-tiet-ke-hoach/dieu-chinh/:id/:type',
            component: DieuChinhComponent
          },
          {
            path: 'danh-sach-tinh',
            component: DanhSachTinhComponent
          },
          {
            path: 'chitiet-donvi/:id',
            component: ChitietDsDonviComponent
          }
        ]
      },
      {
        path: 'ke-hoach-bhxh-tinh',
        children: [
          {
            path: '',
            component: KeHoachBhxhTinhComponent
          },
          {
            path: 'ds-donvi-ql',
            component: DsDonviQlComponent
          }
        ]
      }
    ]
  }
];

export const KHTTKTTWRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
