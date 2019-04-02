import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { DanhmucCanCuComponent } from './danhmuc-can-cu/danhmuc-can-cu.component';
import { DanhmucChitietNoidungComponent } from './danhmuc-chitiet-noidung/danhmuc-chitiet-noidung.component';
import { DanhmucChucdanhComponent } from './danhmuc-chucdanh/danhmuc-chucdanh.component';
import { DanhmucChutriPhoihopComponent } from './danhmuc-chutri-phoihop/danhmuc-chutri-phoihop.component';
import { DanhmucCoquanBhxhComponent } from './danhmuc-coquan-bhxh/danhmuc-coquan-bhxh.component';
import { DanhMucHeThongRoutingModule } from './danhmuc-hethong-routing.module';
import { DanhmucLyDoKhongThuLyTcComponent } from './danhmuc-lydo-khong-thuly-tc/danhmuc-lydo-khong-thuly-tc.component';
import { DanhmucMaudonComponent } from './danhmuc-maudon/danhmuc-maudon.component';
import { DanhmucNoidungTtktComponent } from './danhmuc-noidung-ttkt/danhmuc-noidung-ttkt.component';
import { DanhmucPhanloaiDtComponent } from './danhmuc-phanloai-dt/danhmuc-phanloai-dt.component';
import { DanhmucPhanloaiNoidungComponent } from './danhmuc-phanloai-noidung/danhmuc-phanloai-noidung.component';
import { DanhmucPhanloaiTieuthucComponent } from './danhmuc-phanloai-tieuthuc/danhmuc-phanloai-tieuthuc.component';
import { ThemNhomKetLuanComponent } from './danhmuc-phanloai-tieuthuc/them-nhom-ket-luan/them-nhom-ket-luan.component';
import { ThucHienKetLuanComponent } from './danhmuc-phanloai-tieuthuc/thuc-hien-ket-luan/thuc-hien-ket-luan.component';
import { DanhmucPhongBanComponent } from './danhmuc-phong-ban/danhmuc-phong-ban.component';
import { DanhmucTinhhuyenComponent } from './danhmuc-tinhhuyen/danhmuc-tinhhuyen.component';
import { DanhmucTinhtrangTailieuComponent } from './danhmuc-tinhtrang-tailieu/danhmuc-tinhtrang-tailieu.component';
import { DanhmucTuchoiTiepcdComponent } from './danhmuc-tuchoi-tiepcd/danhmuc-tuchoi-tiepcd.component';
import { ChiphikhamchuabenhComponent } from './chiphikhamchuabenh/chiphikhamchuabenh.component';
import { DanhMucDonViNghiepVuComponent } from './danh-muc-don-vi-nghiep-vu/danh-muc-don-vi-nghiep-vu.component';
import { DanhmucHanhviComponent } from './danhmuc-hanhvi/danhmuc-hanhvi.component';
import { DanhmucVbCancuXuphatComponent } from './danhmuc-vb-cancu-xuphat/danhmuc-vb-cancu-xuphat.component';
import { TtktFormModule } from '../../../shared/form-module/ttkt-form.module';
import { DmHanhviService } from '../../../services/api/danh-muc/noi-dmHanhVi/dm-hanhvi.service';
import { DmVbCancuXuphatService } from '../../../services/api/danh-muc/noi-dmVBCanCuXuPhat/dm-vb-cancu-xuphat.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    // ReactiveFormsModule,
    DanhMucHeThongRoutingModule,
    // TtktFormModule
  ],
  declarations: [
    DanhmucCoquanBhxhComponent,
    DanhmucTinhhuyenComponent,
    DanhmucTinhtrangTailieuComponent,
    DanhmucPhanloaiNoidungComponent,
    DanhmucMaudonComponent,
    DanhmucTuchoiTiepcdComponent,
    DanhmucChutriPhoihopComponent,
    DanhmucChucdanhComponent,
    DanhmucLyDoKhongThuLyTcComponent,
    DanhmucCanCuComponent,
    DanhmucChitietNoidungComponent,
    DanhmucNoidungTtktComponent,
    DanhmucPhanloaiDtComponent,
    DanhmucPhanloaiTieuthucComponent,
    ThemNhomKetLuanComponent,
    ThucHienKetLuanComponent,
    DanhmucPhongBanComponent,
    ChiphikhamchuabenhComponent,
    DanhMucDonViNghiepVuComponent,
    DanhmucHanhviComponent,
    DanhmucVbCancuXuphatComponent,
  ],
  entryComponents: [
  ],
  providers: [
  ],
})
export class DanhMucHeThongModule { }
