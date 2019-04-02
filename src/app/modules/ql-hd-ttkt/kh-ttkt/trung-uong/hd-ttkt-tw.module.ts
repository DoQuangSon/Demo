import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KHTTKTTWRoutingModule } from './kh-ttkt-tw-routing.module';
import { XayDungKeHoachTrungUongComponent } from './xay-dung-ke-hoach-trung-uong/xay-dung-ke-hoach-trung-uong.component';
import { KeHoachChiTietComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-chi-tiet/ke-hoach-chi-tiet.component';
import { GiaoKeHoachChoCacTinhComponent } from './xay-dung-ke-hoach-trung-uong/giao-ke-hoach-cho-cac-tinh/giao-ke-hoach-cho-cac-tinh.component';
import { KeHoachBhxhVnComponent } from './ke-hoach-bhxh-vn/ke-hoach-bhxh-vn.component';
import { TaoKeHoachTWComponent } from './ke-hoach-bhxh-vn/tao-ke-hoach/tao-ke-hoach.component';
import { KeHoachChiTietBhxhvnComponent } from './ke-hoach-bhxh-vn/ke-hoach-chi-tiet-bhxhvn/ke-hoach-chi-tiet-bhxhvn.component';
import { DieuChinhComponent } from './ke-hoach-bhxh-vn/ke-hoach-chi-tiet-bhxhvn/dieu-chinh/dieu-chinh.component';
import { DanhSachTinhComponent } from './ke-hoach-bhxh-vn/danh-sach-tinh/danh-sach-tinh.component';
import { DanhSachKeHoachTableComponent } from './xay-dung-ke-hoach-trung-uong/danh-sach-ke-hoach-table/danh-sach-ke-hoach-table.component';
import { KeHoachBhxhTinhComponent } from './ke-hoach-bhxh-tinh/ke-hoach-bhxh-tinh.component';
import { ListKeHoachBhxhVnTableComponent } from './ke-hoach-bhxh-vn/list-ke-hoach-bhxh-vn-table/list-ke-hoach-bhxh-vn-table.component';
import { KeHoachChoDuyetComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-cho-duyet/ke-hoach-cho-duyet.component';
import { DsDonviQlComponent } from './ke-hoach-bhxh-tinh/ds-donvi-ql/ds-donvi-ql.component';
import { DsTinhDieuchinhComponent } from './xay-dung-ke-hoach-trung-uong/ds-tinh-dieuchinh/ds-tinh-dieuchinh.component';
import { ChitietDsDonviComponent } from './ke-hoach-bhxh-vn/chitiet-ds-donvi/chitiet-ds-donvi.component';
import { QlHdTtktSharedModule } from '../../../ql-hd-ttkt/ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';
import { KeHoachDaGiaoChoTinhComponent } from './ke-hoach-da-giao-cho-tinh/ke-hoach-da-giao-cho-tinh.component';
import { KeHoachXinDieuChinhDuocChapNhanComponent } from './ke-hoach-xin-dieu-chinh-duoc-chap-nhan/ke-hoach-xin-dieu-chinh-duoc-chap-nhan.component';
import { ThongTinChungComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-chi-tiet/thong-tin-chung/thong-tin-chung.component';
import { ThongTinDieuChinhComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-chi-tiet/thong-tin-dieu-chinh/thong-tin-dieu-chinh.component';
import { ShowDialogHistoryComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-chi-tiet/show-dialog-history/show-dialog-history.component';
import { ChiTietKhTableComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-chi-tiet/chi-tiet-kh-table/chi-tiet-kh-table.component';
import { FormThongTinDieuChinhComponent } from './ke-hoach-da-giao-cho-tinh/form-thong-tin-dieu-chinh/form-thong-tin-dieu-chinh.component';
import { DialogLichSuDieuChinhDaGiaoComponent } from './ke-hoach-da-giao-cho-tinh/form-thong-tin-dieu-chinh/dialog-lich-su-dieu-chinh-da-giao/dialog-lich-su-dieu-chinh-da-giao.component';
import { DanhSachChiTietDaGiaoTableComponent } from './ke-hoach-da-giao-cho-tinh/form-thong-tin-dieu-chinh/danh-sach-chi-tiet-da-giao-table/danh-sach-chi-tiet-da-giao-table.component';
import { KeHoachDuThaoBhxhvnComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-du-thao-bhxhvn/ke-hoach-du-thao-bhxhvn.component';
import { TaoKhDuThaoBhxhvnComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-du-thao-bhxhvn/tao-kh-du-thao-bhxhvn/tao-kh-du-thao-bhxhvn.component';
import { ChiTietKeHoachDuThaoBhxhvnComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-du-thao-bhxhvn/chi-tiet-ke-hoach-du-thao-bhxhvn/chi-tiet-ke-hoach-du-thao-bhxhvn.component';
import { EditKhDtComponent } from './xay-dung-ke-hoach-trung-uong/ke-hoach-du-thao-bhxhvn/edit-kh-dt/edit-kh-dt.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    KHTTKTTWRoutingModule,
    QlHdTtktSharedModule
  ],
  exports: [

  ],
  declarations: [
    XayDungKeHoachTrungUongComponent,
    KeHoachChiTietComponent,
    GiaoKeHoachChoCacTinhComponent,
    KeHoachBhxhVnComponent,
    TaoKeHoachTWComponent,
    KeHoachChiTietBhxhvnComponent,
    DieuChinhComponent,
    DanhSachTinhComponent,
    DanhSachKeHoachTableComponent,
    KeHoachBhxhTinhComponent,
    KeHoachChoDuyetComponent,
    DsDonviQlComponent,
    DsTinhDieuchinhComponent,
    ChitietDsDonviComponent,
    KeHoachDaGiaoChoTinhComponent,
    KeHoachXinDieuChinhDuocChapNhanComponent,
    DialogLichSuDieuChinhDaGiaoComponent,
    DanhSachChiTietDaGiaoTableComponent,
    KeHoachDuThaoBhxhvnComponent,
    TaoKhDuThaoBhxhvnComponent,
    ChiTietKeHoachDuThaoBhxhvnComponent,
    EditKhDtComponent
  ]
})
export class HDTTKTTWModule {
}
