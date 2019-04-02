import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map as LD_map } from 'lodash';
import { IMyDpOptions } from 'mydatepicker';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';
import { COMMON_SUCCESS_MESS, COMMON_ERROR_MESS } from '../../../../../constants/message.constants';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../constants';
import { NoiLydotuchoitiepcdService } from '../../../../../services/api/noi-lydotuchoitiepcds/noi-lydotuchoitiepcd.service';
import { NoiTiepcongdanService } from '../../../../../services/api/noi-tiepcongdan/noi-tiepcongdan.service';
import { StatesService } from '../../../../../services/api/state.service';
import { NoiAccountService } from '../../../../../services/api/noi-account/noi-account.service';
import { TimeBuilderService } from '../../../../../services/helper/time-builder.service';
import { NoiLichtiepcdService } from '../../../../../services/api/noi-lichtiepcongdan/noi-lichtiepcd.service';
import { AlertService } from '../../../../../services/api/alert.service';
import { FormService } from '../../../../../shared/form-module/form.service';
import { COMMON, CONFIG, TIEPCD } from '../../../../../constants/config.constant';
import { AuthService } from '../../../../../auth/auth.service';
import { DateCompareValidator } from '../../../../../shared/form-module/custom-validattion';

@Component({
  selector: 'ttkt-tiep-cong-dan-form',
  templateUrl: './tiep-cong-dan-form.component.html',
  styleUrls: ['./tiep-cong-dan-form.component.scss']
})
export class TiepCongDanFormComponent implements OnInit {
  @ViewChild('tuChoiModal') tuChoiModal: ModalDirective;
  @ViewChild('kiemTraLichSuModal') kiemTraLichSuModal: ModalDirective;
  @ViewChild('printDocumentModal') printDocumentModal: ModalDirective;
  @ViewChild('themNguoiUQModal') themNguoiUQModal: ModalDirective;
  @Input() source?: Subject<any>;
  @Input() readOnly?: boolean = false;
  account: any = {};
  //timeTiep: any;
  public nguoiUQForm: FormGroup;
  public kiemTraLichSuForm: FormGroup;
  buttonName: string;
  displayNoticeDelete: boolean;
  title: string;
  text: any;
  tiepcdForm: FormGroup;
  soNguoiDT: FormControl;
  lydoTuchoiForm: FormGroup;
  dsSoNguoiDT: FormArray;
  displayNgDT: Boolean = true;
  // displayDSDD: Boolean = false;
  displayUQ: Boolean = true;
  noticeNguoiTiep: Boolean = true;
  noticeDT: Boolean = true;
  public thongTinNguoiUQ: any[] = [];
  public thongTinNguoiUQVangMat: any[] = [];
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  displayNguoiTiep: Boolean = true;
  dsSoNguoiTiep: any[];
  modalOptions = { add: 1, edit: 2, delete: 3 };
  selectedOption: number;
  public currentSoNguoiTiep: number = 0;
  public currentSoNguoiDT: number = 0;
  isSubmit: boolean = false;
  public kiemTraLichSu: any[] = [];
  titleHanhDong: string;
  // public quyenHan: any[] = QUYENHAN;
  public AUTO_COMPLETE_OPTION: any;
  listLydo: any[] = [];
  formBody: any = {};

  _listCanBo: any = [];
  get listCanBo() {
    if (this.tiepcdForm.get('is_tiep_thuong_xuyen').value == 'true') {
      return this._listCanBo.filter(data => data.isLichCanBo);
    }
    //filter voi truong hop can bo vs lanh dao cung 1 nguoi @Todo can lam ro
    return this._listCanBo.filter(function (elem, pos, arr) {
      return arr.findIndex(el => el.id == elem.id) == pos;
    });
  }

  set listCanBo(ls: any) {
    this._listCanBo = ls;
  }

  isChiTiet: boolean = false;
  dmbhxhId: string;
  selectedNguoiDuocTiep: any = {};
  is_tiep_thuong_xuyen: boolean;
  is_doan_dong_nguoi: boolean = false;
  apiFunction: Function;
  constructor(
    private builder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private noiLydotuchoitiepcdService: NoiLydotuchoitiepcdService,
    private noiTiepcongdanService: NoiTiepcongdanService,
    private statesService: StatesService,
    private noiAccountService: NoiAccountService,
    private timeBuilder: TimeBuilderService,
    private _alert: AlertService,
    private lichTiepCD: NoiLichtiepcdService,
    // private validationBuilder: ValidationBuilderService,
    public formService: FormService,
    private auth: AuthService
  ) { }

  dsTenNguoiTiep = [];
  dschucDanhNguoiTiep = [];
  dschucDanhNguoiDT = [];
  noidungLydo: any[] = [];
  CHUCDANH: any[];
  QUYENHAN: any = {};
  CANBO: any[];
  date: Date = new Date();
  ngOnInit() {
    this.date.setHours(0,0,0,0);
    this.statesService.tiepcongdanData.subscribe(res => {
      if (res) {
        // fill data
        console.log(res);
      }
    });
    this.apiFunction = this.noiTiepcongdanService.searchByName.bind(this.noiTiepcongdanService);
    this.dmbhxhId = this.auth.currentUser.donViId;
    this.account = this.auth.currentUser;
    this.tiepcdForm = this.builder.group({
      hoTen: [''],
      soNguoiDT: ['', Validators.required],
      ngayLap: [this.date.toISOString()],
      ngayCoHieuLuc: [''],
      ngayHetHieuLuc: [''],
      soNguoiTiep: ['', Validators.required],
      caNhanTCUQ: ['', [this.formService.nospaceValidator]],
      checkUyQuyen: [''],
      nguoiTiep: this.fb.array([]),
      nguoiDT: this.fb.array([]),
      noidungLydo: [''],
      noidungUyquyen: ['', [this.formService.nospaceValidator]],
      sogiay: ['', [this.formService.nospaceValidator]],
      ngaytiep: [this.date.toISOString(), Validators.required],
      hasThongTinUyQuyen: [''],
      soTheNguoiDT: [''],
      is_tiep_thuong_xuyen: ['true'],
      is_doan_dong_nguoi: false
    });
    this.getListCanBo();
    this.tiepcdForm.get('ngaytiep').valueChanges.subscribe(
      value => {
        if (value !== null) {
          this.lichTiepCD.getListCanBoHomNay(this.dmbhxhId, value).subscribe(res => {
            this.listCanBo = res
              .map(el => {
                return {
                  text: el.tenHienThi,
                  chucDanh: el.chucDanh,
                  id: el.id,
                  isLichCanBo: el.lichCanBo
                };
              });
          }, err => { });
        }
      }
    );
    if (Object.keys(this.account).length === 0) {
      this.noiAccountService.getAcount()
        .subscribe(res => {
          this.account = res;
          this.getListCanBo();
        });
    } else {
      this.getListCanBo();
    }
    this.noiLydotuchoitiepcdService.getAllLydotuchoitiepcds(0, 10)
      .subscribe(res => {
        this.listLydo = res['content'];
      });
    // console.log("---------------------");
    // console.log(this.noidungLydo);

    this.lydoTuchoiForm = this.fb.group({
      lydo1: [''],
      lydo2: [''],
      lydo3: [''],
      lydo4: ['']
    });
    this.kiemTraLichSu = [];
    this.dsSoNguoiDT = this.builder.array([]);

    this.tiepcdForm.valueChanges.subscribe((value => this.updateTableNguoiDuocUyQuyen(value)));

    this.kiemTraLichSuForm = this.builder.group({
      ten: [''],
      soCMT: [''],
      noiDen: [''],
      timNgayDen: [''],
    });
    this.nguoiUQForm = this.fb.group({
      index: [''],
      hoTen: ['', [Validators.required, this.formService.nospaceValidator]],
      // quyenHan: ['', [Validators.required]],
      soCMTNguoiUQ: [''],
      soTheNguoiUQ: [''],
      sdtNguoiUQ: [''],
      diaChi: ['', [Validators.required, this.formService.nospaceValidator]],
      vangMat: ['true']
    });
    this.dsSoNguoiTiep = [];
    this.CHUCDANH = LD_map(COMMON.CHUCDANH, 'name') || [];
    this.CANBO = LD_map(COMMON.CANBO, 'name') || [];
    this.AUTO_COMPLETE_OPTION = CONFIG.AUTO_COMPETED;
    (TIEPCD.QUYENHAN || []).forEach(element => {
      this.QUYENHAN[element.slug] = element;
    });

    if (this.readOnly) {
      this.source.subscribe(res => {
        this.noidungLydo = res.lyDoTuChoiTiepDans;
        this.listLydo.forEach(item => {
          item.isSelected = false;
          for (const item1 of this.noidungLydo) {
            if (item1.lyDoTuChoiId === item.id) {
              item.isSelected = true;
              break;
            }
          }
        });

        // console.log(this.listLydo);
        this.isChiTiet = true;
        this.fillData(res);
      });
    }
  }

  getListCanBo() {
    // tslint:disable-next-line:one-line
    const timeTiep = this.date.toISOString();
    if (timeTiep !== null) {
      this.lichTiepCD.getListCanBoHomNay(this.dmbhxhId, timeTiep).subscribe(res => {
        this.listCanBo = res.map(el => {
          return {
            text: el.tenHienThi,
            chucDanh: el.chucDanh,
            id: el.id,
            isLichCanBo: el.lichCanBo
          };
        });
      }, err => { });
    }
  }

  // tslint:disable-next-line:member-ordering
  canbo: any;
  public refreshCanBo(value: any, i?: number) {
    this.canbo = value;
    this.listCanBo.forEach(element => {
      if (element.id === value.id) {
        (<FormArray>this.tiepcdForm.controls['nguoiTiep']).at(i).patchValue({
          chucDanhNguoiTiep: element.chucDanh
        });
      }
    });
  }

  public removed(value: any) {
    this.canbo = {};
  }

  fillData(data: any) {
    const _data: any = {};
    const ngTieps: any[] = data.ngTieps;
    const soNguoiTiep = ngTieps.length;
    const hasThongTinUyQuyen = data.hasThongTinUyQuyen;
    const giayUyQuyen: any = {};
    const _giayUyQuyen: any = data.giayUyQuyen || {};
    giayUyQuyen.soGiay = _giayUyQuyen.soGiay;
    giayUyQuyen.ngayLap = _giayUyQuyen.ngayLap;
    giayUyQuyen.cntcXacNhan = _giayUyQuyen.cntcXacNhan;
    giayUyQuyen.coHieuLucFrom = _giayUyQuyen.coHieuLucFrom;
    giayUyQuyen.coHieuLucTo = _giayUyQuyen.coHieuLucTo;
    giayUyQuyen.noiDung = _giayUyQuyen.noiDung;
    const ngaytiep = data.ngayTiepDan;
    const ngDuocTieps: any = [];
    data.nguoiDuocTieps.forEach(el => {
      const _el: any = {};
      _el.id = el.congDanId;
      _el.hoTen = el.congDan.hoVaTen;
      _el.chucDanhNguoiDT = el.congDan.chucDanh;
      _el.diaChi = el.congDan.diaChi;
      _el.quyenHan = el.congDan.chucDanh;
      _el.soCMTNguoiDT = el.congDan.soCMTND;
      _el.lichSuNguoiDT = el.soLanDen;
      _el.nguoiduocuyquyen = el.isDuocUyQuyen;
      _el.nguoiuyquyen = el.isNguoiUyQuyen;
      _el.soTheNguoiDT = el.congDan.soThe;
      ngDuocTieps.push(_el);
    });
    _data.is_tiep_thuong_xuyen = String(data.is_tiep_thuong_xuyen);
    _data.ngTieps = ngTieps;
    _data.soNguoiTiep = soNguoiTiep;
    _data.ngDuocTieps = ngDuocTieps;
    _data.hasThongTinUyQuyen = hasThongTinUyQuyen;
    _data.giayUyQuyen = giayUyQuyen;
    _data.ngaytiep = ngaytiep;
    if (data.nguoiUyQuyens) { this.patchValueTableThongTinUQ(data); }
    this.patchTiepcdForm(_data);
  }

  patchValueTableThongTinUQ(data) {
    for (const item of data.nguoiUyQuyens) {
      const _el: any = {};
      _el.id = item.id;
      _el.congDanId = item.congDanId;
      _el.tiepCongDanId = item.tiepCongDanId;
      _el.hoTen = item.congDan.hoVaTen;
      _el.soCMTNguoiDT = item.congDan.soCMTND;
      _el.soTheNguoiDT = item.congDan.soThe;
      _el.chucDanh = item.congDan.chucDanh;
      _el.sdtNguoiUQ = item.congDan.soDienThoai;
      _el.diaChi = item.congDan.diaChi;
      _el.soLanDen = item.congDan.soLanDen;
      this.thongTinNguoiUQ.push(_el);
    }
    for (const item of this.thongTinNguoiUQ) {
      for (const element of data.nguoiDuocTieps) {
        if (element.congDanId === item.congDanId) {
          item.nguoiuyquyen = element.isNguoiUyQuyen;
          item.nguoiduocuyquyen = element.isDuocUyQuyen;
        }
      }
    }
  }

  patchTiepcdForm(data: any) {
    this.tiepcdForm.patchValue({
      // hoTen: 'sdsd',
      is_tiep_thuong_xuyen : data.is_tiep_thuong_xuyen,
      soNguoiDT: data.ngDuocTieps.length,
      soNguoiTiep: data.soNguoiTiep,
      hasThongTinUyQuyen: data.hasThongTinUyQuyen,
      sogiay: data.giayUyQuyen.soGiay,
      ngaytiep: data.ngaytiep,
      ngayLap: this.timeBuilder.fromString(data.giayUyQuyen.ngayLap).toTimeDatePickerValue(),
      caNhanTCUQ: data.giayUyQuyen.cntcXacNhan,
      ngayCoHieuLuc: data.giayUyQuyen.coHieuLucFrom,
      ngayHetHieuLuc: data.giayUyQuyen.coHieuLucTo,
      noidungUyquyen: data.giayUyQuyen.noiDung
    });
    // const hasThongTinUyQuyen = <FormControl> this.tiepcdForm.controls.hasThongTinUyQuyen;
    // hasThongTinUyQuyen.setValue(data.hasThongTinUyQuyen);
    const controlNguoiTiep = <FormArray>this.tiepcdForm.controls.nguoiTiep;
    (data.ngTieps || []).forEach(el => {
      const selectItem: any = [{ id: el.user.id, text: el.user.tenHienThi }] || [];

      controlNguoiTiep.push(this.initSoNguoiTiep({ tenNguoiTiep: selectItem, chucDanhNguoiTiep: el.user.chucDanh.chucDanh }));
    });
    const controlNguoiDT = <FormArray>this.tiepcdForm.controls.nguoiDT;
    (data.ngDuocTieps || []).forEach(el => {
      controlNguoiDT.push(this.initSoNguoiDT({
        id: el.id,
        hoTen: el.hoTen,
        chucDanhNguoiDT: el.chucDanhNguoiDT,
        diaChi: el.diaChi,
        quyenHan: el.quyenHan,
        soCMTNguoiDT: el.soCMTNguoiDT,
        lichSuNguoiDT: el.lichSuNguoiDT,
        nguoiduocuyquyen: el.nguoiduocuyquyen,
        nguoiuyquyen: el.nguoiuyquyen,
        soTheNguoiDT: el.soTheNguoiDT
      }));
    });
  }

  openThemNguoiUQModal() {
    this.nguoiUQForm.reset();
    this.selectedOption = this.modalOptions.add;
    this.themNguoiUQModal.show();
    this.titleHanhDong = 'Thêm';
  }

  addNguoiUQ() {
    if (!this.nguoiUQForm.valid) {
      this.isSubmit = true;
      setTimeout(() => {
        this.isSubmit = false;
      }, 1500);
    } else {
      const formValue = this.nguoiUQForm.value;
      this.thongTinNguoiUQVangMat.push({
        hoTen: formValue.hoTen.trim(),
        // quyenHan: formValue.quyenHan,
        index: this.thongTinNguoiUQVangMat.length,
        soCMTNguoiDT: formValue.soCMTNguoiUQ,
        soTheNguoiDT: formValue.soTheNguoiUQ,
        sdtNguoiUQ: formValue.sdtNguoiUQ,
        diaChi: formValue.diaChi,
        nguoiuyquyen: true,
        vangMat: true
      });
      this.thongTinNguoiUQ.concat(this.thongTinNguoiUQVangMat);
      this.updateTableNguoiDuocUyQuyen();
      this.themNguoiUQModal.hide();
      this._alert.success(COMMON_SUCCESS_MESS.THEM_MOI);
    }
  }

  editNguoiUQ(formItem) {
    this.nguoiUQForm.reset();
    this.selectedOption = this.modalOptions.edit;
    this.titleHanhDong = 'Sửa';
    this.nguoiUQForm.patchValue({
      index: formItem.index,
      hoTen: formItem.hoTen,
      // quyenHan: formItem.quyenHan,
      soCMTNguoiUQ: formItem.soCMTNguoiDT,
      soTheNguoiUQ: formItem.soTheNguoiDT,
      sdtNguoiUQ: formItem.sdtNguoiUQ,
      diaChi: formItem.diaChi,
      nguoiuyquyen: true,
    });
    this.themNguoiUQModal.show();
  }

  updateNguoiUQ() {
    if (!this.nguoiUQForm.valid) {
      this.isSubmit = true;
      setTimeout(() => {
        this.isSubmit = false;
      }, 1500);
    } else {
      const formValue = this.nguoiUQForm.value;
      const index = this.thongTinNguoiUQ.findIndex(item => item.index === formValue.index);
      this.thongTinNguoiUQ[index].hoTen = formValue.hoTen.trim();
      this.thongTinNguoiUQ[index].soCMTNguoiDT = formValue.soCMTNguoiUQ;
      this.thongTinNguoiUQ[index].soTheNguoiDT = formValue.soTheNguoiUQ;
      this.thongTinNguoiUQ[index].sdtNguoiUQ = formValue.sdtNguoiUQ;
      this.thongTinNguoiUQ[index].diaChi = formValue.diaChi;
      this.updateTableNguoiDuocUyQuyen();
      this.themNguoiUQModal.hide();
      this._alert.success(COMMON_SUCCESS_MESS.CAP_NHAT);
    }
  }

  deleteNguoiUQ(formItem) {
    this.selectedOption = this.modalOptions.delete;
    this.titleHanhDong = 'Xóa';
    this.nguoiUQForm.patchValue({
      index: formItem.index,
      hoTen: formItem.hoTen,
      // quyenHan: formItem.quyenHan,
      soCMTNguoiUQ: formItem.soCMTNguoiDT,
      soTheNguoiUQ: formItem.soTheNguoiDT,
      sdtNguoiUQ: formItem.sdtNguoiUQ,
      diaChi: formItem.diaChi
    });
    this.themNguoiUQModal.show();
  }

  confirmDeleteNguoiUQ() {
    const formValue = this.nguoiUQForm.value;
    const index = this.thongTinNguoiUQVangMat.findIndex(item => item.index === formValue.index);
    this.thongTinNguoiUQVangMat.splice(index, 1);
    this.updateTableNguoiDuocUyQuyen();
    this.themNguoiUQModal.hide();
    this._alert.success('xoa thanh cong');
  }

  initSoNguoiTiep(obj = { tenNguoiTiep: '', chucDanhNguoiTiep: '' }): FormGroup {
    return this.fb.group({
      tenNguoiTiep: [obj.tenNguoiTiep, [Validators.required]],
      chucDanhNguoiTiep: [obj.chucDanhNguoiTiep],
    });
  }

  soNguoiTiepChange() {
    if (Number(this.tiepcdForm.value.soNguoiTiep) > this.listCanBo.length) {
      this.tiepcdForm.patchValue({
        soNguoiTiep: this.listCanBo.length
      });
      this.xuLiSoNguoiTiep();
    } else {
      this.xuLiSoNguoiTiep();
    }
  }

  xuLiSoNguoiTiep() {
    const soNguoiTiep = Number(this.tiepcdForm.value.soNguoiTiep);
    const control = <FormArray>this.tiepcdForm.controls.nguoiTiep;
    const l = control.length;

    if (Number.isInteger(soNguoiTiep)) {
      if (this.currentSoNguoiTiep < 0) {
        for (let i = 0; i < soNguoiTiep; i++) {
          control.push(this.initSoNguoiTiep());
        }
      } else {
        let change = this.currentSoNguoiTiep - soNguoiTiep;
        if (change < 0 || change > 0) {
          if (change < 0) {
            while (change !== 0) {
              control.push(this.initSoNguoiTiep());
              change++;
            }
          } else {
            let i = l - 1;
            while (change !== 0 && i >= 0) {
              control.removeAt(i);
              i--;
              change--;
            }
          }
        }
      }
    } else {
      for (let i = l - 1; i >= 0; i--) {
        control.removeAt(i);
      }
    }
    this.currentSoNguoiTiep = soNguoiTiep;
  }

  initSoNguoiDT(obj = {
    id: '', hoTen: '', chucDanhNguoiDT: '', diaChi: '',
    quyenHan: '', soCMTNguoiDT: '', lichSuNguoiDT: '', nguoiduocuyquyen: false,
    nguoiuyquyen: false, soTheNguoiDT: ''
  }): FormGroup {
    const form = this.fb.group({
      id: [obj.id],
      hoTen: [obj.hoTen, [Validators.required]],
      chucDanhNguoiDT: [obj.chucDanhNguoiDT],
      diaChi: [obj.diaChi, Validators.required],
      quyenHan: [obj.quyenHan],
      soCMTNguoiDT: [obj.soCMTNguoiDT],
      lichSuNguoiDT: [obj.lichSuNguoiDT],
      nguoiduocuyquyen: [obj.nguoiduocuyquyen, [Validators.required]],
      nguoiuyquyen: [obj.nguoiuyquyen],
      soTheNguoiDT: [obj.soTheNguoiDT]
    });

    // console.log(form.value);
    return form;
  }

  updateTableNguoiDuocUyQuyen(value?) {
    if (this.isChiTiet === false) {
      if (!value) {
        if (!this.tiepcdForm || !this.tiepcdForm.value) {
          return;
        } else {
          value = this.tiepcdForm.value;
        }
      }
      if (!Array.isArray(this.thongTinNguoiUQ)) {
        this.thongTinNguoiUQ = [];
      }
      if (!Array.isArray(this.thongTinNguoiUQVangMat)) {
        this.thongTinNguoiUQVangMat = [];
      }
      const nguoiUyQuyenDuocTiep = this.filterNguoiDuocUyQuyenDuocTiep(value);
      this.thongTinNguoiUQ = nguoiUyQuyenDuocTiep.concat(this.thongTinNguoiUQVangMat);
    }
  }

  showGiayUyQuyen() {
    const ttUQ = this.tiepcdForm.value.hasThongTinUyQuyen;
    ttUQ ? this.clearValidatorRequired() : this.updateValidator();
  }

  updateValidator() {
    this.tiepcdForm.controls['ngayLap'].setValidators([Validators.required]);
    this.tiepcdForm.controls['caNhanTCUQ'].setValidators([Validators.required]);
    this.tiepcdForm.controls['ngayCoHieuLuc'].setValidators([Validators.required, DateCompareValidator('ngayHetHieuLuc', true)]);
    this.tiepcdForm.controls['ngayHetHieuLuc'].setValidators([Validators.required, DateCompareValidator('ngayCoHieuLuc', false)]);
  }

  clearValidatorRequired() {
    this.tiepcdForm.controls['ngayLap'].disable();
    this.tiepcdForm.controls['caNhanTCUQ'].disable();
    this.tiepcdForm.controls['ngayCoHieuLuc'].disable();
    this.tiepcdForm.controls['ngayHetHieuLuc'].disable();
    this.tiepcdForm.updateValueAndValidity();
  }

  filterNguoiDuocUyQuyenDuocTiep(value): any[] {
    if (value && Array.isArray(value.nguoiDT)) {
      return <any[]>(value.nguoiDT).filter((ndt) => this.isDuocUyQuen(ndt));
    }

    return [];
  }

  isDuocUyQuen(nguoiDuocTiep) {
    return nguoiDuocTiep && nguoiDuocTiep.quyenHan;
  }

  // tslint:disable-next-line:member-ordering
  hasData: boolean = false;
  changeSothe(item: FormGroup) {
    const sothe = item.controls.soTheNguoiDT.value;
    const soCmt = item.controls.soCMTNguoiDT.value || '';
    //item.reset();
    item.patchValue({
      soCMTNguoiDT: soCmt,
      soTheNguoiDT: sothe
    });
    this.noiTiepcongdanService.getCongDanBySo(soCmt, sothe)
      .subscribe(res => {
        if (Object.keys(res).length > 0) {
          this.hasData = true;
          item.patchValue({
            id: res.id ? res.id : '',
            hoTen: res.hoVaTen ? res.hoVaTen : '',
            chucDanhNguoiDT: res.chucDanh ? res.chucDanh : '',
            diaChi: res.diaChi ? res.diaChi : '',
            // quyenHan: 1,
            soCMTNguoiDT: res.soCMTND ? res.soCMTND : '',
            lichSuNguoiDT: res.soLanDen ? res.soLanDen : '',
            // nguoiuyquyen: ,
            soTheNguoiDT: res.soThe ? res.soThe : ''
          });
        }
      }, err => { });
  }

  changeQuenHan(item: FormGroup, value: any, index: any) {
    if (item) {
      if (value === 1) {
        if (item.controls.nguoiduocuyquyen.value) {
          item.patchValue({
            nguoiuyquyen: false,
            quyenHan: value
          });
        } else {
          item.patchValue({
            nguoiuyquyen: false,
            quyenHan: 0
          });
        }
      } else if (value === 2) {
        if (item.controls.nguoiuyquyen.value) {
          item.patchValue({
            nguoiduocuyquyen: false,
            quyenHan: value
          });
        } else {
          item.patchValue({
            nguoiduocuyquyen: false,
            quyenHan: 0
          });
        }
      } else {
        item.patchValue({
          quyenHan: 0
        });
      }
      const length = this.nguoiDTs.length;
      let disable = false;
      for (let i = 0; i < length; i++) {
        if (this.nguoiDTs.at(i).get('nguoiduocuyquyen').value) {
          index = i;
          disable = true;
        }
      }
      for (let i = 0; i < length; i++) {
        if (disable) {
          if (index !== i) {
            this.nguoiDTs.at(i).get('nguoiduocuyquyen').disable();
          }
        } else {
          this.nguoiDTs.at(i).get('nguoiduocuyquyen').enable();
        }
      }
    }
  }
  unCheck() {
    const isDDN = !(this.tiepcdForm.value.is_doan_dong_nguoi === 'true');

    if (isDDN) {
      this.tiepcdForm.get('soNguoiDT').setValidators([Validators.min(5)]);
      this.tiepcdForm.get('soNguoiDT').markAsTouched();
      this.text = 'Bạn phải nhập số lớn hơn hoặc bằng 5';
    } else {
      this.tiepcdForm.get('soNguoiDT').clearValidators();
      this.tiepcdForm.get('soNguoiDT').updateValueAndValidity();
    }
    this.tiepcdForm.patchValue({
      is_doan_dong_nguoi: isDDN ? 'true' : 'false'
    });
  }
  doanDNChange() {
    const soNguoiDT = Number(this.tiepcdForm.value.soNguoiDT);

    if (this.tiepcdForm.value.is_doan_dong_nguoi === true && soNguoiDT < 5) {
      this.tiepcdForm.get('soNguoiDT').setValidators([Validators.min(5)]);
      this.tiepcdForm.get('soNguoiDT').markAsTouched();
      this.text = 'Bạn phải nhập số lớn hơn hoặc bằng 5';
    } else if (this.tiepcdForm.value.is_doan_dong_nguoi === false && soNguoiDT === 0) {
      this.tiepcdForm.get('soNguoiDT').setValidators([Validators.min(1)]);
      this.tiepcdForm.get('soNguoiDT').markAsTouched();
      this.text = 'Bạn phải nhập số lớn hơn hoặc bằng 1';
    }
  }
  soNguoiDTChange() {
    const soNguoiDT = Number(this.tiepcdForm.value.soNguoiDT);
    const control = <FormArray>this.tiepcdForm.controls.nguoiDT;
    const l = control.length;
    if (Number.isInteger(soNguoiDT)) {
      if (this.currentSoNguoiDT < 0) {
        for (let i = 0; i < soNguoiDT; i++) {
          control.push(this.initSoNguoiDT());
        }
      } else {
        let change = this.currentSoNguoiDT - soNguoiDT;
        if (change < 0 || change > 0) {
          if (change < 0) {
            while (change !== 0) {
              control.push(this.initSoNguoiDT());
              change++;
            }
          } else {
            let i = l - 1;
            while (change !== 0 && i >= 0) {
              control.removeAt(i);
              i--;
              change--;
            }
          }
        }
      }
    } else {
      for (let i = l - 1; i >= 0; i--) {
        control.removeAt(i);
      }
    }
    this.currentSoNguoiDT = soNguoiDT;
  }



  PopUpKiemTraLichSu(item) {
    const congDanID = item.controls.id.value;
    this.selectedNguoiDuocTiep.hoTen = item.controls.hoTen.value;
    this.selectedNguoiDuocTiep.soCMT = item.controls.soCMTNguoiDT.value;
    // console.log(congDanID);
    this.noiTiepcongdanService.getTiepCongDanInforByCongDanID(congDanID).subscribe(res => {
      console.log(res);

      for (const res_item of res) {
        const infor: any = {};
        infor.ngayDen = res_item.ngayTiepDan;
        infor.noiDen = res_item.tenDonViTiepDan;
        infor.noiDung = res_item.tenPhanLoaiNoiDung;
        if (res_item.isTuChoi) {
          infor.trangThai = 'Đã từ chối';
        } else if (res_item.isDaGiaiQuyet) {
          infor.trangThai = 'Đã giải quyết';
        } else {
          infor.trangThai = 'Không xác định';
        }
        this.kiemTraLichSu.push(infor);
        this.kiemTraLichSu.sort((item1, item2) => {
          if (new Date(item1.ngayDen) > new Date(item2.ngayDen)) {
            return -1;
          }
          return 1;
        });
      }
    });
    this.title = 'Lịch sử Công dân đến Khiếu nại, Tố cáo';
    this.displayNoticeDelete = true;
    this.kiemTraLichSuModal.show();
    const searchForm: any = {};
    searchForm.congDanId = '';
    searchForm.ngayDen = '';
    searchForm.noiDen = '';
  }

  PopUpTuChoi() {
    this.formService.touchAllInput(this.tiepcdForm);
    if (this.tiepcdForm.invalid) {
      console.log(this.formService.getErrorList(this.tiepcdForm));
      return;
    }
    this.title = 'Chọn lý do từ chối tiếp công dân';
    this.displayNoticeDelete = true;
    this.tuChoiModal.show();
  }

  close() {
    this.tuChoiModal.hide();
    this.kiemTraLichSuModal.hide();
  }

  openLichTiepCD() {
    this.router.navigate(['/ql-tiep-cd/lich-tiep-cong-dan']);
  }
  openTienHanhTiepCD() {
    const soNguoiDT = Number(this.tiepcdForm.value.soNguoiDT);
    this.formService.touchAllInput(this.tiepcdForm, true);
    console.log(this.tiepcdForm);
    if (this.tiepcdForm.invalid || soNguoiDT < 1) {
      console.log(this.tiepcdForm.value);
      console.log(this.formService.getErrorList(this.tiepcdForm));
      this._alert.error(COMMON_ERROR_MESS.THIEU_FIELD_REQUIRED);
      return;
    } else {
      this.createFormBody();
      this.statesService.emitTransferDataTiepCdToComponent(this.formBody);
      this.router.navigate(['/ql-tiep-cd/tiep-cong-dan/tien-hanh-tiep-cd']);
    }
  }

  createFormBody() {
    const formValue = this.tiepcdForm.value;
    const giayUyQuyen: any = {};
    const hlfrom = this.timeBuilder.fromTimeDatePicker(formValue.ngayCoHieuLuc).setUTC().toISOString();
    const hlto = this.timeBuilder.fromTimeDatePicker(formValue.ngayHetHieuLuc).setUTC().toISOString();
    const dateNgaylap = this.timeBuilder.fromTimeDatePicker(formValue.ngayLap).setUTC().toISOString();
    const dateNgaytiepdan = formValue.ngaytiep;

    const arrNguoitieps: any[] = [];
    for (const item of formValue.nguoiTiep) {
      const nguoitiep: any = {};
      nguoitiep.user = {
        id: item.tenNguoiTiep[0].id
      };
      arrNguoitieps.push(nguoitiep);
    }
    const arrNguoiduoctieps: any[] = [];
    for (const el of formValue.nguoiDT) {
      const _el: any = {};
      _el.congDan = {
        id: el.id ? el.id : '',
        chucDanh: el.chucDanhNguoiDT,
        diaChi: el.diaChi,
        hoVaTen: el.hoTen,
        soCMTND: el.soCMTNguoiDT,
        soThe: el.soTheNguoiDT
      };
      _el.isDuocUyQuyen = el.nguoiduocuyquyen;
      _el.isNguoiUyQuyen = el.nguoiuyquyen;
      _el.soLanDen = el.lichSuNguoiDT ? el.lichSuNguoiDT : 1;
      arrNguoiduoctieps.push(_el);
    }
    const arrttUyquens: any[] = [];

    for (const item of this.thongTinNguoiUQ) {
      const nguoiUQ: any = {};
      nguoiUQ.congDan = {
        id: item.id ? item.id : '',
        chucDanh: item.chucDanhNguoiDT,
        diaChi: item.diaChi,
        hoVaTen: item.hoTen,
        soCMTND: item.soCMTNguoiDT,
        soThe: item.soTheNguoiDT,
        soDienThoai: item.sdtNguoiUQ
      };
      nguoiUQ.isDuocUyQuyen = this.thongTinNguoiUQ[0].nguoiduocuyquyen;
      nguoiUQ.isNguoiUyQuyen = this.thongTinNguoiUQ[0].nguoiuyquyen;
      arrttUyquens.push(nguoiUQ);
    }

    giayUyQuyen.cntcXacNhan = formValue.caNhanTCUQ;
    giayUyQuyen.coHieuLucFrom = hlfrom;
    giayUyQuyen.coHieuLucTo = hlto;
    giayUyQuyen.ngayLap = dateNgaylap;
    giayUyQuyen.noiDung = formValue.noidungUyquyen;
    giayUyQuyen.soGiay = formValue.sogiay;

    if (this.tiepcdForm.value.hasThongTinUyQuyen === true) {
      this.formBody.giayUyQuyen = giayUyQuyen;
    }
    this.formBody.ngTieps = arrNguoitieps;
    this.formBody.nguoiDuocTieps = arrNguoiduoctieps;
    this.formBody.nguoiUyQuyens = arrttUyquens;
    this.formBody.ngayTiepDan = dateNgaytiepdan;
    this.formBody.createBy = { 'id': this.account.id };
    this.formBody.donViTiepDan = { 'id': this.account.donViId };
    // this.formBody.daGiaiQuyet = false;
    // this.formBody.isDaGiaiQuyet = false;
    this.formBody.hasThongTinUyQuyen = formValue.hasThongTinUyQuyen;
    this.formBody.is_doan_dong_nguoi = formValue.is_doan_dong_nguoi;
    this.formBody.is_tiep_thuong_xuyen = formValue.is_tiep_thuong_xuyen;
  }

  onChoose() {
    this.noidungLydo = [];
    this.createFormBody();
    const formValue = this.lydoTuchoiForm.value;
    if (!formValue.lydo1 && !formValue.lydo2 && !formValue.lydo3 && !formValue.lydo4) {
      this.noidungLydo = [];
      this._alert.error('Bạn phải chọn ít nhất 1 lý do!');
      return;
    }
    if (formValue.lydo1) {
      this.noidungLydo.push(this.listLydo[0]);
    }
    if (formValue.lydo2) {
      this.noidungLydo.push(this.listLydo[1]);
    }
    if (formValue.lydo3) {
      this.noidungLydo.push(this.listLydo[2]);
    }
    if (formValue.lydo4) {
      this.noidungLydo.push(this.listLydo[3]);
    }
    console.log(this.noidungLydo);
    this.tiepcdForm.patchValue({
      noidungLydo: this.noidungLydo
    });
    const arrlydos: any[] = [];
    this.noidungLydo.forEach(el => {
      const lydo: any = {};
      lydo.id = el.id;
      arrlydos.push({
        lyDoTuChoi: lydo
      });
    });
    this.formBody.lyDoTuChoiTiepDans = arrlydos;
    this.formBody.isTuChoi = true;
    this.formBody.tuChoi = true;
    this.formBody.actived = true;
    this.formBody.isDaGiaiQuyet = true;
    this.noiTiepcongdanService.createNewCongdan(this.formBody)
      .subscribe(res => {
        this.router.navigate(['/ql-tiep-cd/ls-tiep-cd']);
        this._alert.success('Đã từ chối tiếp công dân!', { delay: 1000 });
      }, err => {
        this._alert.success('Từ chối tiếp công dân thất bại!');
      });
    this.tuChoiModal.hide();
  }

  get formData() {
    return <FormArray>this.tiepcdForm.get('nguoiTiep');
  }
  get nguoiDTs(): FormArray {
    return this.tiepcdForm.get('nguoiDT') as FormArray;
  }
  changeNgayTiep() {
    this.getListCanBo();
  }

  hoTenSelected(event, index: any) {
    console.log(event);
    const controlNguoiDT = <FormArray>this.tiepcdForm.get('nguoiDT');
    controlNguoiDT.at(index).patchValue({
      hoTen: event.data.hoVaTen,
      chucDanhNguoiDT: event.data.chucDanh,
      diaChi: event.data.diaChi,
      soCMTNguoiDT: event.data.soCMTND,
      soTheNguoiDT: event.data.soThe
    })
  }
}

