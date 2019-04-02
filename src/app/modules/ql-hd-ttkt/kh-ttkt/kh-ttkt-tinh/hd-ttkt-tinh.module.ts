import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KHTTKTTINHRoutingModule } from './hd-ttkt-tinh-routing.module';
import { KHBHXHTinhComponent } from './kh-bhxh-tinh/kh-bhxh-tinh.component';
import { CreateKHBHXHTinhComponent } from './kh-bhxh-tinh/create-kh-bhxh-tinh/create-kh-bhxh-tinh.component';
import { DetailKHBHXHTinhComponent } from './kh-bhxh-tinh/detail-kh-bhxh-tinh/detail-kh-bhxh-tinh.component';
import { EditKHBHXHTinhComponent } from './kh-bhxh-tinh/edit-kh-bhxh-tinh/edit-kh-bhxh-tinh.component';
import { CapNhatKHBHXHTinhComponent } from './kh-bhxh-tinh/capnhat-kh-bhxh-tinh/capnhat-kh-bhxh-tinh.component';
import { XayDungKeHoachTinhComponent } from './xay-dung-ke-hoach-tinh/xay-dung-ke-hoach-tinh.component';
import { ChiTietKeHoachTinhComponent } from './xay-dung-ke-hoach-tinh/chi-tiet-ke-hoach-tinh/chi-tiet-ke-hoach-tinh.component';
import { TaoKeHoachTinhComponent } from './xay-dung-ke-hoach-tinh/tao-ke-hoach-tinh/tao-ke-hoach-tinh.component';
import { KhBhxhVnTinhComponent } from './kh-bhxh-vn-tinh/kh-bhxh-vn-tinh.component';
import { DsDonviQlTinhComponent } from './xay-dung-ke-hoach-tinh/ds-donvi-ql-tinh/ds-donvi-ql-tinh.component';
import { DsDonviQlTinhtpComponent } from './kh-bhxh-tinh/ds-donvi-ql-tinhtp/ds-donvi-ql-tinhtp.component';
import { TuchoiDieuchinhKhbhxhComponent } from './kh-bhxh-vn-tinh/tuchoi-dieuchinh-khbhxh/tuchoi-dieuchinh-khbhxh.component';
import { QlHdTtktSharedModule } from '../../../ql-hd-ttkt/ql-hd-ttkt-shared/ql-hd-ttkt-shared.module';
import { ThongTinChungTinhComponent } from './kh-bhxh-vn-tinh/chitiet-kh-bhxh-vn-tinh/thong-tin-chung-tinh/thong-tin-chung-tinh.component';
import { ShowDialogHistoryComponent } from '../trung-uong/xay-dung-ke-hoach-trung-uong/ke-hoach-chi-tiet/show-dialog-history/show-dialog-history.component';
import { ShowDialogLichSuTinhTpComponent } from './kh-bhxh-tinh/show-dialog-lich-su-tinh-tp/show-dialog-lich-su-tinh-tp.component';
import { KhBhxhTinhTableComponent } from './kh-bhxh-tinh/kh-bhxh-tinh-table/kh-bhxh-tinh-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { DialogLoaiHinhQuyComponent } from './kh-bhxh-tinh/dialog-loai-hinh-quy/dialog-loai-hinh-quy.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    KHTTKTTINHRoutingModule,
    QlHdTtktSharedModule,
  ],
  declarations: [
    KHBHXHTinhComponent,
    CreateKHBHXHTinhComponent,
    DetailKHBHXHTinhComponent,
    EditKHBHXHTinhComponent,
    CapNhatKHBHXHTinhComponent,
    XayDungKeHoachTinhComponent,
    ChiTietKeHoachTinhComponent,
    TaoKeHoachTinhComponent,
    KhBhxhVnTinhComponent,
    DsDonviQlTinhComponent,
    DsDonviQlTinhtpComponent,
    TuchoiDieuchinhKhbhxhComponent,
    ShowDialogLichSuTinhTpComponent,
    KhBhxhTinhTableComponent,
    DialogLoaiHinhQuyComponent
    ],
    entryComponents: [
      DialogLoaiHinhQuyComponent
    ]
})
export class HDTTKTTINHModule { }
