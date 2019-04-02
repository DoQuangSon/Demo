import { LOAIHINHTTKT, QUY, TRANG_THAI_KH } from '../../../../../constants/ke-hoach-ttkt.constants';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IMyDpOptions } from 'mydatepicker';
import { groupBy } from 'lodash';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../constants';
import { NoiDmTinhHuyenService } from '../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { AlertService } from '../../../../../services/api/alert.service';
import { KeHoachBhxhTinhService } from '../../../../../services/api/ke-hoach-bhxh-tinh/ke-hoach-bhxh-tinh.service';
import { TimeBuilderService } from '../../../../../services/helper/time-builder.service';
import { COMMON_ERROR_MESS } from '../../../../../constants/message.constants';

@Component({
  selector: 'ttkt-ke-hoach-bhxh-tinh',
  templateUrl: './ke-hoach-bhxh-tinh.component.html',
  styleUrls: ['./ke-hoach-bhxh-tinh.component.scss']
})
export class KeHoachBhxhTinhComponent implements OnInit {
  @ViewChild('thucHienKH') thucHienKH: ModalDirective;
  @ViewChild('chiTietKeHoach') chiTietKeHoach: ModalDirective;
  @ViewChild('modalHoan') modalHoan: ModalDirective;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  formTimKiem: FormGroup;
  listQuy: any;
  options: any;
  // kh_option: any;
  // thucte_option: any;
  ketQuaTimKiem: Boolean = false;
  errNam: Boolean = false;
  errTinh: Boolean = false;
  isDaDuocDieuChinh: boolean;
  title: string;
  displayNoticeDelete: boolean;
  soDuyetDinh: string;
  lyDoDieuChinh: string;
  chiTietTWGiao: any;
  chiTietTinhThucHien: any;
  tienDo: any;

  isCoData: Boolean = false;
  isChuaDieuChinh: Boolean = false;
  // chuaDieuChinh: Boolean = false;

  optionNam = [];
  optionTinh = [];
  thongTinChiTiet: any = {};
  dieuChinh: any = {};

  // Search
  keHoachToanNganh: Boolean = true;
  keHoach1Nam: boolean;

  // table danh sách kế hoạch các tỉnh
  tableKeHoachDuKien: any = [];
  tableListCoQuan: any = [];
  chiTietKeHoachIsShowing: boolean;
  // showThucHienKH: boolean;
  formHoanTTKT: FormGroup;
  isXemLyDoHoan = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private noiDmTinhHuyenService: NoiDmTinhHuyenService,
    private keHoachBhxhTinhService: KeHoachBhxhTinhService,
    private timeBuilder: TimeBuilderService
  ) { }

  ngOnInit() {
    const year = (new Date()).getFullYear();
    // this.listQuy = QUY;
    // for (let i = year; i < year + 100; i++) {
    //   this.optionNam.push(i);
    // }
    this.getDanhSachTinhThanh();
    this.formTimKiem = this.fb.group({
      nam: [year],
      tinhoption: [0],
      toanNganh: true
    });
    this.formHoanTTKT = this.fb.group({
      ngayHoanTTKT: ['', [Validators.required]],
      lyDoHoanTTKT: ['', [Validators.required]]
    });
  }

  refreshValueDVPH(e: any) {
  }
  removeValueDVPH(e: any) {
  }

  changeToanNganh(status) {
    this.keHoachToanNganh = status;
  }

  getDanhSachTinhThanh() {
    this.noiDmTinhHuyenService.getDanhSachTinhThanh().subscribe(res => {
      this.optionTinh = res.map(el => ({ id: el.id, text: el.tenTinhHuyen }));
    }, err => this.alertService.error('Có lỗi khi lấy danh sách tỉnh!'));
  }

  chonDieuChinh(choiceId) {
    if (choiceId !== '') {
      this.soDuyetDinh = this.dieuChinh[Number(choiceId)].soQuyetDinhDieuChinh;
      this.lyDoDieuChinh = this.dieuChinh[Number(choiceId)].lyDoDieuChinh;
    } else {
      this.soDuyetDinh = '';
      this.lyDoDieuChinh = '';
    }
  }

  popUpThucHienKH() {
    this.title = 'Chi tiết đơn vị thực hiện kế hoạch';
    this.displayNoticeDelete = true;
    this.thucHienKH.show();
    this.chiTietKeHoach.hide();
  }

  closePopUpThucHienKH() {
    if (this.chiTietKeHoachIsShowing === true) {
      this.thucHienKH.hide();
      this.chiTietKeHoach.show();
    } else {
      this.thucHienKH.hide();
    }
  }

  // Tìm kiếm
  showKQTimKiem() {
    const formValue = this.formTimKiem.value;
    this.tableListCoQuan = [];
    this.chiTietKeHoachIsShowing = true;
    if (formValue.nam === 0) {
      this.errNam = true;
    } else {
      this.errNam = false;
      if (formValue.toanNganh === true) {
        this.searchNhieuKeHoach(formValue.nam, this.optionTinh.map(item => item.id));
      } else {
        if (formValue.tinhoption.length === 1) {
          this.chiTietKeHoachIsShowing = false;
          this.keHoach1Nam = true;
          this.getChiTietKeHoach(formValue.nam, formValue.tinhoption[0].id);
          this.getSoLieuThongKeThucHienKeHoach(formValue.nam, formValue.tinhoption[0].id);
        } else {
          let multiTinhHuyeId = [];
          for (let i = 0; i < formValue.tinhoption.length; i++) {
            multiTinhHuyeId.push(formValue.tinhoption[i].id);
          }
          if (multiTinhHuyeId.length === 0) {
            multiTinhHuyeId = this.optionTinh.map(item => item.id);
          }
          this.searchNhieuKeHoach(formValue.nam, multiTinhHuyeId);
        }
      }
    }
  }

  // Search nhiều tỉnh
  searchNhieuKeHoach(nam, tinhHuyenIds) {
    if (tinhHuyenIds.toString() === '0') {
      this.errTinh = true;
    } else {
      this.errNam = this.errTinh = false;
      this.keHoachBhxhTinhService.twXemTienDoTinhThucHien(nam, tinhHuyenIds).subscribe(res => {
        this.patchValueTableKeHoachTinhList(res);
        this.keHoach1Nam = false;
        this.isCoData = true;
      }, err => {
        this.isCoData = false;
      });
      this.ketQuaTimKiem = true;
    }
  }

  // Search 1 tỉnh
  getChiTietKeHoach(nam, tinhHuyenIds) {
    this.keHoachBhxhTinhService.searchKeHoachBHXHTinh(nam, tinhHuyenIds).subscribe(res => {
      this.getListCoQuan(res.tinhDuKiens);
      this.getDieuChinh(res);
      this.tienDo = res.tienDo;
      this.thongTinChiTiet = res;
      this.isCoData = true;
      if (res) {

      }
    }, err => {
      this.isCoData = false;
    });
    this.ketQuaTimKiem = true;
  }

  // Patch value ra table danh sach kế hoạch các tỉnh
  patchValueTableKeHoachTinhList(res) {
    this.tableKeHoachDuKien = res;
  }

  // Popup xem kế hoạch của 1 tỉnh
  xemDetailKeHoach(id) {
    this.tableListCoQuan = [];
    this.chiTietKeHoach.show();
    const currentYear = (new Date()).getFullYear();
    this.getChiTietKeHoach(currentYear, id);
    this.getSoLieuThongKeThucHienKeHoach(currentYear, id);
  }

  // danhsachdonvi() {
  //   this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-tinh/ds-donvi-ql']);
  // }

  // Patch Value ra table list cơ quan trong chi tiết kế hoạch
  getListCoQuan(data) {
    data.sort(function (a, b) {
      return a.quyTrongKeHoach - b.quyTrongKeHoach
    });
    let groupContent: any = groupBy(data, (el: any) => (el.dmPhanLoaiDtId));
    groupContent = Object.keys(groupContent).map(key => {
      return [Number(key), groupContent[key]];
    });
    for (const item of groupContent) {
      // Patch value to table content
      const _el: any = item[1][0];
      _el.children = [];
      for (const element of item[1]) {
        element.doiTuongTTKT = Object.assign(element.doiTuongTTKTDTO, element.tinhDuKienLiveDTO);
        element.doiTuongTTKT.thucTeTuNgay = this.timeBuilder.fromString(element.doiTuongTTKT.thucTeTuNgay).toISOString();
        element.doiTuongTTKT.thucTeDenNgay = this.timeBuilder.fromString(element.doiTuongTTKT.thucTeDenNgay).toISOString();
        element.doiTuongTTKT.quyTrongKeHoach = element.quyTrongKeHoach;
        element.doiTuongTTKT.loaiHinhTTKT = element.loaiHinhTTKT;
        element.doiTuongTTKT.isTrongKeHoach = element.trongKeHoach ? element.trongKeHoach : false;
        element.doiTuongTTKT.isHoan = element.isHoan ? true : false;
        element.doiTuongTTKT.status = element.status;
        _el.children.push(element.doiTuongTTKT);
      }
      this.tableListCoQuan.push(_el);
    }
  }


  // Get tên cho loại hình TTKT
  getLoaiHinhTTKTName(id) {
    for (const item of LOAIHINHTTKT) {
      if (Number(id) === Number(item.id)) {
        return item.name;
      }
    }
  }
  getQuy(id) {
    for (const item of QUY) {
      if (Number(id) === Number(item.id)) {
        return item.name;
      }
    }
  }
  getDieuChinh(data) {
    if (data.currentDieuChinh !== 0) {
      this.isChuaDieuChinh = true;
    } else {
      this.isChuaDieuChinh = false;
    }
    const index = Number(data.currentDieuChinh);
    const soLanDieuChinh = [];
    for (let i = 0; i < index; i++) {
      soLanDieuChinh.push(i);
    }
    this.dieuChinh = {
      lyDoDieuChinh: data.lyDoDieuChinh,
      soDuyetDinh: data.soQuyetDinhDieuChinh,
      soLanDieuChinh: soLanDieuChinh
    };
  }

  getSoLieuThongKeThucHienKeHoach(year, dmTinhHuyenId) {
    this.chiTietTWGiao = [];
    this.chiTietTinhThucHien = [];
    this.keHoachBhxhTinhService.getSoLieuThongKeTinhThucHienKeHoach(year, dmTinhHuyenId)
      .subscribe(res => {
        this.chiTietTWGiao = res.keHoachDcGiao;
        this.chiTietTinhThucHien = res.tinhThucHien;
      }, err => {
        this.alertService.error(COMMON_ERROR_MESS.LOI_CHUNG);
      });
  }

  setStatusLabel(status) {
    for (const trangThai of TRANG_THAI_KH) {
      if (status === trangThai.code) {
        return trangThai.name;
      }
    }
    return this.setStatusLabel(2);
  }
  
  xemLyDoHoan(data) {
    this.isXemLyDoHoan = true;
    this.formHoanTTKT.patchValue({
      lyDoHoanTTKT: data.lyDoHoan,
      ngayHoanTTKT: this.timeBuilder.fromString(data.ngayHoan).toTimeDatePickerValue()
    });
    this.modalHoan.show();
  }
}
