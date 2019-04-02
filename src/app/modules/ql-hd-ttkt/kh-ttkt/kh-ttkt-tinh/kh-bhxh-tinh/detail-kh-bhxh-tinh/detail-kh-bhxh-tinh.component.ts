import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { QUY, LOAIHINHTTKT, TRANG_THAI_KH } from '../../../../../../constants/ke-hoach-ttkt.constants';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { STATUS } from '../../../../../../constants/status.constants';
import { NoiKehoachDuthaoService } from '../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { NoiPhanloaiDoituongService } from '../../../../../../services/api/noi-phanloai-doituong/noi-phanloai-doituong.service';
import { KeHoachBhxhTinhService } from '../../../../../../services/api/ke-hoach-bhxh-tinh/ke-hoach-bhxh-tinh.service';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { COMMON_ERROR_MESS } from '../../../../../../constants/message.constants';
import { KeHoachToanNganhService } from '../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-detail-kh-bhxh-tinh',
  templateUrl: './detail-kh-bhxh-tinh.component.html',
  styleUrls: ['./detail-kh-bhxh-tinh.component.scss']
})
export class DetailKHBHXHTinhComponent implements OnInit {
  @ViewChild('xuatFileExcel') public modalXuatFile: ModalDirective;
  @ViewChild('thucHienKHModal') thucHienKHModal: ModalDirective;
  @ViewChild('modalHoan') modalHoan: ModalDirective;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  isCollapseDirective: boolean = false;
  keHoachBHXHTinhForm: FormGroup;
  formDieuChinh: FormGroup;
  options: any;
  title: string;
  displayNoticeDelete: boolean;
  isDuyet: boolean;
  isCapNhat: boolean;
  isDieuChinh: boolean;
  isXuatExcel: boolean;
  soQuyetDinh: string;
  lyDoDieuChinh: string;
  tenFileQDDieuChinh: any;
  chiTietTWGiao: any;
  chiTietTinhThucHienForm: FormGroup;
  urlFileDownload: any;
  maxDieuChinh: number = 0;
  keHoachId: any;
  listKeHoachOldId: any;
  chiTietKeHoach: any = {};
  keHoachNam: any = {};
  tienDo: any;
  lanDieuChinh: any[] = [];
  loaiDoiTuongs: any[] = [];
  listKehoach: any[] = [];
  loaiHinhTTKTs: any[] = LOAIHINHTTKT;
  tinhDuKienList: any[] = [];
  canEdit: boolean;
  formHoanTTKT: FormGroup;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  isXemLyDoHoan = false;
  listLichSu: any[];
  soLSChinhSua: number;
  isDisableLS: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private noiPhanloaiDoituongService: NoiPhanloaiDoituongService,
    private keHoachBHXHTinh: KeHoachBhxhTinhService,
    private fileResource: FileResourceService,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private timeBuilderService: TimeBuilderService,
    private authen: AuthService
  ) { }

  quy: any[] = QUY;
  optionNam: any[] = [];
  ngOnInit() {
    const year = (new Date()).getFullYear();
    for (let i = year; i < year + 2; i++) {
      this.optionNam.push(i);
    }
    this.chiTietTinhThucHienForm = this.fb.group({
      thanhTraDvSDLD: 0,
      lienNganhThanhTra: 0,
      lienNganhKiemTra: 0,
      kiemTraBHXH: 0,
      kiemTraDvSDLD: 0,
      kiemTraCsKCB: 0,
      kiemTraDaiLyThuChi: 0,
      tongSo: 0
    });
    this.keHoachBHXHTinhForm = this.fb.group({
      nam: [1],
      dotXuat: [0],
      quy: [0],
      loaiHinhDv: [0],
      options: [''],
      tuNgay: [''],
      denNgay: [''],
      tenDonVi: ['']
    });
    this.formDieuChinh = this.fb.group({
      lanDieuChinh: [''],
      soQDDieuChinh: [''],
      lyDoDieuChinh: ['']
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.keHoachId = params['id'];
        this.getKeHoach();
        this.getKeHoachOldId();
      }
    });
    this.noiPhanloaiDoituongService.getAllDoituong({ page: 0, size: 20 })
      .subscribe(res => {
        this.loaiDoiTuongs = res['content'];
      }, err => { });
    this.formHoanTTKT = this.fb.group({
      ngayHoanTTKT: ['', [Validators.required]],
      lyDoHoanTTKT: ['', [Validators.required]]
    });
    this.getListLichSu();
    this.getSoLieuThongKeThucHienKeHoach(year, this.authen.currentUser.dmTinhHuyenId);
  }

  setStatusLabel(status) {
    for (const trangThai of TRANG_THAI_KH) {
      if (status === trangThai.code) {
        return trangThai.name;
      }
    }
    return this.setStatusLabel(2);
  }
  getKeHoach() {
    console.log('goi api');
    this.listKehoach = [];
    this.keHoachBHXHTinh.getKeHoachWithLiveData(this.keHoachId)
      .subscribe(res => {
        console.log(res.tinhDuKiens);
        this.tinhDuKienList = res.tinhDuKiens;
        this.tinhDuKienList.sort(function (a, b) {
          return a.quyTrongKeHoach - b.quyTrongKeHoach
        });
        this.keHoachNam = res.keHoachYear;
        this.chiTietKeHoach = res;
        this.tienDo = res.tienDo;
        this.checkStatus(res.status);
        this.formDieuChinh.patchValue({
          soQDDieuChinh: res.soQuyetDinhDieuChinh,
          lanDieuChinh: res.currentDieuChinh,
          lyDoDieuChinh: res.lyDoDieuChinh
        });
        for (const detailKhTinh of this.tinhDuKienList) {
          if (detailKhTinh !== null) {
            if (detailKhTinh.loaiHinhTTKT === 1) {
              this.chiTietTinhThucHienForm.value.thanhTraDvSDLD += 1;
            }
            if (detailKhTinh.loaiHinhTTKT === 3) {
              this.chiTietTinhThucHienForm.value.lienNganhThanhTra += 1;
            }
            if (detailKhTinh.loaiHinhTTKT === 4) {
              this.chiTietTinhThucHienForm.value.lienNganhKiemTra += 1;
            }
            if (detailKhTinh.loaiHinhTTKT === 2 && detailKhTinh.dmPhanLoaiDtId === 1) {
              this.chiTietTinhThucHienForm.value.kiemTraBHXH += 1;
            }
            if (detailKhTinh.loaiHinhTTKT === 2 && detailKhTinh.dmPhanLoaiDtId === 2) {
              this.chiTietTinhThucHienForm.value.kiemTraCsKCB += 1;
            }
            if (detailKhTinh.loaiHinhTTKT === 2 && detailKhTinh.dmPhanLoaiDtId === 3) {
              this.chiTietTinhThucHienForm.value.kiemTraDvSDLD += 1;
            }
            if (detailKhTinh.loaiHinhTTKT === 2 && detailKhTinh.dmPhanLoaiDtId === 4) {
              this.chiTietTinhThucHienForm.value.kiemTraDaiLyThuChi += 1;
            }
            const value = this.chiTietTinhThucHienForm.value;
            this.chiTietTinhThucHienForm.value.tongSo = value.thanhTraDvSDLD + value.lienNganhThanhTra + value.lienNganhKiemTra
              + value.kiemTraBHXH + value.kiemTraCsKCB + value.kiemTraDvSDLD + value.kiemTraDaiLyThuChi;
          }
        }
        for (const el of this.tinhDuKienList) {
          if (el.id !== null) {
            const kh: any = {};
            kh.id = el.dmPhanLoaiDtId;
            kh.tenDanhMuc = el.doiTuongTTKTDTO.dmPhanLoaiDtName;
            const listChildren: any[] = [];
            const children: any = {};
            children.doiTuongTTKT = el.doiTuongTTKTDTO;
            children.loaiHinhTTKT = el.loaiHinhTTKT;
            children.quyTrongKeHoach = el.quyTrongKeHoach;
            children.tinhDuKienLiveDTO = el.tinhDuKienLiveDTO;
            children.trongKeHoach = el.trongKeHoach;
            children.status = el.status;
            children.isHoan = el.isHoan;
            children.ngayHoan = el.ngayHoan;
            children.lyDoHoan = el.lyDoHoan;
            if (el.doiTuongTTKTDTO != null) {
              listChildren.push(children);
            }
            kh.children = listChildren;
            if (this.listKehoach.length > 0) {
              const index = this.listKehoach.findIndex(item => item.id === el.dmPhanLoaiDtId);
              if (index !== -1) {
                (<any[]>this.listKehoach[index].children).push(children);
              } else {
                this.listKehoach.push(kh);
              }
            } else {
              this.listKehoach.push(kh);
            }
          }
        }
        console.log('listKeHoach',this.listKehoach);
        this.listKehoach.sort(function (a, b) {
          return a.id - b.id
        });
        
        if (res.fileQuyetDinhDieuChinh) {
          this.urlFileDownload = JSON.parse(res.fileQuyetDinhDieuChinh);
          this.tenFileQDDieuChinh = this.urlFileDownload[0].fileName;
        }
        console.log(this.maxDieuChinh, res);
        if (this.maxDieuChinh <= res.currentDieuChinh) {
          this.lanDieuChinh = [];
          this.maxDieuChinh = res.currentDieuChinh;
          this.canEdit = true;
          for (let i = 0; i <= res.currentDieuChinh; i++) {
            this.lanDieuChinh.push(i);
          }
        }
        this.getSoLieuThongKeThucHienKeHoach(res.keHoachYear, res.dmTinhHuyenId);
      }, err => { });
  }

  getKeHoachOldId() {
    this.listKeHoachOldId = [];
    this.noiKehoachDuthaoService.getKhOld(this.keHoachId)
      .subscribe(res => {
        this.listKeHoachOldId = res;
      }, err => { });
  }

  getQuy(id) {
    return this.quy.find(el => el.id === id);
  }
  getLoaiHinh(id) {
    return this.loaiHinhTTKTs.find(el => el.id === id);
  }

  changeOption() {
    this.options = this.keHoachBHXHTinhForm.value.options;
    if (this.options === '1') {
      this.keHoachBHXHTinhForm.patchValue({
        quy: 0,
      });
    } else if (this.options === '2') {
      this.keHoachBHXHTinhForm.patchValue({
        tuNgay: 0,
        denNgay: 0
      });
    }
  }

  popUpThucHienKH() {
    this.title = 'Chi tiết đơn vị thực hiện kế hoạch';
    this.displayNoticeDelete = true;
    this.thucHienKHModal.show();
  }

  close() {
    this.thucHienKHModal.hide();
  }
  onSua() {
    this.route.params.subscribe(params => {
      this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-tinh/edit-kh-bhxh-tinh', this.keHoachId, 'sua']);
    });
  }
  dieuChinhKeHoachTinh() {
    this.route.params.subscribe(params => {
      this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-tinh/edit-kh-bhxh-tinh', this.keHoachId, 'dieuchinh']);
    });
  }

  closeInFileExcel() {
    this.modalXuatFile.hide();
  }

  onClose() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-tinh']);
  }

  onDuyet() {
    this.duyetModal.show();
  }

  onSubmitDuyet() {
    this.keHoachBHXHTinh.duyetKeHoachDuKienTinh(this.keHoachId)
      .subscribe(res => {
        this.setOffAllButtons();
        this.isCapNhat = true;
        this.isDieuChinh = true;
        this.isXuatExcel = true;
        this.duyetModal.hide();
      }, err => { });
  }

  downLoadFile() {
    this.fileResource.downloadFile(this.urlFileDownload[0].url).subscribe(blob => {
      this.fileResource.saveFile(blob, this.urlFileDownload[0].fileName);
    }, err => { });
  }

  checkStatus(status) {
    if (status === STATUS.STATUS_KHDUTHAO_TINH_CHO_DUYET_TAO_KH) {
      this.setOffAllButtons();
      this.isDuyet = true;
    } else if (status === STATUS.STATUS_KHDUTHAO_TINH_DA_DUOC_DUYET_TAO_KH) {
      this.setOffAllButtons();
      this.isCapNhat = true;
      this.isDieuChinh = true;
      this.isXuatExcel = true;
    }
  }
  setOffAllButtons() {
    this.isDuyet = false;
    this.isDieuChinh = false;
    this.isCapNhat = false;
    this.isXuatExcel = false;
  }
  getSoLieuThongKeThucHienKeHoach(year, dmTinhHuyenIds) {
    this.noiKehoachDuthaoService.searchKHTinh(dmTinhHuyenIds, year)
      .subscribe(res => {
        if (res !== null) {
          this.chiTietTWGiao = res[0].chiTietKhTinh;
          console.log(this.chiTietTWGiao);
        }
      }, err => {
        this.alertService.error(COMMON_ERROR_MESS.LOI_CHUNG);
      });
  }
  xemLyDoHoan(data) {
    this.isXemLyDoHoan = true;
    this.formHoanTTKT.patchValue({
      lyDoHoanTTKT: data.lyDoHoan,
      ngayHoanTTKT: this.timeBuilderService.fromString(data.ngayHoan).toTimeDatePickerValue()
    });
    this.modalHoan.show();
  }
  getListLichSu() {
    this.keHoachToanNganhService.getLSDaGiaoKHBHXH(this.keHoachId).subscribe(
      data => {
        this.listLichSu = data;
        console.log('hai', this.listLichSu);
        this.soLSChinhSua = this.listLichSu.length;
        this.isDisableLS = this.listLichSu.length <= 0;
      }
    );
  }
}
