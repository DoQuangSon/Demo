import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhmucCoquanBhxhComponent } from './danhmuc-coquan-bhxh/danhmuc-coquan-bhxh.component';
import { DanhmucLyDoKhongThuLyTcComponent } from './danhmuc-lydo-khong-thuly-tc/danhmuc-lydo-khong-thuly-tc.component';
import {DanhmucPhongBanComponent} from './danhmuc-phong-ban/danhmuc-phong-ban.component';
import { DanhMucDonViNghiepVuComponent } from './danh-muc-don-vi-nghiep-vu/danh-muc-don-vi-nghiep-vu.component';
import { DanhmucHanhviComponent } from './danhmuc-hanhvi/danhmuc-hanhvi.component';
import { DanhmucVbCancuXuphatComponent } from './danhmuc-vb-cancu-xuphat/danhmuc-vb-cancu-xuphat.component';
import { DanhmucTinhhuyenComponent } from './danhmuc-tinhhuyen/danhmuc-tinhhuyen.component';
import { DanhmucTinhtrangTailieuComponent } from './danhmuc-tinhtrang-tailieu/danhmuc-tinhtrang-tailieu.component';
import { DanhmucPhanloaiNoidungComponent } from './danhmuc-phanloai-noidung/danhmuc-phanloai-noidung.component';
import { DanhmucPhanloaiTieuthucComponent } from './danhmuc-phanloai-tieuthuc/danhmuc-phanloai-tieuthuc.component';
import { DanhmucMaudonComponent } from './danhmuc-maudon/danhmuc-maudon.component';
import { DanhmucTuchoiTiepcdComponent } from './danhmuc-tuchoi-tiepcd/danhmuc-tuchoi-tiepcd.component';
import { DanhmucChutriPhoihopComponent } from './danhmuc-chutri-phoihop/danhmuc-chutri-phoihop.component';
import { DanhmucChucdanhComponent } from './danhmuc-chucdanh/danhmuc-chucdanh.component';
import { DanhmucNoidungTtktComponent } from './danhmuc-noidung-ttkt/danhmuc-noidung-ttkt.component';
import { DanhmucPhanloaiDtComponent } from './danhmuc-phanloai-dt/danhmuc-phanloai-dt.component';
import { DanhmucCanCuComponent } from './danhmuc-can-cu/danhmuc-can-cu.component';
import { DanhmucChitietNoidungComponent } from './danhmuc-chitiet-noidung/danhmuc-chitiet-noidung.component';


const routes: Routes = [
    {
        path: 'tinh',
        children: [
            {
                path: 'danh-muc-co-quan-bhxh',
                component: DanhmucCoquanBhxhComponent
            },
            {
                path: 'danh-muc-tinh-huyen',
                component: DanhmucTinhhuyenComponent
            },
            {
                path: 'danh-muc-tinh-trang-tai-lieu',
                component: DanhmucTinhtrangTailieuComponent
            },
            {
                path: 'danh-muc-phan-loai-noi-dung',
                component: DanhmucPhanloaiNoidungComponent
            },
            {
                path: 'danh-muc-phan-loai-tieu-thuc',
                component: DanhmucPhanloaiTieuthucComponent
            },
            {
                path: 'danh-muc-mau-don',
                component: DanhmucMaudonComponent
            },
            {
                path: 'danh-muc-tu-choi-tiep-cong-dan',
                component: DanhmucTuchoiTiepcdComponent
            },
            {
                path: 'danh-muc-chu-tri-phoi-hop',
                component: DanhmucChutriPhoihopComponent
            },
            {
                path: 'danh-muc-chuc-danh',
                component: DanhmucChucdanhComponent
            },
            {
                path: 'danh-muc-ly-do-khong-thu-ly-tc',
                component: DanhmucLyDoKhongThuLyTcComponent
            },
            {
                path: 'danh-muc-noi-dung-ttkt',
                component: DanhmucNoidungTtktComponent
            },
            {
                path: 'danh-muc-phan-loai-dt',
                component: DanhmucPhanloaiDtComponent
            },
            {
                path: 'danh-muc-chi-tiet-noi-dung',
                component: DanhmucChitietNoidungComponent
            },
            {
                path: 'danh-muc-can-cu',
                component: DanhmucCanCuComponent
            },
            {
                path: 'danh-muc-don-vi-nghiep-vu',
                component: DanhMucDonViNghiepVuComponent
            },
            {
                path: 'danhmuc-hanhvi',
                component: DanhmucHanhviComponent,
            },
            {
                path: 'danhmuc-vb-cancu-xuphat',
                component: DanhmucVbCancuXuphatComponent,
            }
        ]
    },
    {
        path: 'tw',
        children: [
            {
                path: 'danh-muc-tinh-huyen',
                component: DanhmucTinhhuyenComponent
            },
            {
                path: 'danh-muc-co-quan-bhxh',
                component: DanhmucCoquanBhxhComponent
            },
            {
                path: 'danh-muc-tinh-trang-tai-lieu',
                component: DanhmucTinhtrangTailieuComponent
            },
            {
                path: 'danh-muc-phan-loai-noi-dung',
                component: DanhmucPhanloaiNoidungComponent
            },
            {
                path: 'danh-muc-phan-loai-tieu-thuc',
                component: DanhmucPhanloaiTieuthucComponent
            },
            {
                path: 'danh-muc-mau-don',
                component: DanhmucMaudonComponent
            },
            {
                path: 'danh-muc-tu-choi-tiep-cong-dan',
                component: DanhmucTuchoiTiepcdComponent
            },
            {
                path: 'danh-muc-chu-tri-phoi-hop',
                component: DanhmucChutriPhoihopComponent
            },
            {
                path: 'danh-muc-chuc-danh',
                component: DanhmucChucdanhComponent
            },
            {
                path: 'danh-muc-ly-do-khong-thu-ly-tc',
                component: DanhmucLyDoKhongThuLyTcComponent
            },
            {
                path: 'danh-muc-noi-dung-ttkt',
                component: DanhmucNoidungTtktComponent
            },
            {
                path: 'danh-muc-phan-loai-dt',
                component: DanhmucPhanloaiDtComponent
            },
            {
                path: 'danh-muc-chi-tiet-noi-dung',
                component: DanhmucChitietNoidungComponent
            },
            {
                path: 'danh-muc-can-cu',
                component: DanhmucCanCuComponent
            },
            {
              path: 'danh-muc-phong-ban',
              component: DanhmucPhongBanComponent
            },
            {
                path: 'danh-muc-don-vi-nghiep-vu',
                component: DanhMucDonViNghiepVuComponent
            },
            {
                path: 'danhmuc-hanhvi',
                component: DanhmucHanhviComponent,
            },
            {
                path: 'danhmuc-vb-cancu-xuphat',
                component: DanhmucVbCancuXuphatComponent,
            }

        ]
    }
];

export const DanhMucHeThongRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
