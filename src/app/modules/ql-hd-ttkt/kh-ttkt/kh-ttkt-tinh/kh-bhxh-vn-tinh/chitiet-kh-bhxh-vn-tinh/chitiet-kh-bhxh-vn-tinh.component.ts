import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { ModalDirective } from 'ngx-bootstrap';
import { sortBy } from 'lodash';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { NoiKehoachDuthaoService } from '../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { NoiAccountService } from '../../../../../../services/api/noi-account/noi-account.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { FILE } from '../../../../../../constants/api-file.constants';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { KeHoachToanNganhService } from '../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { AuthService } from '../../../../../../auth/auth.service';
import { MESS_TAO_KH_TINH } from '../../../../../../constants/message.constants';

@Component({
  selector: 'ttkt-chitiet-kh-bhxh-vn-tinh',
  templateUrl: './chitiet-kh-bhxh-vn-tinh.component.html',
  styleUrls: ['./chitiet-kh-bhxh-vn-tinh.component.scss']
})
export class ChitietKhBhxhVnTinhComponent implements OnInit {
  @ViewChild('lgModal') modal: ModalDirective;
  @ViewChild('printDocument') printDocument: ModalDirective;
  @ViewChild('xinDieuChinh') public xinDieuChinh: ModalDirective;
  @ViewChild('fileQuyetDinhDCKH') fileInputRef1: ElementRef;


  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  chiTietKHBHXHVNForm: FormGroup;
  formXinDieuChinh: FormGroup;
  formModal: FormGroup;
  import: boolean = false;
  isDaDuocDieuChinh: boolean = false;
  xemDieuChinh: boolean = false;
  errFormXinDieuChinh: boolean;
  statusKH: any = false;
  keHoachNam: any;
  lanDieuChinh: any[] = [];
  listKeHoachOldId: any;
  soDuyetDinh: string;
  nguoiki: string;
  nguoiTao: string;
  lyDoDieuChinh: string;
  maxDieuChinh: number = 0;
  tenFileQuyetDinh: any;
  tenFileQDDieuChinh: any;
  currentDC: any;
  account: any;
  tongSo: any;
  fileQuyetDinhDCKH: any;
  urlFileDownload: any;
  keHoachId: any;
  length: any = 0;
  responseData: any = {};
  resData: any = {};
  public chiTietKH: any = {};
  listCurrents: any[] = [];
  listLichSu: any[];
  countLichSu: number;
  isShowBtnLichSu: boolean;
  MAX_SUM_ROW = 1000000;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private noiAccountService: NoiAccountService,
    private alertService: AlertService,
    private fileResource: FileResourceService,
    private timeBuilderService: TimeBuilderService,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private auth: AuthService
  ) { }

  date: Date = new Date();
  modelDate: any = { date: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() } };

  ngOnInit() {
    this.account = this.auth.currentUser;
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.keHoachId = params['id'];
        this.getKeHoach();
        this.getKhOld();
      }
    });
    this.formModal = this.fb.group({
      loiNhanCuaTinh: ['', [Validators.required]],
      inputSend: ['BHXH VN']
    });
    this.chiTietKHBHXHVNForm = this.fb.group({
      soDuyetDinh: [''],
      lanDieuChinh: [''],
      lyDoDieuChinh: [''],
      thanhTraChuyenNganhDVSDLD: [''],
      noiBoCoQuanBHXH: [''],
      donViSuDungLD: [''],
      coSoKhamChuaBenh: [''],
      daiLyThuDaiDienChiTra: [''],
      lienNganh: [''],
    });
    this.formXinDieuChinh = this.fb.group({
      soDuyetDinh: ['', [Validators.required]],
      lyDoDieuChinh: ['', [Validators.required]],
      nguoiKi: ['', [Validators.required]],
      nguoiTao: [this.auth.currentUser.tenHienThi, [Validators.required]],
      ngayDieuChinh: ['', [Validators.required]],
      fileQuyetDinhDCKH: [''],
      thanhTraChuyenNganhDVSDLD: ['', Validators.required],
      noiBoCoQuanBHXH: ['', Validators.required],
      donViSuDungLD: ['', Validators.required],
      coSoKhamChuaBenh: ['', Validators.required],
      daiLyThuDaiDienChiTra: ['', Validators.required],
      lienNganhTT: ['', Validators.required],
      lienNganhKT: ['', Validators.required]
    });
    this.getAllLichSuDieuChinh();
  }

  getKeHoach() {
    this.noiKehoachDuthaoService.getById(this.keHoachId)
      .subscribe(res => {
        this.chiTietKH = res;
        this.keHoachNam = res.keHoachYear;
        console.log(res.chiTietKhTinh);
        this.isDaDuocDieuChinh = res.isDaDuocDieuChinh;
        this.urlFileDownload = JSON.parse(res.fileQuyetDinhTaoKH);
        this.statusKH = res.status;
        this.length = Object.keys(res).length;
        this.lyDoDieuChinh = res.lyDoDieuChinh;
        this.soDuyetDinh = res.soQuyetDinhDieuChinh;
        this.currentDC = res.currentDieuChinh;
        this.chiTietKHBHXHVNForm.patchValue({
          lanDieuChinh: res.currentDieuChinh,
          soDuyetDinh: res.soQuyetDinhDieuChinh,
          lyDoDieuChinh: res.lyDoDieuChinh
        });
        this.responseData.thanhTraChuyenNganhDVSDLD = res.chiTietKhTinh ? res.chiTietKhTinh.thanhTraDvSDLD : '';
        this.responseData.noiBoCoQuanBHXH = res.chiTietKhTinh ? res.chiTietKhTinh.kiemTraBHXH : '';
        this.responseData.donViSDLD = res.chiTietKhTinh.kiemTraDvSDLD;
        this.responseData.coSoKhamChuaBenh = res.chiTietKhTinh.kiemTraCsKCB;
        this.responseData.daiLyThuChiTra = res.chiTietKhTinh.kiemTraDaiLyThuChi;
        this.responseData.lienNganhTT = res.chiTietKhTinh ? res.chiTietKhTinh.lienNganhThanhTra : '';
        this.responseData.lienNganhKT = res.chiTietKhTinh ? res.chiTietKhTinh.lienNganhKiemTra : '';
        this.responseData.tongSo = res.chiTietKhTinh ? res.chiTietKhTinh.tongSo : '';
        if (res.fileQuyetDinhDieuChinh) {
          this.tenFileQDDieuChinh = JSON.parse(res.fileQuyetDinhDieuChinh)[0].fileName;
        }
        if (this.maxDieuChinh < res.currentDieuChinh) {
          this.lanDieuChinh = [];
          this.maxDieuChinh = res.currentDieuChinh;
          for (let i = 0; i < res.currentDieuChinh; i++) {
            this.lanDieuChinh.push(i + 1);
          }
        }
      }, err => {
        console.log(err);
      });
  }
  getKhOld() {
    this.noiKehoachDuthaoService.getKhOld(this.keHoachId)
      .subscribe(res => {
        this.listKeHoachOldId = res;
      }, err => {
        console.log(err);
      });
  }
  onDieuChinh() {
    this.formXinDieuChinh.reset();
    this.formXinDieuChinh.patchValue({
      thanhTraChuyenNganhDVSDLD: this.chiTietKH.chiTietKhTinh ? this.chiTietKH.chiTietKhTinh.thanhTraDvSDLD : '',
      noiBoCoQuanBHXH: this.chiTietKH.chiTietKhTinh ? this.chiTietKH.chiTietKhTinh.kiemTraBHXH : '',
      donViSuDungLD: this.chiTietKH.chiTietKhTinh.kiemTraDvSDLD ? this.chiTietKH.chiTietKhTinh.kiemTraDvSDLD : '',
      coSoKhamChuaBenh: this.chiTietKH.chiTietKhTinh.kiemTraCsKCB ? this.chiTietKH.chiTietKhTinh.kiemTraCsKCB : '',
      daiLyThuDaiDienChiTra: this.chiTietKH.chiTietKhTinh.kiemTraDaiLyThuChi ? this.chiTietKH.chiTietKhTinh.kiemTraDaiLyThuChi : '',
      lienNganhTT: this.chiTietKH.chiTietKhTinh.lienNganhThanhTra ? this.chiTietKH.chiTietKhTinh.lienNganhThanhTra : '',
      lienNganhKT: this.chiTietKH.chiTietKhTinh.lienNganhKiemTra ? this.chiTietKH.chiTietKhTinh.lienNganhKiemTra : '',
      ngayDieuChinh: this.date
    });
    this.formXinDieuChinh.controls.nguoiTao.setValue(this.auth.currentUser.tenHienThi);
    this.tongSo = this.chiTietKH.chiTietKhTinh.tongSo;
    this.errFormXinDieuChinh = false;
    this.xinDieuChinh.show();
  }

  onGui() {
    this.xinDieuChinh.hide();
    this.isDaDuocDieuChinh = true;
    if (!this.formXinDieuChinh.invalid) {
      this.modal.hide();
      const formValue = this.formXinDieuChinh.value;
      this.chiTietKH.soQuyetDinhDieuChinh = formValue.soDuyetDinh;
      this.chiTietKH.nguoiKyQDTaoKeHoach = formValue.nguoiKi;
      this.chiTietKH.tenNguoiTao = formValue.nguoiTao;
      this.chiTietKH.fileQuyetDinhDieuChinh = this.fileResource.getFileString(this.fileQuyetDinhDCKH);
      this.chiTietKH.lyDoDieuChinh = formValue.lyDoDieuChinh;
      this.chiTietKH.chiTietKhTinh.ngayXinDieuChinh = formValue.ngayDieuChinh;
      this.chiTietKH.chiTietKhTinh.thanhTraDvSDLD = formValue.thanhTraChuyenNganhDVSDLD;
      this.chiTietKH.chiTietKhTinh.kiemTraBHXH = formValue.noiBoCoQuanBHXH;
      this.chiTietKH.chiTietKhTinh.kiemTraDvSDLD = formValue.donViSuDungLD;
      this.chiTietKH.chiTietKhTinh.kiemTraCsKCB = formValue.coSoKhamChuaBenh;
      this.chiTietKH.chiTietKhTinh.kiemTraDaiLyThuChi = formValue.daiLyThuDaiDienChiTra;
      this.chiTietKH.chiTietKhTinh.lienNganhKiemTra = formValue.lienNganhKT;
      this.chiTietKH.chiTietKhTinh.lienNganhThanhTra = formValue.lienNganhTT;
      this.chiTietKH.chiTietKhTinh.tongSo = this.tongSo;
      this.chiTietKH.loiNhanCuaTinh = this.formModal.value.loiNhanCuaTinh;
      this.noiKehoachDuthaoService.tinhXinDieuChinhKHTWGiao(this.chiTietKH)
        .subscribe(res => {
          this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-vn/chitiet/' + this.keHoachId]);
          this.alertService.success('Thành công');
          this.onClose();
        }, err => { console.log(err); });
    }
  }

  onClose() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-vn']);
  }

  chonDieuChinh(lanDieuChinh) {
    for (let i = 0; i < this.listKeHoachOldId.length; i++) {
      if (Number(lanDieuChinh) === this.listKeHoachOldId[i].currentDieuChinh) {
        this.keHoachId = this.listKeHoachOldId[i].id;
        break;
      }
    }
    this.getKeHoach();
  }

  onSubmitPrintDocument() {

  }

  upFileQuyetDinhDCKH() {
    const fileEl = this.fileInputRef1.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResource.uploadFile(files, FILE.FILE_QUYET_DINH).subscribe(res => {
        this.fileQuyetDinhDCKH = res;
        if (this.fileQuyetDinhDCKH.length !== 0) {
          this.tenFileQuyetDinh = this.fileQuyetDinhDCKH[0].fileName;
        }
      }, err => {
        this.alertService.error(err.title);
      });
    } else { }
  }

  downLoadFile() {
    this.fileResource.downloadFile(this.urlFileDownload[0].url).subscribe(blob => {
      this.fileResource.saveFile(blob, this.urlFileDownload[0].fileName);
    }, err => { });
  }
  checkValidXinDieuChinh() {
    if (this.formXinDieuChinh.valid && this.fileQuyetDinhDCKH) {
      if (this.tongSo <= this.MAX_SUM_ROW) {
        if (this.tongSo === 0) {
          this.alertService.error("Tổng số không thể bằng không!");
        } else {
          this.modal.show();
        }
      } else {
        this.alertService.error(MESS_TAO_KH_TINH.ERROR_MAX_SUM_ROW + this.MAX_SUM_ROW);
      }
    } else {
      this.alertService.error("Bạn cần điền đầy đủ thông tin!");
    }
  }
  changeTongSo(value) {
    this.tongSo = 0;
    this.tongSo = Number(value.thanhTraChuyenNganhDVSDLD)
      + Number(value.noiBoCoQuanBHXH) + Number(value.donViSuDungLD) + Number(value.coSoKhamChuaBenh)
      + Number(value.daiLyThuDaiDienChiTra) + Number(value.lienNganhTT) + Number(value.lienNganhKT);
  }
  getAllLichSuDieuChinh() {
    this.keHoachToanNganhService.getLichSuDieuChinh(this.keHoachId)
      .subscribe(res => {
        this.listLichSu = res;
        if (res.length > 0) {
          this.countLichSu = res.length;
          this.isShowBtnLichSu = true;
        }
      }, err => {
      });
  }
}
