import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CauHinhHeThongModule } from './cauhinh-hethong/cauhinh-hethong.module';
import { QLHeThongTTKTRoutingModule } from './ql-hethong-ttkt-routing.module';
import { DanhMucHeThongModule } from './danhmuc-hethong/danhmuc-hethong.module';
import { TreeviewModule } from 'ngx-treeview';
import { QuanlyNguoidungComponent } from './quanly-nguoidung/quanly-nguoidung.component';
import { QuanlyNhomnguoidungComponent } from './quanly-nhomnguoidung/quanly-nhomnguoidung.component';
import { PhanloaiDoituongTtktComponent } from './phanloai-doituong-ttkt/phanloai-doituong-ttkt.component';
import { ModalGanNsdComponent } from './quanly-nhomnguoidung/modal-gan-nsd/modal-gan-nsd.component';
import { CreateNhomDtComponent } from './phanloai-doituong-ttkt/create-nhom-dt/create-nhom-dt.component';
import { ModalNghiepVuComponent } from './danhmuc-hethong/danh-muc-don-vi-nghiep-vu/modal-list/modal/modal-nghiep-vu.component';
import { DualListBoxModule } from '../../shared/ng2-dual-list-box/ng2-dual-list-box.module';
import { AddLoaiDoiTuongComponent } from './phanloai-doituong-ttkt/add-loai-doi-tuong/add-loai-doi-tuong.component';
import { ViewAllNotificationComponent } from '../components/view-all-notification/view-all-notification.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TreeviewModule.forRoot(),
    DualListBoxModule.forRoot(),
    QLHeThongTTKTRoutingModule,
  ],
  declarations: [
    QuanlyNguoidungComponent,
    QuanlyNhomnguoidungComponent,
    PhanloaiDoituongTtktComponent,
    ModalGanNsdComponent,
    CreateNhomDtComponent,
    ModalNghiepVuComponent,
    AddLoaiDoiTuongComponent,
    ViewAllNotificationComponent
  ],
  entryComponents: [
    ModalGanNsdComponent,
    ModalNghiepVuComponent,
    AddLoaiDoiTuongComponent
  ]
})
export class QLHeThongTTKTModule { }
