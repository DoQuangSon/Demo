
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { KeHoachToanNganhService } from '../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { NoiAccountService } from '../../../../../../services/api/noi-account/noi-account.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { NoiKehoachDuthaoService } from '../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { STATUS } from '../../../../../../constants/status.constants';
import { AlertService } from '../../../../../../services/api/alert.service';
import { FILE } from '../../../../../../constants/api-file.constants';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { MESS_TAO_KH_TINH, COMMON_ERROR_MESS, COMMON_SUCCESS_MESS } from '../../../../../../constants/message.constants';
import { AuthService } from '../../../../../../auth/auth.service';
import { FormService } from '../../../../../../shared/form-module/form.service';

@Component({
  selector: 'ttkt-tao-ke-hoach-tinh',
  templateUrl: './tao-ke-hoach-tinh.component.html',
  styleUrls: ['./tao-ke-hoach-tinh.component.scss']
})
export class TaoKeHoachTinhComponent implements OnInit {
  @ViewChild('lgModal') modal: ModalDirective;
  @ViewChild('printDocument') printDocument: ModalDirective;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('fileQuyetDinhTaoKH') fileInputRef1: ElementRef;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  import = false;
  luuDieuChinh: boolean;
  luuSua: boolean;
  luuTao: boolean;
  nhapExcel: boolean;
  sua: boolean;
  gui: boolean;
  duyet: boolean;
  saved: boolean;
  guiDCTuChoi: boolean;
  disableDieuChinh: boolean;
  disableAllButtons: boolean;
  dong = false;
  formModal: FormGroup;
  taoKehoachForm: FormGroup;
  date: Date = new Date();
  dataService: any = {};
  account: any;
  dataTable: any = {};
  id: any;
  formBody: any = {};
  length: any;
  khDuThaoId: any;
  statusKHRes: any;
  thoiGian: any;
  optionNam: any[] = [];
  fileQuyetDinhTaoKH: any = [];
  tenFileQuyetDinh: any;
  lanDieuChinh: any;
  datePatch: Date = new Date();
  _url: string;
  responseData: any = {};
  sumRow = 0;
  optionSends = [
    { id: 1, name: 'BHXH VN' },
    { id: 2, name: 'BHXH Tỉnh' }
  ];
  modelDate: any = { date: { year: this.datePatch.getFullYear(), month: this.datePatch.getMonth() + 1, day: this.datePatch.getDate() } };
  MAX_SUM_ROW = 1000000;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private noiAccountService: NoiAccountService,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private timeBuilderService: TimeBuilderService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private fileResource: FileResourceService,
    private auth: AuthService,
    private formService: FormService
  ) { }

  ngOnInit() {
    this.setButton('tao');
    this.taoKehoachForm = this.fb.group({
      nam: ['', Validators.required],
      tenKH: ['', [Validators.required]],
      ngayTaoKH: [this.date, [Validators.required]], // [this.modelDate, [Validators.required]],
      soQD: ['', [Validators.required]],
      fileQuyetDinh: [''],
      ngayKyQD: [this.date, [Validators.required]],
      nguoiKyQD: ['', Validators.required],
      nguoiTao: [this.auth.currentUser.tenHienThi, Validators.required],
      thanhTraChuyenNganhDVSDLD: ['', [Validators.required, this.checkNumberDuong]],
      noiBoCoQuanBHXH: ['', [Validators.required, this.checkNumberDuong]],
      donViSuDungLD: ['', [Validators.required, this.checkNumberDuong]],
      coSoKhamChuaBenh: ['', [Validators.required, this.checkNumberDuong]],
      daiLyThuDaiDienChiTra: ['',  [Validators.required, this.checkNumberDuong]],
      lienNganhTT: ['', [Validators.required, this.checkNumberDuong]],
      lienNganhKT: ['',  [Validators.required, this.checkNumberDuong]]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.noiKehoachDuthaoService.getById(params['id'])
          .subscribe(res => {
            this.setButton('dieuchinh');
            this.disableDieuChinh = true;
            this.statusKHRes = res.status;
            this.formBody = res;
            this.fileQuyetDinhTaoKH = res.fileQuyetDinhTaoKH;
            this.tenFileQuyetDinh = JSON.parse(res.fileQuyetDinhTaoKH)[0].fileName;
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
              lienNganhTT: res.chiTietKhTinh.lienNganhThanhTra,
              lienNganhKT: res.chiTietKhTinh.lienNganhKiemTra
            });
            const count = res.chiTietKhTinh;
            this.sumRow = count.thanhTraDvSDLD + count.kiemTraBHXH
            + count.kiemTraDvSDLD + count.kiemTraCsKCB + count.kiemTraDaiLyThuChi + count.lienNganhThanhTra + count.lienNganhKiemTra;
            if (this.statusKHRes === STATUS.STATUS_KHDUTHAO_TINH_CHO_TW_DUYET) {
              this.offAllButton();
              this.duyet = true;
            }
          }, err => { });
      }
    });
    const nam = new Date().getFullYear();
    for (let index = nam; index < nam + 20; index++) {
      this.optionNam.push(index);
    }
    this.account = this.auth.currentUser;

    this.dataService.thanhTraChuyenNganhDVSDLD = '';
    this.dataService.noiBoCoQuanBHXH = '';
    this.dataService.donViSuDungLD = '';
    this.dataService.coSoKhamChuaBenh = '';
    this.dataService.daiLyThuDaiDienChiTra = '';
    this.dataService.lienNganhKT = '';
    this.dataService.lienNganhTT = '';
    this.formModal = this.fb.group({
      noiDungLn: [''],
      inputSend: [''],
      loiNhanCuaTinh: ['', Validators.required]
    });
  }

  onImport() {

  }

  checkNumberDuong(f: AbstractControl) {
    if (f.value >= 0) {
        return null;
    }
    return {duong: true};
  }

  onSua() {
    this.setButton('sua');
    this.keHoachToanNganhService.getKeHoachTWDauNam(this.khDuThaoId)
      .subscribe(res => {
        this.formBody = res;
      }, err => { });
  }
  getById(id) {
    this.noiKehoachDuthaoService.getById(id)
      .subscribe(res => {
        this.responseData = res;
      }, err => { });
  }

  generateData() {
    if (!this.taoKehoachForm.invalid && (this.fileQuyetDinhTaoKH.length !== 0)) {
      const formValue = this.taoKehoachForm.value;
      this.formBody.keHoachYear = formValue.nam;
      this.formBody.tenKeHoach = formValue.tenKH;
      this.formBody.ngayKyQDTaoKeHoach = formValue.ngayKyQD;
      this.formBody.ngayQuyetDinhTaoKeHoach = formValue.ngayTaoKH;
      this.formBody.soQuyetDinhTaoKeHoach = formValue.soQD;
      this.formBody.nguoiKyQDTaoKeHoach = formValue.nguoiKyQD;
      this.formBody.tenNguoiTao = formValue.nguoiTao;
      this.formBody.fileQuyetDinhTaoKH = this.fileResource.getFileString(this.fileQuyetDinhTaoKH);
      this.formBody.dmTinhHuyenId = this.account.dmTinhHuyenId;
      this.formBody.isOwnerTW = false;
      this.formBody.chiTietKhTinh = {
        dmTinhHuyenId: this.account.dmTinhHuyenId,
        kiemTraBHXH: formValue.noiBoCoQuanBHXH,
        kiemTraCsKCB: formValue.coSoKhamChuaBenh,
        kiemTraDaiLyThuChi: formValue.daiLyThuDaiDienChiTra,
        kiemTraDvSDLD: formValue.donViSuDungLD,
        lienNganhThanhTra: formValue.lienNganhTT,
        lienNganhKiemTra: formValue.lienNganhKT,
        thanhTraDvSDLD: formValue.thanhTraChuyenNganhDVSDLD,
        tongSo: this.sumRow
      };
    } else {
      this.alertService.error(MESS_TAO_KH_TINH.ERROR_FILE_QD);
    }
  }

  // ham validate khoang trang
  tenKHSpace = false;
  soQDSpace = false;
  nguoiKyQDSpace = false;
  noWhitespaceValidator(value) {
    return value.trim().length === 0;
  }

  onLuuTaoSua(key) {
    // show msg
    this.formService.touchAllInput(this.taoKehoachForm, true);
    this.disableAllButtons = true;
    const formValue = this.taoKehoachForm.value;
    if (this.noWhitespaceValidator(formValue.tenKH)) {
      this.tenKHSpace = true;
    }
    if (this.noWhitespaceValidator(formValue.soQD)) {
      this.soQDSpace = true;
    }
    if (this.noWhitespaceValidator(formValue.nguoiKyQD)) {
      this.nguoiKyQDSpace = true;
    }

    if (key === 'tao') {
      if (!this.taoKehoachForm.invalid && this.fileQuyetDinhTaoKH.length !== 0) {
        if (this.sumRow <= this.MAX_SUM_ROW) {
          const year = formValue.nam;
          this.generateData();
          this.noiKehoachDuthaoService.createKeHoachTinhDauNam(this.formBody)
            .subscribe(res => {
              this.getById(res.id);
              this.khDuThaoId = res.id;
              this.length = Object.keys(res).length;
              this.offAllButton();
              this.sua = true;
              this.duyet = true;
              this.saved = true;
              this.disableDieuChinh = true;
            }, err => {
              this.disableAllButtons = false;
              // this.alertService.error(err.title);
            });
        } else {
          this.disableAllButtons = false;
          this.alertService.error(MESS_TAO_KH_TINH.ERROR_MAX_SUM_ROW + this.MAX_SUM_ROW);
        }
      } else {
        this.disableAllButtons = false;
        this.alertService.error(COMMON_ERROR_MESS.THIEU_FIELD_REQUIRED);
      }
    } else {
      if (!this.taoKehoachForm.invalid && (this.fileQuyetDinhTaoKH.length !== 0)) {
        if (this.sumRow <= this.MAX_SUM_ROW) {
          const formValue = this.taoKehoachForm.value;
          this.generateData();
          this.noiKehoachDuthaoService.updateNewKhDuthao(this.formBody)
            .subscribe(res => {
              this.getById(res.id);
              this.khDuThaoId = res.id;
              this.length = Object.keys(res).length;
              this.offAllButton();
              this.sua = true;
              this.duyet = true;
              this.saved = true;
            }, err => {
              this.disableAllButtons = false;
            });
        } else {
          this.disableAllButtons = false;
          this.alertService.error(MESS_TAO_KH_TINH.ERROR_MAX_SUM_ROW + this.MAX_SUM_ROW);
        }
      } else {
        this.disableAllButtons = false;
        this.alertService.error(COMMON_ERROR_MESS.THIEU_FIELD_REQUIRED);
      }
    }
  }
  onLuuDieuChinh() {
    this.disableAllButtons = true;
    if (!this.taoKehoachForm.invalid && (this.fileQuyetDinhTaoKH.length !== 0)) {
      const formValue = this.taoKehoachForm.value;
      this.formBody.keHoachYear = formValue.nam;
      this.formBody.tenKeHoach = formValue.tenKH;
      this.formBody.ngayQuyetDinhTaoKeHoach = formValue.ngayTaoKH;
      this.formBody.ngayKyQDTaoKeHoach = formValue.ngayKyQD;
      this.formBody.soQuyetDinhTaoKeHoach = formValue.soQD;
      this.formBody.nguoiKyQDTaoKeHoach = formValue.nguoiKyQD;
      this.formBody.tenNguoiTao = formValue.nguoiTao;
      this.formBody.dmTinhHuyenId = this.account.dmTinhHuyenId;
      this.formBody.isOwnerTW = false;
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

      this.noiKehoachDuthaoService.tinhXinDieuChinhKHTWGiao(this.formBody)
        .subscribe(res => {
          this.alertService.success('Thành công');
          this.khDuThaoId = res.id;
          this.offAllButton();
          this.duyet = true;
          this.saved = true;
        }, err => {
          this.disableAllButtons = false;
          console.log(err);
        });
    } else {
      this.disableAllButtons = false;
      this.alertService.error(COMMON_ERROR_MESS.THIEU_FIELD_REQUIRED);
    }
  }

  onDuyet() {
    this.duyetModal.show();
  }

  onSubmitDuyet() {
    this.disableAllButtons = true;
    this.noiKehoachDuthaoService.tinhDuyetKeHoachDauNam(this.khDuThaoId)
      .subscribe(res => {
        this.offAllButton();
        this.gui = true;
        this.saved = true;
        this.alertService.success(COMMON_SUCCESS_MESS.DUYET);
      }, err => {
        this.disableAllButtons = false;
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
    if (this.taoKehoachForm.invalid || !this.fileQuyetDinhTaoKH ||this.fileQuyetDinhTaoKH.length === 0) {
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

  danhsachdonvi() {
    this.router.navigate(['/ql-hd-ttkt/ql-donvi-ttkt/tinh/ds-donvi']);
  }

  onClose() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/xay-dung-ke-hoach']);
  }

  onSubmitModal() {
    if (this.statusKHRes === STATUS.STATUS_KHDUTHAO_TINH_TW_TU_CHOI_KH) {
      this.modal.hide();
      const formValue = this.taoKehoachForm.value;
      this.formBody.keHoachYear = formValue.nam;
      this.formBody.tenKeHoach = formValue.tenKH;
      this.formBody.ngayQuyetDinhTaoKeHoach = formValue.ngayTaoKH;
      this.formBody.ngayKyQDTaoKeHoach = formValue.ngayKyQD;
      this.formBody.soQuyetDinhTaoKeHoach = formValue.soQD;
      this.formBody.nguoiKyQDTaoKeHoach = formValue.nguoiKyQD;
      this.formBody.tenNguoiTao = formValue.nguoiTao;
      this.formBody.dmTinhHuyenId = this.account.dmTinhHuyenId;
      this.formBody.isOwnerTW = false;
      this.formBody.chiTietKhTinh.dmTinhHuyenId = this.account.dmTinhHuyenId;
      this.formBody.chiTietKhTinh.kiemTraBHXH = formValue.noiBoCoQuanBHXH;
      this.formBody.chiTietKhTinh.kiemTraCsKCB = formValue.coSoKhamChuaBenh;
      this.formBody.chiTietKhTinh.kiemTraDaiLyThuChi = formValue.daiLyThuDaiDienChiTra;
      this.formBody.chiTietKhTinh.kiemTraDvSDLD = formValue.donViSuDungLD;
      this.formBody.chiTietKhTinh.lienNganhThanhTra = formValue.lienNganhTT;
      this.formBody.chiTietKhTinh.lienNganhKiemTra = formValue.lienNganhKT;
      this.formBody.chiTietKhTinh.thanhTraDvSDLD = formValue.thanhTraChuyenNganhDVSDLD;
      this.formBody.chiTietKhTinh.tongSo = this.sumRow;
      this.formBody.loiNhanCuaTinh = this.formModal.value.loiNhanCuaTinh;
      if (typeof this.fileQuyetDinhTaoKH === 'string') {
        this.formBody.fileQuyetDinhTaoKH = this.fileQuyetDinhTaoKH;
      } else {
        this.formBody.fileQuyetDinhTaoKH = this.fileResource.getFileString(this.fileQuyetDinhTaoKH);
      }
      this.noiKehoachDuthaoService.tinhXinDieuChinhKHBiTuChoi(this.formBody)
        .subscribe(res => {
          this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/xay-dung-ke-hoach']);
        }, err => {
          this.alertService.error(COMMON_ERROR_MESS.THU_LAI);
        });
    } else {
      if (!this.formModal.invalid) {
        this.modal.hide();
        const formValue = this.formModal.value;
        const formBody: any = {};
        formBody.id = this.responseData.id;
        formBody.loiNhanCuaTinh = formValue.loiNhanCuaTinh;
        this.noiKehoachDuthaoService.tinhGuiKeHoachDenTW(formBody)
          .subscribe(res => {
            this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/xay-dung-ke-hoach']);
          }, err => {
            this.alertService.error(COMMON_ERROR_MESS.THU_LAI);
          });
      } else {
        this.alertService.error(COMMON_ERROR_MESS.THIEU_LOI_NHAN);
      }
    }
  }

  upFileQuyetDinhTaoKH() {
    const fileEl = this.fileInputRef1.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResource.uploadFile(files, FILE.FILE_QUYET_DINH).subscribe(res => {
        this.fileQuyetDinhTaoKH = res;
        if (this.fileQuyetDinhTaoKH.length !== 0) {
          this.tenFileQuyetDinh = this.fileQuyetDinhTaoKH[0].fileName;
        }
      }, err => {
        this.alertService.error(err.title);
       });
    } else { }
  }

  onSubmitPrintDocument() {
  }

  changeSumRow() {
    const value = this.taoKehoachForm.value;
    this.sumRow = 0;
    this.sumRow = Number(value.thanhTraChuyenNganhDVSDLD) + Number(value.noiBoCoQuanBHXH) +
                  Number(value.donViSuDungLD)             + Number(value.coSoKhamChuaBenh) +
                  Number(value.daiLyThuDaiDienChiTra)     + Number(value.lienNganhTT) +
                  Number(value.lienNganhKT);
  }

  setButton(key) {
    if (key === 'tao') {
      this.offAllButton();
      this.luuTao = true;
      this.nhapExcel = true;
    } else if (key === 'sua') {
      this.offAllButton();
      this.luuSua = true;
      this.nhapExcel = true;
    } else if (key === 'dieuchinh') {
      this.offAllButton();
      this.gui = true;
      this.nhapExcel = true;
    }
  }
  offAllButton() {
    this.luuDieuChinh = false;
    this.luuSua = false;
    this.luuTao = false;
    this.nhapExcel = false;
    this.sua = false;
    this.gui = false;
    this.duyet = false;
    this.saved = false;
    this.disableAllButtons = false;
  }
}
