import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { NoiKehoachDuthaoService } from '../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { TRANG_THAI_KH, QUY } from '../../../../../../constants/ke-hoach-ttkt.constants';
import { STATUS } from '../../../../../../constants/status.constants';
import {
  COMMON_ERROR_MESS,
  COMMON_SUCCESS_MESS,
  MESS_CHI_TIET_KH_TINH,
  MESS_TAO_KH_TINH
} from '../../../../../../constants/message.constants';
import { AlertService } from '../../../../../../services/api/alert.service';
import { NoiAccountService } from '../../../../../../services/api/noi-account/noi-account.service';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { FILE } from '../../../../../../constants/api-file.constants';
import { KeHoachToanNganhService } from '../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { AuthService } from '../../../../../../auth/auth.service';
import { FormService } from '../../../../../../shared/form-module/form.service';

@Component({
  selector: 'ttkt-chi-tiet-ke-hoach-tinh',
  templateUrl: './chi-tiet-ke-hoach-tinh.component.html',
  styleUrls: ['./chi-tiet-ke-hoach-tinh.component.scss']
})
export class ChiTietKeHoachTinhComponent implements OnInit {
  @ViewChild('fileQuyetDinhTaoKH') fileInputRef1: ElementRef;

  id: any;
  optionNam: any[] = [];
  formModal: FormGroup;
  quy: any[] = QUY;
  length: any = 0;
  chiTietKH: any = {};
  type: any;
  listKhDieuchinh: any[] = [];
  status: any;
  createDateTime: any;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('lgModal') modal: ModalDirective;
  isSua: boolean;
  isGui: boolean;
  isLuuSua: boolean;
  isCapNhat: boolean;
  isDuyet: boolean;
  isDieuChinh: boolean;
  displayChiTietKH: boolean = true;
  taoKehoachForm: FormGroup;
  account: any = {};
  formBody: any = {};
  sumRow: any;
  statusKH: any;
  khDuThaoId: any;
  chiTietKhTinhId: any;
  tenFileQuyetDinh: any;
  fileQuyetDinhTaoKH: any;
  urlFileDownload: any[] = [];
  optionLichsu = [];
  isChuaGui: boolean;
  MAX_SUM_ROW = 1000000;

  optionTinhTuchoi: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private timeBuilderService: TimeBuilderService,
    private alertService: AlertService,
    private noiAccountService: NoiAccountService,
    private fileResource: FileResourceService,
    private auth: AuthService,
    private formService: FormService
  ) { }

  ngOnInit() {
    const nam = new Date().getFullYear();
    for (let index = nam; index < nam + 20; index++) {
      this.optionNam.push(index);
    }
    this.taoKehoachForm = this.fb.group({
      nam: ['', Validators.required],
      tenKH: ['', [Validators.required]],
      ngayTaoKH: ['', [Validators.required]],
      soQD: ['', [Validators.required]],
      fileQuyetDinhTaoKH: [''],
      ngayKyQD: ['', [Validators.required]],
      nguoiKyQD: ['', Validators.required],
      nguoiTao: ['', Validators.required],
      thanhTraChuyenNganhDVSDLD: ['', Validators.required],
      noiBoCoQuanBHXH: ['', Validators.required],
      donViSuDungLD: ['', Validators.required],
      coSoKhamChuaBenh: ['', Validators.required],
      daiLyThuDaiDienChiTra: ['', Validators.required],
      lienNganhTT: ['', Validators.required],
      lienNganhKT: ['', Validators.required]
    });
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.excuteGetKehoach();
    });
    if (Object.keys(this.chiTietKH).length === 0) {
      this.excuteGetKehoach();
    }
    this.formModal = this.fb.group({
      inputSend: [''],
      loiNhanCuaTinh: ['', Validators.required]
    });
    this.account = this.auth.currentUser;

    if (Object.keys(this.account).length === 0) {
      this.noiAccountService.getAcount()
        .subscribe(res => {
          this.account = res;
        });
    }
  }

  onSua() {
    this.setOffAllButton();
    this.isLuuSua = true;
    this.keHoachToanNganhService.getKeHoachTWDauNam(this.khDuThaoId)
      .subscribe(res => {
        this.formBody = res;
      }, err => { });
  }

  onLuuSua() {
    this.formService.touchAllInput(this.taoKehoachForm, true);
    if (!this.taoKehoachForm.invalid && (this.fileQuyetDinhTaoKH.length !== 0)) {
      if (this.sumRow <= this.MAX_SUM_ROW) {
        if (this.sumRow === 0) {
          this.alertService.error("Tổng số không thể bằng không!");
          return;
        }
        const formValue = this.taoKehoachForm.value;

        this.formBody.keHoachYear = formValue.nam;
        this.formBody.tenKeHoach = formValue.tenKH;
        this.formBody.ngayQuyetDinhTaoKeHoach = formValue.ngayTaoKH;
        this.formBody.ngayKyQDTaoKeHoach = formValue.ngayKyQD;
        this.formBody.soQuyetDinhTaoKeHoach = formValue.soQD;
        this.formBody.nguoiKyQDTaoKeHoach = formValue.nguoiKyQD;
        this.formBody.tenNguoiTao = formValue.nguoiTao;
        this.formBody.chiTietKhTinh.dmTinhHuyenId = this.account.dmTinhHuyenId;
        this.formBody.chiTietKhTinh.kiemTraBHXH = formValue.noiBoCoQuanBHXH;
        this.formBody.chiTietKhTinh.kiemTraCsKCB = formValue.coSoKhamChuaBenh;
        this.formBody.chiTietKhTinh.kiemTraDaiLyThuChi = formValue.daiLyThuDaiDienChiTra;
        this.formBody.chiTietKhTinh.kiemTraDvSDLD = formValue.donViSuDungLD;
        this.formBody.chiTietKhTinh.lienNganhThanhTra = formValue.lienNganhTT;
        this.formBody.chiTietKhTinh.lienNganhKiemTra = formValue.lienNganhKT;
        this.formBody.chiTietKhTinh.thanhTraDvSDLD = formValue.thanhTraChuyenNganhDVSDLD;
        this.formBody.chiTietKhTinh.tongSo = this.sumRow;
        if (typeof this.fileQuyetDinhTaoKH === 'string') {
          this.formBody.fileQuyetDinhTaoKH = this.fileQuyetDinhTaoKH;
        } else {
          this.formBody.fileQuyetDinhTaoKH = this.fileResource.getFileString(this.fileQuyetDinhTaoKH);
        }
        this.noiKehoachDuthaoService.updateNewKhDuthao(this.formBody)
          .subscribe(res => {
            this.excuteGetKehoach();
            this.length = Object.keys(res).length;
          }, err => {
          });
        this.isSua = false;
        this.isCapNhat = true;
      } else {
        this.alertService.error(MESS_TAO_KH_TINH.ERROR_MAX_SUM_ROW + this.MAX_SUM_ROW);
      }
    } else {
      this.alertService.error(COMMON_ERROR_MESS.THIEU_FIELD_REQUIRED);
    }
  }
  excuteListKhDieuchinh() {
    this.noiKehoachDuthaoService.getKhOld(this.id)
      .subscribe(res => {
        this.listKhDieuchinh = res;
        this.getLichSuGiaoNhan(res);
      }, err => { });
  }
  excuteGetKehoach() {
    this.noiKehoachDuthaoService.getById(this.id)
      .subscribe(res => {
        const value = res.chiTietKhTinh;
        this.chiTietKH = res;
        this.statusKH = res.status;
        this.formBody = res;
        this.khDuThaoId = res.id;
        this.fileQuyetDinhTaoKH = res.fileQuyetDinhTaoKH;
        this.urlFileDownload = JSON.parse(res.fileQuyetDinhTaoKH);
        this.tenFileQuyetDinh = this.urlFileDownload[0].fileName;
        this.createDateTime = res.createDateTime;
        this.length = Object.keys(res).length;
        this.type = this.chiTietKH.status;
        this.status = res.status;
        this.taoKehoachForm.patchValue({
          nam: res.keHoachYear,
          tenKH: res.tenKeHoach,
          soQD: res.soQuyetDinhTaoKeHoach,
          ngayTaoKH: res.ngayQuyetDinhTaoKeHoach,
          ngayKyQD: res.ngayKyQDTaoKeHoach,
          nguoiKyQD: res.nguoiKyQDTaoKeHoach,
          nguoiTao: res.tenNguoiTao,
          thanhTraChuyenNganhDVSDLD: res.chiTietKhTinh.thanhTraDvSDLD,
          noiBoCoQuanBHXH: res.chiTietKhTinh.kiemTraBHXH,
          donViSuDungLD: res.chiTietKhTinh.kiemTraDvSDLD,
          coSoKhamChuaBenh: res.chiTietKhTinh.kiemTraCsKCB,
          daiLyThuDaiDienChiTra: res.chiTietKhTinh.kiemTraDaiLyThuChi,
          lienNganhTT: res.chiTietKhTinh.lienNganhKiemTra,
          lienNganhKT: res.chiTietKhTinh.lienNganhThanhTra
        });
        this.sumRow = Number(value.thanhTraDvSDLD) + Number(value.kiemTraBHXH) +
                      Number(value.kiemTraDvSDLD) + Number(value.kiemTraCsKCB) +
                      Number(value.kiemTraDaiLyThuChi) + Number(value.lienNganhKiemTra) +
                      Number(value.lienNganhThanhTra);
        if (this.statusKH === STATUS.STATUS_KHDUTHAO_TINH_CHO_DUYET_TAO_KH) {
          this.setOffAllButton();
          this.isDuyet = true;
          this.isSua = true;
          this.displayChiTietKH = true;
        } else if (this.statusKH === STATUS.STATUS_KHDUTHAO_TINH_DA_DUOC_DUYET_TAO_KH) {
          this.setOffAllButton();
          this.isGui = true;
          this.displayChiTietKH = true;
        } else if (this.statusKH === STATUS.STATUS_KHDUTHAO_TINH_CHO_TW_DUYET) {
          this.setOffAllButton();
          this.displayChiTietKH = true;
        } else if (this.statusKH === STATUS.STATUS_KHDUTHAO_TINH_TW_TU_CHOI_KH) {
          this.setOffAllButton();
          this.isDieuChinh = true;
          this.displayChiTietKH = true;
        }
        this.excuteListKhDieuchinh();
      }, err => {
      });
  }
  redirectDieuchinh() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/xay-dung-ke-hoach/chi-tiet-ke-hoach/' + this.id + '/dieu-chinh']);
  }

  danhsachdonvi() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/xay-dung-ke-hoach/ds-donvi-ql-tinh']);
  }

  onClose() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/xay-dung-ke-hoach']);
  }
  getQuy(id) {
    const q = this.quy.find(el => {
      return el.id = id;
    });
    return q;
  }

  onDuyet() {
    this.duyetModal.show();
  }

  onSubmitDuyet() {
    this.noiKehoachDuthaoService.tinhDuyetKeHoachDauNam(this.chiTietKH.id)
      .subscribe(res => {
        this.setOffAllButton();
        this.displayChiTietKH = true;
        this.isGui = true;
        this.alertService.success(COMMON_SUCCESS_MESS.DUYET);
      }, err => {
      });
    this.duyetModal.hide();
  }

  onSend() {
    // @Todo: Gop xu ly validate
    this.formService.touchAllInput(this.taoKehoachForm, true);
    // console.log(this.formService.getErrorList(this.taoKehoachForm), this.fileQuyetDinhTaoKH);
    // convert string to []
    if (typeof this.fileQuyetDinhTaoKH === 'string') {
      this.fileQuyetDinhTaoKH = JSON.parse(this.fileQuyetDinhTaoKH);
    }
    if (this.taoKehoachForm.invalid || !this.fileQuyetDinhTaoKH || this.fileQuyetDinhTaoKH.length === 0) {
      this.alertService.error(COMMON_ERROR_MESS.THIEU_FIELD_REQUIRED);
      return;
    }
    if (this.sumRow > this.MAX_SUM_ROW) {
      this.alertService.error(MESS_TAO_KH_TINH.ERROR_MAX_SUM_ROW + this.MAX_SUM_ROW);
      return;
    }

    this.formModal.reset();
    this.formModal.patchValue({
      inputSend: 'BHXH VN'
    });
    this.modal.show();
  }
  onSubmitModal() {
    if (!this.formModal.invalid) {
      const formValue = this.formModal.value;
      const formBody: any = {};
      formBody.id = this.chiTietKH.id;
      formBody.loiNhanCuaTinh = formValue.loiNhanCuaTinh;
      this.noiKehoachDuthaoService.tinhGuiKeHoachDenTW(formBody)
        .subscribe(res => {
          this.alertService.success(MESS_CHI_TIET_KH_TINH.SUCCESS_GUI_KE_HOACH);
        }, err => {
        });
      this.modal.hide();
      this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/xay-dung-ke-hoach']);
    } else {
      this.alertService.error(MESS_CHI_TIET_KH_TINH.ERROR_NHAP_LOI_NHAN);
    }
  }

  getLichSuGiaoNhan(data) {
    this.optionLichsu = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === STATUS.STATUS_KHDUTHAO_TINH_CHO_TW_DUYET || data[i].status === STATUS.STATUS_KHDUTHAO_TINH_TW_CHAP_NHAN_KH) {
        this.optionLichsu.push({
          coquan: this.chiTietKH.tenTinhHuyen,
          loinhan: this.chiTietKH.loiNhanCuaTinh,
          thoigian: data[i].ngayGuiTW
        });
      }
      if (data[i].status === STATUS.STATUS_KHDUTHAO_TINH_TW_TU_CHOI_KH) {
        this.optionLichsu.push({
          coquan: 'BHXH VN',
          loinhan: data[i].lyDoTuChoiKeHoach,
          thoigian: data[i].ngayTwTuChoiKh
        });
        this.optionLichsu.push({
          coquan: this.chiTietKH.tenTinhHuyen,
          loinhan: data[i].loiNhanCuaTinh,
          thoigian: data[i].ngayGuiTW
        });
      }
      if (data[i].status === STATUS.STATUS_KHDUTHAO_TINH_CHO_DUYET_XIN_DIEU_CHINH
        || data[i].status === STATUS.STATUS_KHDUTHAO_TINH_TW_CHAP_NHAN_DIEU_CHINH) {
        this.optionLichsu.push({
          coquan: this.chiTietKH.tenTinhHuyen,
          loinhan: data[i].loiNhanCuaTinh,
          thoigian: data[i].ngayGuiTW
        });
      }
      if (data[i].status === STATUS.STATUS_KHDUTHAO_TINH_TW_TU_CHOI_DIEU_CHINH) {
        this.optionLichsu.push({
          coquan: 'BHXH VN',
          loinhan: data[i].lyDoTuChoiKeHoach,
          thoigian: data[i].ngayTwTuChoiDieuChinh
        });
      }
      if (data[i].status <= STATUS.STATUS_KHDUTHAO_TINH_DA_DUOC_DUYET_TAO_KH) {
        this.isChuaGui = true;
      }
    }
  }
  downLoadFile() {
    this.fileResource.downloadFile(this.urlFileDownload[0].url).subscribe(blob => {
      this.fileResource.saveFile(blob, this.urlFileDownload[0].fileName);
    }, err => { });
  }
  upFileQuyetDinhTaoKH() {
    const fileEl = this.fileInputRef1.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResource.uploadFile(files, FILE.FILE_QUYET_DINH).subscribe(res => {
        this.fileQuyetDinhTaoKH = res;
        this.urlFileDownload = res;
        if (this.urlFileDownload.length !== 0) {
          this.tenFileQuyetDinh = this.urlFileDownload[0].fileName;
        }
      }, err => {
        this.alertService.error(err.title);
       });
    } else { }
  }
  changeSumRow() {
    const value = this.taoKehoachForm.value;
    this.sumRow = Number(value.thanhTraChuyenNganhDVSDLD) + Number(value.noiBoCoQuanBHXH) +
                  Number(value.donViSuDungLD) + Number(value.coSoKhamChuaBenh) + Number(value.daiLyThuDaiDienChiTra) +
                  Number(value.lienNganhTT) + Number(value.lienNganhKT);
  }
  getStatus(code) {
    const status = TRANG_THAI_KH.find(el => {
      return el.code === code;
    });
    return status;
  }
  setOffAllButton() {
    this.isSua = false;
    this.isGui = false;
    this.isLuuSua = false;
    this.isCapNhat = false;
    this.isDuyet = false;
    this.isDieuChinh = false;
    this.displayChiTietKH = false;
  }
}
