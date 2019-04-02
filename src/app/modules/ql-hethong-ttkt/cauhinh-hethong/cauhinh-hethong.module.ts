import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CauHinhThamSoHeThongComponent } from './cauhinh-thamso-hethong/cauhinh-thamso-hethong.component';
import { CauHinhCoCauToChucComponent } from './cauhinh-cocau-tochuc/cauhinh-cocau-tochuc.component';
import { CauHinhHeThongRoutingModule } from './cauhinh-hethong-routing.module';
import { CauHinhQuyComponent } from './cauhinh-quy/cauhinh-quy.component';
import { CauHinhNgayNghiComponent } from './cauhinh-ngaynghi/cauhinh-ngaynghi.component';
import { CauHinhCaLamViecComponent } from './cauhinh-calamviec/cauhinh-calamviec.component';
import { CauhinhThoihanComponent } from './cauhinh-thoihan/cauhinh-thoihan.component';



import { CauHinhThamSoHtService } from '../../../services/api/cau-hinh/cau-hinh-tham-so-ht/cau-hinh-tham-so-ht.service';
import { CauHinhThoiHanService } from '../../../services/api/cau-hinh/cauhinh-thoihan/cau-hinh-thoi-han.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CauHinhHeThongRoutingModule
  ],
  declarations: [
    CauHinhThamSoHeThongComponent,
    CauHinhCoCauToChucComponent,
    CauHinhQuyComponent,
    CauHinhNgayNghiComponent,
    CauHinhCaLamViecComponent,
    CauhinhThoihanComponent
  ],
  providers: [
    CauHinhThamSoHtService,
    CauHinhThoiHanService
  ],
})
export class CauHinhHeThongModule { }
