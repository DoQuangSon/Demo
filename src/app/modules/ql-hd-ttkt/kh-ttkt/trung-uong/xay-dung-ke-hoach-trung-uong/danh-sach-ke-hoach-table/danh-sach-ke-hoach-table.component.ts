import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, Output } from '@angular/core';
// import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { KeHoachToanNganhService } from '../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { NoiGhichuService } from '../../../../../../services/api/noi-ghichu/noi-ghichu.service';
import { NoiDmTinhHuyenService } from '../../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { NoiAccountService } from '../../../../../../services/api/noi-account/noi-account.service';
import {COMMON_SUCCESS_MESS, MESS_TAO_KH_TINH} from '../../../../../../constants/message.constants';
import { FormService } from '../../../../../../shared/form-module/form.service';
import { AuthService } from '../../../../../../auth/auth.service';
import { NoiKehoachDuthaoService } from '../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { StatesService } from '../../../../../../services/api/state.service';

@Component({
  selector: 'ttkt-danh-sach-ke-hoach-table',
  templateUrl: './danh-sach-ke-hoach-table.component.html',
  styleUrls: ['./danh-sach-ke-hoach-table.component.scss']
})
export class DanhSachKeHoachTableComponent implements OnInit, OnChanges {
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('tuChoiModal') public tuChoiModal: ModalDirective;
  @ViewChild('dieuChinhModal') public dieuChinhModal: ModalDirective;
  @ViewChild('editGhichuModal') public editGhichuModal: ModalDirective;
  @Input() public listKeHoach: any[];
  @Input() public tinh: boolean = false;
  @Input() public displayTongSo: Boolean;
  @Input() public pending: Boolean;
  @Input() public kieuKh: number;
  @Input() public coDieuChinh: boolean = false;
  @Input() public editGhichu: boolean;
  @Input() public isDaGiao: boolean;
  @Input() listGhiChu: any[] = [];
  @Input() tienHanhGiao: boolean = false;
  kehoachIndex: number;
  formGroup: FormGroup;
  duyetKehoachForm: FormGroup;
  tuChoiKehoachForm: FormGroup;
  listKeHoachFormArray: FormArray;
  dieuChinhKehoachForm: FormGroup;
  suaGhiChuKehoachForm: FormGroup;
  index: number;
  tongSo: any;
  tongSoTTDVSDLD: number = 0;
  tongSoCQBHXH: number = 0;
  tongSoDVSDLD: number = 0;
  tongSoCSKCB: number = 0;
  tongSoDDTCT: number = 0;
  tongSoLNTT: number = 0;
  tongSoLNKT: number = 0;
  pathURL: any;
  lyDoTuChoi: string;
  editGhiChu: Boolean = false;
  listTinhThanh: any[] = [];
  currentYear = (new Date()).getFullYear();
  dmbhxhid: any;
  tmp: any[] = [];
  sumColumn: number = 11;
  sumOriginal: number;
  tongSoDialog: number;
  MAX_SUM_ROW = 1000000;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private alertService: AlertService,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private noiDmTinhHuyenService: NoiDmTinhHuyenService,
    private statesService: StatesService,
    private router: Router,
    private noiGhichuService: NoiGhichuService,
    private noiAccountService: NoiAccountService,
    public formService: FormService
  ) { }

  ngOnInit() {
    this.calculateColumn(this.tinh, this.pending, this.coDieuChinh);
    this.noiDmTinhHuyenService.getAllDmTinhHuyen(0, 1000)
      .subscribe(res => {
        this.listTinhThanh = res['content'];
      }, err => { });
    this.dmbhxhid = localStorage.getItem('dmbhxhId');
    if (!this.dmbhxhid) {
      this.noiAccountService.getAcount()
        .subscribe(res => {
          this.dmbhxhid = res.dmTinhHuyenId;
        }, err => { });
    }
    this.dieuChinhKehoachForm = this.fb.group({
      id: [''],
      bhxhTinhTp: ['0', Validators.required],
      thanhTraChuyenNganh: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      noiBoCoQuan: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      donViSdld: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      coSoKhamChuaBenh: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      daiLyThu: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      lienNganhTT: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      lienNganhKT: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
    this.suaGhiChuKehoachForm = this.fb.group({
      dmTinhHuyenId: [''],
      ghiChuOfTW: ['', Validators.required],
      keHoachYear: ['']
    });
    this.duyetKehoachForm = this.fb.group({
      id: [''],
      year: ['']
    });
    this.tuChoiKehoachForm = this.fb.group({
      id: [''],
      lyDoTuChoi: ['',Validators.required],
      year: ['']
    });
    this.pathURL = this.router.url.split('/');

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.listKeHoach && Array.isArray(changes.listKeHoach.currentValue)) {
      const data = (<any[]>(changes.listKeHoach.currentValue)).map(kh => this.buildKHForm(kh));
      this.listKeHoach = changes.listKeHoach.currentValue;
      this.tmp = changes.listKeHoach.currentValue;
      this.listKeHoachFormArray = this.fb.array(data);
      this.formGroup = this.fb.group({
        listKeHoach: this.listKeHoachFormArray
      });
      this.tinhTong();
      // this.getTongSoItem(this.tmp);
    }
  }

  buildKHForm(kh: any): FormGroup {
    const form = new FormGroup({});
    for (const key of Object.keys(kh)) {
      form.addControl(key, new FormControl(kh[key]));
    }
    return form;
  }

  duyetKH(id, year) {
    this.duyetModal.show();
    this.index = id;
    this.duyetKehoachForm.patchValue({
      id: id,
      year: year
    });
  }

  duyet() {
    const formValue = this.duyetKehoachForm.value;
    this.keHoachToanNganhService.twDuyetKeHoachTinhGui(formValue.id)
      .subscribe(res => {
        this.getListKeHoachChoDuyet();
        this.alertService.success(COMMON_SUCCESS_MESS.DUYET);
      }, err => { });
    this.duyetModal.hide();
  }

  tuChoiKH(id, year) {
    this.tuChoiKehoachForm.reset();
    
    this.tuChoiModal.show();
    this.index = id;
    this.tuChoiKehoachForm.patchValue({
      id: id,
      year: year
    });
  }

  tuChoi() {
    const formValue = this.tuChoiKehoachForm.value;
    if(this.tuChoiKehoachForm.invalid){
      console.log('form',this.tuChoiKehoachForm);
      this.alertService.error('Bạn cần nhập lý do từ chối!');
      return;
    }
    this.tuChoiModal.hide();
    const formBody: any = {};
    formBody.id = formValue.id;
    formBody.lyDoTuChoiKh = formValue.lyDoTuChoi;
    this.keHoachToanNganhService.twTuChoiKeHoachTinhGui(formBody)
      .subscribe(res => {
        this.getListKeHoachChoDuyet();
        this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh']);
        this.tuChoiKehoachForm.reset();
      }, err => { });
  }

  onChange(formItem: FormGroup) {
    formItem.valueChanges.subscribe(data => {
    });
  }
  getListKeHoachDaDuyet(year) {
    this.keHoachToanNganhService.getListKeHoachTWDaDuyet(year)
      .subscribe(res => {
        this.listKeHoachFormArray = this.fb.array(res);
        this.listKeHoach = res;
      }, err => { });
  }
  getListKeHoachChoDuyet() {
    this.keHoachToanNganhService.getListKeHoachChoTWDuyet()
      .subscribe(res => {
        this.listKeHoachFormArray = this.fb.array(res);
      }, err => { });
  }
  openModalDieuChinh(id) {
    this.dieuChinhKehoachForm.reset();
    this.kehoachIndex = this.listKeHoach.findIndex(el => {
      return el.id === id;
    });
    const kehoach = this.listKeHoach[this.kehoachIndex];
    this.dieuChinhKehoachForm.patchValue({
      id: id,
      bhxhTinhTp: kehoach.tenTinhHuyen,
      thanhTraChuyenNganh: kehoach.chiTietKhTinh.thanhTraDvSDLD,
      noiBoCoQuan: kehoach.chiTietKhTinh.kiemTraBHXH,
      donViSdld: kehoach.chiTietKhTinh.kiemTraDvSDLD,
      coSoKhamChuaBenh: kehoach.chiTietKhTinh.kiemTraCsKCB,
      daiLyThu: kehoach.chiTietKhTinh.kiemTraDaiLyThuChi,
      lienNganhTT: kehoach.chiTietKhTinh.lienNganhThanhTra,
      lienNganhKT: kehoach.chiTietKhTinh.lienNganhKiemTra
    });
    this.tongSoDialog =  kehoach.chiTietKhTinh.tongSo;
    this.dieuChinhModal.show();
  }
  onSubmitDieuChinh() {
    if (this.tongSoDialog <= this.MAX_SUM_ROW) {
      this.mapDataAfterDieuChinh(this.kehoachIndex);
      this.tinhTong();
      // this.alertService.success(COMMON_SUCCESS_MESS.CAP_NHAT);
      this.dieuChinhModal.hide();
    } else {
      this.alertService.error(MESS_TAO_KH_TINH.ERROR_MAX_SUM_ROW + this.MAX_SUM_ROW);
    }
  }
  onCancelDieuChinh() {
    // this.tongSo = this.sumOriginal;
    // this.tinhTong();
    this.dieuChinhModal.hide();
  }

  mapDataAfterDieuChinh(id) {
    if (this.dieuChinhKehoachForm.valid) {
      const formValue = this.dieuChinhKehoachForm.value;
      // this.replaceDuplicateData(formValue);
      // this.listKeHoach = cloneDeep(this.tmp);
      this.listKeHoach[id].tenTinhHuyen = formValue.bhxhTinhTp;
      this.listKeHoach[id].chiTietKhTinh.thanhTraDvSDLD = formValue.thanhTraChuyenNganh;
      this.listKeHoach[id].chiTietKhTinh.kiemTraBHXH = formValue.noiBoCoQuan;
      this.listKeHoach[id].chiTietKhTinh.kiemTraDvSDLD = formValue.donViSdld;
      this.listKeHoach[id].chiTietKhTinh.kiemTraCsKCB = formValue.coSoKhamChuaBenh;
      this.listKeHoach[id].chiTietKhTinh.kiemTraDaiLyThuChi = formValue.daiLyThu;
      this.listKeHoach[id].chiTietKhTinh.lienNganhThanhTra = formValue.lienNganhTT;
      this.listKeHoach[id].chiTietKhTinh.lienNganhKiemTra = formValue.lienNganhKT;
      this.listKeHoach[id].chiTietKhTinh.tongSo = this.tongSoDialog;
      this.listKeHoach = [...this.listKeHoach];
    }
  }

  redirectChitiet(id) {
    console.log(this.kieuKh);
    const urlLength = this.pathURL.length;
    let path = '';
    if (this.kieuKh == 1) {
      if (this.pathURL[urlLength - 2] === 'ke-hoach-cho-duyet' || this.pathURL[urlLength - 2] === 'ds-ke-hoach-da-duyet') {
        path = this.pathURL[this.pathURL.length - 2];
      } else {
        path = this.pathURL[this.pathURL.length - 1];
      }
      this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/' + path + '/ke-hoach-chi-tiet/' + id]);
      return;
    }

    if (this.pathURL[urlLength - 2] === 'giao-ke-hoach-cho-cac-tinh' || this.pathURL[urlLength - 2] === 'ke-hoach-da-giao-cho-tinh') {
      path = this.pathURL[this.pathURL.length - 2];
    } else {
      path = this.pathURL[this.pathURL.length - 1];
    }
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn-giao/' + path + '/ke-hoach-chi-tiet/' + id]);
  }
  openModalEditGhiChu(id, year) {
    const kehoach = this.listKeHoach.find(el => {
      return el.dmTinhHuyenId === id;
    });
    this.suaGhiChuKehoachForm.patchValue({
      dmTinhHuyenId: id,
      ghiChuOfTW: kehoach.ghiChuOfTW ? kehoach.ghiChuOfTW.ghiChuOfTW : '',
      keHoachYear: year
    });
    this.editGhichuModal.show();
  }
  onEditGhichu() {
    const formValue = this.suaGhiChuKehoachForm.value;
    this.noiGhichuService.createNewGhichu(formValue)
      .subscribe(res => {
        this.editGhichuModal.hide();
        this.getListKeHoachDaDuyet(formValue.keHoachYear);
      }, err => { });
  }
  getTinhThanh(id) {
    const tinhThanh = this.listTinhThanh.find(el => {
      return el.id === id;
    });
    return tinhThanh;
  }

  replaceDuplicateData(data) {
    const keHoachDuThaoId = data.id;
    if (this.tmp.length !== 0) {
      for (const i in this.tmp) {
        if (keHoachDuThaoId === this.tmp[i].id) {
          this.tmp[i].chiTietKhTinh.thanhTraDvSDLD = data.thanhTraChuyenNganh;
          this.tmp[i].chiTietKhTinh.kiemTraBHXH = data.noiBoCoQuan;
          this.tmp[i].chiTietKhTinh.kiemTraDvSDLD = data.donViSdld;
          this.tmp[i].chiTietKhTinh.kiemTraCsKCB = data.coSoKhamChuaBenh;
          this.tmp[i].chiTietKhTinh.kiemTraDaiLyThuChi = data.daiLyThu;
          this.tmp[i].chiTietKhTinh.lienNganhKiemTra = data.lienNganhKT;
          this.tmp[i].chiTietKhTinh.lienNganhThanhTra = data.lienNganhTT;
          this.tmp[i].chiTietKhTinh.tongSo = data.lienNganhTT + data.lienNganhKT + data.daiLyThu + data.coSoKhamChuaBenh + data.donViSdld + data.noiBoCoQuan + data.thanhTraChuyenNganh;
          return data = [];
        } else {
          return data = data;
        }
      }
    } else {
      return data = data;
    }
  }

  calculateColumn(tinh, pending, coDieuChinh) {
    if (pending) {
      this.sumColumn += 1;
      if (!tinh) {
        this.sumColumn += 1;
      }
    } else if (!tinh) {
      this.sumColumn += 2;
    }
    if (coDieuChinh) {
      this.sumColumn += 1;
    }
  }
  changeTongSo(value) {
    // this.tongSoDialog = 0;
    // this.tongSoTTDVSDLD = value.thanhTraChuyenNganh;
    // this.tongSoCQBHXH = value.noiBoCoQuan;
    // this.tongSoDVSDLD = value.donViSdld;
    // this.tongSoCSKCB = value.coSoKhamChuaBenh;
    // this.tongSoDDTCT = value.daiLyThu;
    // this.tongSoLNTT = value.lienNganhTT;
    // this.tongSoLNKT = value.lienNganhKT;
    this.tongSoDialog = value.thanhTraChuyenNganh + value.noiBoCoQuan + value.donViSdld + value.coSoKhamChuaBenh
      + value.daiLyThu + value.lienNganhTT + value.lienNganhKT;
  }
  tinhTong() {
    this.initDataTinhTong();
    // debugger
    for (let i = 0; i < this.listKeHoach.length; i++) {
      if (this.listKeHoach[i].chiTietKhTinh !== null || this.listKeHoach[i].chiTietKhTinh !== undefined) {
        this.tongSoTTDVSDLD += this.listKeHoach[i].chiTietKhTinh.thanhTraDvSDLD;
        this.tongSoCQBHXH += this.listKeHoach[i].chiTietKhTinh.kiemTraBHXH;
        this.tongSoDVSDLD += this.listKeHoach[i].chiTietKhTinh.kiemTraCsKCB;
        this.tongSoCSKCB +=  this.listKeHoach[i].chiTietKhTinh.kiemTraDaiLyThuChi;
        this.tongSoDDTCT +=  this.listKeHoach[i].chiTietKhTinh.kiemTraDvSDLD;
        this.tongSoLNTT += this.listKeHoach[i].chiTietKhTinh.lienNganhThanhTra;
        this.tongSoLNKT += this.listKeHoach[i].chiTietKhTinh.lienNganhKiemTra;
      }
    }
    this.tongSo = this.tongSoTTDVSDLD + this.tongSoCQBHXH + this.tongSoDVSDLD + this.tongSoCSKCB
    + this.tongSoDDTCT + this.tongSoLNTT + this.tongSoLNKT;
  }
  initDataTinhTong () {
   this.tongSoTTDVSDLD = 0;
   this.tongSoCQBHXH = 0;
   this.tongSoDVSDLD = 0;
   this.tongSoCSKCB = 0;
   this.tongSoDDTCT = 0;
   this.tongSoLNTT = 0;
   this.tongSoLNKT = 0;
   this.tongSo = 0;
  }
  // getTongSoItem(data) {
  //   this.tongSoTTDVSDLD = 0;
  //   this.tongSoCQBHXH = 0;
  //   this.tongSoCSKCB = 0;
  //   this.tongSoDDTCT = 0;
  //   this.tongSoDVSDLD = 0;
  //   this.tongSoLNTT = 0;
  //   this.tongSoLNKT = 0;
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].chiTietKhTinh) {
  //       this.tongSoTTDVSDLD += data[i].chiTietKhTinh.thanhTraDvSDLD;
  //       this.tongSoCQBHXH += data[i].chiTietKhTinh.kiemTraBHXH;
  //       this.tongSoCSKCB += data[i].chiTietKhTinh.kiemTraCsKCB;
  //       this.tongSoDDTCT += data[i].chiTietKhTinh.kiemTraDaiLyThuChi;
  //       this.tongSoDVSDLD += data[i].chiTietKhTinh.kiemTraDvSDLD;
  //       this.tongSoLNTT += data[i].chiTietKhTinh.lienNganhThanhTra;
  //       this.tongSoLNKT += data[i].chiTietKhTinh.lienNganhKiemTra;
  //       this.tongSo = this.tongSoTTDVSDLD + this.tongSoCQBHXH + this.tongSoDVSDLD + this.tongSoCSKCB
  //         + this.tongSoDDTCT + this.tongSoLNTT + this.tongSoLNKT;
  //     }
  //   }
  // }
}
