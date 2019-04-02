import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CauHinhThamSoHeThongComponent } from './cauhinh-thamso-hethong/cauhinh-thamso-hethong.component';
import { CauHinhCoCauToChucComponent } from './cauhinh-cocau-tochuc/cauhinh-cocau-tochuc.component';
import { CauHinhQuyComponent } from './cauhinh-quy/cauhinh-quy.component';
import { CauHinhNgayNghiComponent } from './cauhinh-ngaynghi/cauhinh-ngaynghi.component';
import { CauHinhCaLamViecComponent } from './cauhinh-calamviec/cauhinh-calamviec.component';
import { CauhinhThoihanComponent } from './cauhinh-thoihan/cauhinh-thoihan.component';

const routes: Routes = [
    {
        path: 'tinh',
        children: [
            {
                path: 'cauhinh-thamso-hethong',
                component: CauHinhThamSoHeThongComponent
            },
            {
                path: 'cauhinh-thoihan',
                component: CauhinhThoihanComponent
            },
            {
                path: 'cauhinh-cocau-tochuc',
                component: CauHinhCoCauToChucComponent
            },
            {
                path: 'cauhinh-quy',
                component: CauHinhQuyComponent
            },
            {
                path: 'cauhinh-ngaynghi',
                component: CauHinhNgayNghiComponent
            },
            {
                path: 'cauhinh-calamviec',
                component: CauHinhCaLamViecComponent
            }
        ]
    },
    {
        path: 'tw',
        children: [
            {
                path: 'cauhinh-thamso-hethong',
                component: CauHinhThamSoHeThongComponent
            },
            {
                path: 'cauhinh-thoihan',
                component: CauhinhThoihanComponent
            },
            {
                path: 'cauhinh-cocau-tochuc',
                component: CauHinhCoCauToChucComponent
            },
            {
                path: 'cauhinh-quy',
                component: CauHinhQuyComponent
            },
            {
                path: 'cauhinh-quy',
                component: CauHinhQuyComponent
            },
            {
                path: 'cauhinh-ngaynghi',
                component: CauHinhNgayNghiComponent
            },
            {
                path: 'cauhinh-calamviec',
                component: CauHinhCaLamViecComponent
            }
        ]
    },
];

export const CauHinhHeThongRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
