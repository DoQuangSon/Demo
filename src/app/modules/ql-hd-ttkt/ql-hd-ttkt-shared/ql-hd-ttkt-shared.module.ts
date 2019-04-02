import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { COMPONENTS } from './component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDuyetComponent } from './component/tl-doan-ttkt-form/modal-list/modal-duyet/modal-duyet.component';
import { ModalDsDoanTtktComponent } from './component/tl-doan-ttkt-form/modal-list/modal-ds-doan-ttkt/modal-ds-doan-ttkt.component';
import { ModalLuuComponent } from './component/tl-doan-ttkt-form/modal-list/modal-luu/modal-luu.component';
import { TempService } from './component/tl-doan-ttkt-form/tao-moi-doan-ttkt/temp.service';
import { SharedModule } from '../../../shared/shared.module';
import { ModalGuiComponent } from './component/tl-doan-ttkt-form/modal-list/modal-gui/modal-gui.component';
import { ModalDonViComponent } from './component/tl-doan-ttkt-form/modal-list/modal-don-vi/modal-don-vi.component';
import { ModalThemDonViComponent } from './component/tl-doan-ttkt-form/modal-list/modal-them-don-vi/modal-them-don-vi.component';
import { ThongTinDieuChinhComponent } from '../kh-ttkt/trung-uong/xay-dung-ke-hoach-trung-uong/ke-hoach-chi-tiet/thong-tin-dieu-chinh/thong-tin-dieu-chinh.component';
import { FormThongTinDieuChinhComponent } from '../kh-ttkt/trung-uong/ke-hoach-da-giao-cho-tinh/form-thong-tin-dieu-chinh/form-thong-tin-dieu-chinh.component';
import { ThongTinChungComponent } from '../kh-ttkt/trung-uong/xay-dung-ke-hoach-trung-uong/ke-hoach-chi-tiet/thong-tin-chung/thong-tin-chung.component';
import { ShowDialogHistoryComponent } from '../kh-ttkt/trung-uong/xay-dung-ke-hoach-trung-uong/ke-hoach-chi-tiet/show-dialog-history/show-dialog-history.component';
import { ChiTietKhTableComponent } from '../kh-ttkt/trung-uong/xay-dung-ke-hoach-trung-uong/ke-hoach-chi-tiet/chi-tiet-kh-table/chi-tiet-kh-table.component';
import { ListKeHoachBhxhVnTableComponent } from '../kh-ttkt/trung-uong/ke-hoach-bhxh-vn/list-ke-hoach-bhxh-vn-table/list-ke-hoach-bhxh-vn-table.component';
import { KetquaTtktComponent } from '../ql-doan-ttkt/ql-doan-ttkt-tw/tienhanh-ttkt-tw/ketqua-ttkt/ketqua-ttkt.component';
import { KetThucTtktFormComponent } from './component/ket-thuc-ttkt-form/ket-thuc-ttkt-form.component';
import { BaoCaoTongHopComponent } from './bao-cao-tong-hop/bao-cao-tong-hop.component';
import { TaomoiBaoCaoTongHopTwComponent } from './bao-cao-tong-hop/taomoi-bao-cao-tong-hop-tw/taomoi-bao-cao-tong-hop-tw.component';
import { ChitietBaoCaoTongHopTwComponent } from './bao-cao-tong-hop/chitiet-bao-cao-tong-hop-tw/chitiet-bao-cao-tong-hop-tw.component';
import { SoTonghopKqLiveComponent } from './component/baocao-ttkt-form/so-tonghop-kq-form/so-tonghop-kq-live/so-tonghop-kq-live.component';
import { ModalVphcFormComponent } from './component/modal-vphc-form/modal-vphc-form.component';
import { ModalQdxpVphcFormComponent } from './component/modal-qdxp-vphc-form/modal-qdxp-vphc-form.component';
import { GiaiTrinhChapHanhTtktFormComponent } from './component/giai-trinh-chap-hanh-ttkt-form/giai-trinh-chap-hanh-ttkt-form.component';
import { GiaiTrinhChapHanhTtktDonViFormComponent } from './component/giai-trinh-chap-hanh-ttkt-don-vi-form/giai-trinh-chap-hanh-ttkt-don-vi-form.component';
import { ChapNhanGiaiTrinhDonViTtktFormComponent } from './component/giai-trinh-chap-hanh-ttkt-don-vi-form/chap-nhan-giai-trinh-don-vi-ttkt-form/chap-nhan-giai-trinh-don-vi-ttkt-form.component';
import {ChitietKhBhxhVnTinhComponent} from '../kh-ttkt/kh-ttkt-tinh/kh-bhxh-vn-tinh/chitiet-kh-bhxh-vn-tinh/chitiet-kh-bhxh-vn-tinh.component';
import { ThongTinChungTinhComponent } from '../kh-ttkt/kh-ttkt-tinh/kh-bhxh-vn-tinh/chitiet-kh-bhxh-vn-tinh/thong-tin-chung-tinh/thong-tin-chung-tinh.component';
import { KetthucTtktTwComponent } from '../ql-doan-ttkt/ql-doan-ttkt-tw/ketthuc-ttkt-tw/ketthuc-ttkt-tw.component';
import { BaoCaoTongHopFormComponent } from './component/baocao-ttkt-form/bao-cao-tong-hop-form/bao-cao-tong-hop-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [
    ...COMPONENTS,
    ModalDonViComponent,
    ModalThemDonViComponent,
    ThongTinDieuChinhComponent,
    FormThongTinDieuChinhComponent,
    ThongTinChungComponent,
    ShowDialogHistoryComponent,
    ChiTietKhTableComponent,
    ListKeHoachBhxhVnTableComponent,
    KetquaTtktComponent,
    KetThucTtktFormComponent,
    BaoCaoTongHopComponent,
    TaomoiBaoCaoTongHopTwComponent,
    ChitietBaoCaoTongHopTwComponent,
    SoTonghopKqLiveComponent,
    ModalVphcFormComponent,
    ModalQdxpVphcFormComponent,
    GiaiTrinhChapHanhTtktFormComponent,
    GiaiTrinhChapHanhTtktDonViFormComponent,
    ChapNhanGiaiTrinhDonViTtktFormComponent,
    ChitietKhBhxhVnTinhComponent,
    ThongTinChungTinhComponent,
    KetthucTtktTwComponent,
    BaoCaoTongHopFormComponent,
  ],
  exports: [
    ...COMPONENTS,
    ThongTinDieuChinhComponent,
    FormThongTinDieuChinhComponent,
    ThongTinChungComponent,
    ShowDialogHistoryComponent,
    KetquaTtktComponent,
    ChiTietKhTableComponent,
    ListKeHoachBhxhVnTableComponent,
    BaoCaoTongHopComponent,
    TaomoiBaoCaoTongHopTwComponent,
    ChitietBaoCaoTongHopTwComponent,
    GiaiTrinhChapHanhTtktFormComponent,
    GiaiTrinhChapHanhTtktDonViFormComponent,
    ChapNhanGiaiTrinhDonViTtktFormComponent,
    ChitietKhBhxhVnTinhComponent,
    ThongTinChungTinhComponent,
    KetthucTtktTwComponent
  ],
  entryComponents: [
    ModalDuyetComponent,
    ModalGuiComponent,
    ModalDsDoanTtktComponent,
    ModalLuuComponent,
    ModalDonViComponent,
    ModalThemDonViComponent,
  ],
  providers: [TempService],
})
export class QlHdTtktSharedModule { }
