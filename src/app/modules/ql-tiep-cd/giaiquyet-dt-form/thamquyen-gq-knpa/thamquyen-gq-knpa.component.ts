import { AUTHORITY, ACCOUNTTYPE, TINH_OPTION, TW_OPTION, AU_OPTION, HUYEN_OPTION, SIGNATURE, IS_ENOUGH_CONDITION, COMPLEX, AUTHORITYOPTION } from './../../../../constants/giaiquyet-dt.constants';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { NoiKiennghiPaService } from '../../../../services/api/noi-dtKiennghiPA/noi-kiennghi-pa.service';
import { StatesService } from '../../../../services/api/state.service';
import { AlertService } from '../../../../services/api/alert.service';
import { TimeBuilderService } from '../../../../services/helper/time-builder.service';
import { NoiDmbhxhService } from '../../../../services/api/danh-muc/noi-dmbhxh/noi-dmbhxh.service';
import { DonViNghiepVuService } from '../../../../services/api/danh-muc/dmDviNghiepVu/dvi-nghiep-vu.service';
import { NoiAccountService } from '../../../../services/api/noi-account/noi-account.service';
import { setValue, pickBy } from '../../../../services/api/utils/utils.service';
import { AuthService } from '../../../../auth/auth.service';
import { FormService } from '../../../../shared/form-module/form.service';
import { PopUpPrintComponent } from '../pop-up-print/pop-up-print.component';

@Component({
  selector: 'ttkt-thamquyen-gq-knpa',
  templateUrl: './thamquyen-gq-knpa.component.html',
  styleUrls: ['./thamquyen-gq-knpa.component.scss']
})
export class ThamquyenGqKnpaComponent implements OnInit {
  @ViewChild('printDocument') printDocument: ModalDirective;
  @Input() formQiaiquyetDt: FormGroup;
  @Input() isExisted?: boolean = false;
  @Input() source?: Subject<any>;
  @Input() preview?: boolean = false;
  @Input() editAble?: boolean = true;
  show_Pop_Up_Print = false;
  @Output('onSubmitted') onSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  ObjectAuthorityForm: any;
  authority: any;
  authorityForm: FormGroup;
  accountType: any;
  twOption: any;
  tinhOption: any;
  huyenOption: any;
  dvnvOptions: any = [];
  tinh: any = {};
  huyen: any = {};
  donViNghiepVu: any;

  depend_authority: any;
  no_depend_authority: any;

  accountType_tw: any;
  accountType_tinh: any;
  accountType_huyen: any;

  twOption_thamquyen: any;
  twOption_tinh: any;
  twOption_Hd: any;

  auOption_congvan: any;
  auOption_nghiepvu: any;
  auOption_tructiep: any;
  auOption_phongban: any;

  tinhOption_thamquyen: any;
  tinhOption_huyen: any;
  tinhOption_Hd: any;

  account: any;

  huyenOption_nghiepvu: any;
  huyenOption_thamquyen: any;
  huyenOption_Hd: any;

  authorityOption: any;

  provinces: any = [
  ];
  districts: any = [
  ];
  saveLetter: boolean = false;
  // complex_yes: any;
  // complex_no: any;
  signature_one: any;
  signature_many: any;
  signature_none: any;

  chua_giaiQuyet: any;
  lanDau_giaiQuyet: any;
  NhieuLan_giaiQuyet: any;

  date: Date = new Date();

  enough_condition: any;
  no_enough_condition: any;
  private status: number = 1;
  private rootPage: string = 'ql-tiep-cd/gq-kt/danh-sach-don-thu';
  private data: any = {};
  constructor(
    private fb: FormBuilder,
    private noiKiennghiPaService: NoiKiennghiPaService,
    private statesService: StatesService,
    private noiAccountService: NoiAccountService,
    private router: Router,
    private _alert: AlertService,
    private timeBuilder: TimeBuilderService,
    private noiDmbhxhService: NoiDmbhxhService,
    private noiDon: DonViNghiepVuService,
    private formService: FormService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.date.setHours(0,0,0,0);
    this.noiDon.getAllDonViNghiepVu(0, 1000).subscribe(res => {
      console.log(res);
      this.dvnvOptions = res.content.map(el => ({
        id: el.id,
        text: el.tenNghiepVu
      }));
    });

    if (this.preview) {
      this.loadTypeAccount()
        .then(this.loadSource.bind(this)) // patch param.source for fillData function
        .then(this.loadDMBHXH.bind(this))
        .then(this.loadDMBHXHByMaCha.bind(this))
        .then(this.fillData.bind(this));
    } else {
      this.loadTypeAccount()
        .then(this.loadDMBHXH.bind(this))
        .then(this.loadDMBHXHByMaCha.bind(this));
    }

    if (Object.keys(this.account).length === 0) {
      this.noiAccountService.getAcount()
        .subscribe(res => {
          this.account = res;
        });
    }
    this.ObjectAuthorityForm = {
      authority: ['', Validators.required],
      twOption: ['', this.checkConditionRequiredForm.bind(this)],
      tinhOption: ['', this.checkConditionRequiredForm.bind(this)],
      huyenOption: ['', this.checkConditionRequiredForm.bind(this)],
      lanGiaiQuyet: [AUTHORITYOPTION.no_giaiquyet.toString(), this.checkConditionRequiredForm.bind(this)],
      authorityOption: ['', this.checkConditionRequiredForm.bind(this)],
      condition: [IS_ENOUGH_CONDITION.ENOUGH_CONDITION.toString(), Validators.required],
      // complex: [COMPLEX.cophuctap.toString()],
      signature: [SIGNATURE.motnguoi.toString(), Validators.required],
      saveLetter: ['', this.checkConditionRequired.bind(this)],
      soCongvanTraloi: ['', this.checkConditionRequiredForm.bind(this)],
      dateCongvanTraloi: [this.date.toISOString(), this.checkConditionRequiredForm.bind(this)],
      ndCongvanTraloi: ['', this.checkConditionRequiredForm.bind(this)],
      noidenCongvanTraloi: ['', this.checkConditionRequiredForm.bind(this)],
      chuyenDenCqctqName: ['', this.checkConditionRequiredForm.bind(this)],
      chuyenDenDMBHXH: ['', this.checkConditionRequiredForm.bind(this)],
      chuyenDenDVNV: ['', this.checkConditionRequiredForm.bind(this)],
      // nameCqtinh: ['']
      // ndKetluan: [''],
      // dateKetluan: [''],
      // soKetluan: ['']
    };
    this.authorityForm = this.fb.group(this.ObjectAuthorityForm);
    this.enough_condition = IS_ENOUGH_CONDITION.ENOUGH_CONDITION;
    this.no_enough_condition = IS_ENOUGH_CONDITION.NO_ENOUGH_CONDITION;
    // this.complex_yes = COMPLEX.cophuctap;
    // this.complex_no = COMPLEX.khongphuctap;
    this.signature_one = SIGNATURE.motnguoi;
    this.signature_many = SIGNATURE.nhieunguoi;
    this.signature_none = SIGNATURE.nacdanh;

    this.chua_giaiQuyet = AUTHORITYOPTION.no_giaiquyet;
    this.lanDau_giaiQuyet = AUTHORITYOPTION.giaiquyet_mot;
    this.NhieuLan_giaiQuyet = AUTHORITYOPTION.giaiquyet_nhieu;

    this.accountType = localStorage.getItem('accountType');
    this.depend_authority = AUTHORITY.thuoc_tq;
    this.no_depend_authority = AUTHORITY.khongthuoc_tq;
    this.accountType_tw = ACCOUNTTYPE.trunguong;
    this.accountType_tinh = ACCOUNTTYPE.tinh;
    this.accountType_huyen = ACCOUNTTYPE.huyen;

    this.tinhOption_thamquyen = TINH_OPTION.cd_thamquyen;
    this.tinhOption_huyen = TINH_OPTION.cd_huyen;
    this.tinhOption_Hd = TINH_OPTION.cd_Hd;

    this.twOption_thamquyen = TW_OPTION.cd_thamquyen;
    this.twOption_tinh = TW_OPTION.cd_tinh;
    this.twOption_Hd = TW_OPTION.cd_Hd;

    this.huyenOption_nghiepvu = HUYEN_OPTION.cd_nghiepvu;
    this.huyenOption_thamquyen = HUYEN_OPTION.cd_thamquyen;
    this.huyenOption_Hd = HUYEN_OPTION.cd_Hd;

    this.auOption_congvan = AU_OPTION.au_congvan;
    this.auOption_nghiepvu = AU_OPTION.au_nghiepvu;
    this.auOption_tructiep = AU_OPTION.au_tructiep;
    this.auOption_phongban = AU_OPTION.au_phongban;

    // this.toogleValidateKNPA();
  }

  loadTypeAccount(param: any = {}) {
    return new Promise((resolve) => {
      this.account = this.auth.currentUser;
      param = { ...param, account: this.account };
      resolve(param);
    });
  }

  loadDMBHXH(param: any = {}) {
    const _this = this;
    return new Promise((resolve) => {
      _this.noiDmbhxhService.getAllDmBhxh(0, 1000)
        .subscribe(resDmBHXH => {
          const arr = resDmBHXH['content'];
          if (Array.isArray(arr)) {
            _this.provinces = arr.map(el => {
              const _el: any = {};
              _el.id = el.id;
              _el.text = el.tenDonVi;
              return _el;
            });
          }
          param = { ...param, dmBHXHTinh: resDmBHXH };
          resolve(param);
        }
        );
    });
  }

  loadDMBHXHByMaCha(param: any = {}) {
    const _this = this;
    const maCha = param.account.maDonVi;
    return new Promise((resolve) => {
      _this.noiDmbhxhService.getDmBHXHBymaCha(maCha)
        .subscribe(res => {
          console.log(res);
          const arr = res;
          if (arr.length > 0) {
            _this.districts = arr.map(el => {
              const _el: any = {};
              _el.id = el.id;
              _el.text = el.tenDonVi;
              return _el;
            });
          }
          param = { ...param, dmBHXHHuyen: res };
          resolve(param);
        }
        );
    });
  }

  loadSource(param: any = {}) {
    const _this = this;
    return new Promise((resolve) => {
      _this.source.subscribe(res => {
        param = { ...param, source: res };
        resolve(param);
      });
    });
  }
  fillData(param: any = {}) {
    const data = param.source || {};
    const _data: any = {};
    const detail = data.detail || {};
    const saveLetter = setValue(detail.donThu.luuDon, [{ key: true, value: 1 }, { key: false, value: 2 }]);
    let signature;
    if (detail.donThu.isChuKyMotNguoi === true && detail.donThu.isNacDanh === false) {
      signature = '1';
    } else if (detail.donThu.isChuKyMotNguoi === false && detail.donThu.isNacDanh === false) {
      signature = '2';
    } else if (detail.donThu.isChuKyMotNguoi === true && detail.donThu.isNacDanh === true) {
      signature = '3';
    }
    // const complex = setValue(detail.donThu.isDonPhucTap, [{key: true, value: '1'},  {key: false, value: '2'}]);
    const condition = setValue(detail.donThu.isDuDieuKienXuLy, [{ key: true, value: 1 }, { key: false, value: 2 }]);
    const authority = setValue(detail.donThu.isThuocThamQuyen, [{ key: true, value: '1' }, { key: false, value: '2' }]);
    const lanGiaiQuyet = detail.isGiaiQuyetLanDau;
    const authorityOption = '' + detail.hasCongVanTraLoi;
    const soCongvanTraloi = detail.soCongVanTraLoi;
    const dateCongvanTraloi = data.detail.ngayCongVanTraLoi;
    const ndCongvanTraloi = detail.noiDungCongVanTraLoi;
    const noidenCongvanTraloi = detail.noiDenCongVanTraLoi;
    if (this.accountType === this.accountType_tw) {
      this.twOption = '' + detail.isChuyenDenCQCTQ;
    } else if (this.accountType === this.accountType_tinh) {
      this.tinhOption = '' + detail.isChuyenDenCQCTQ;
    } else if (this.accountType === this.accountType_huyen) {
      this.huyenOption = '' + detail.isChuyenDenCQCTQ;
    }
    const chuyenDenCqctqName = detail.chuyenDenCqctqName || '';
    const chuyenDenDMBHXH = [{
      id: detail.dmBHXHId || '',
      text: detail.tenDmBHXH || ''
    }];
    // const chuyenDenDVNV = [{
    //   id: detail.donViNghiepVuId || '',
    //   text: detail.tenNghiepVu || ''
    // }];

    const chuyenDenDVNV = [];
    chuyenDenDVNV.push(this.dvnvOptions.find(item => item.id === detail.donViNghiepVuId));

    const id = detail.id || null;
    const donThu: any = {};
    donThu.id = detail.donThuId;
    // _data.complex = complex;
    _data.signature = signature;
    _data.condition = condition;
    _data.saveLetter = saveLetter;
    _data.authority = authority;
    _data.lanGiaiQuyet = lanGiaiQuyet;
    _data.authorityOption = authorityOption;
    _data.soCongvanTraloi = soCongvanTraloi;
    _data.dateCongvanTraloi = dateCongvanTraloi;
    _data.ndCongvanTraloi = ndCongvanTraloi;
    _data.noidenCongvanTraloi = noidenCongvanTraloi;
    _data.donThu = donThu;
    _data.id = id;
    _data.tinhOption = this.tinhOption;
    _data.twOption = this.twOption;
    _data.huyenOption = this.huyenOption;
    _data.chuyenDenDMBHXH = chuyenDenDMBHXH;
    _data.chuyenDenDVNV = chuyenDenDVNV;
    _data.chuyenDenCqctqName = chuyenDenCqctqName;
    this.data = _data;
    this.patchData(_data);
  }
  patchData(data: any) {
    this.authorityForm.patchValue({
      // complex: data.complex,
      lanGiaiQuyet: String(data.lanGiaiQuyet),
      signature: data.signature,
      condition: String(data.condition),
      authority: data.authority,
      saveLetter: data.saveLetter
    });
    this.onChangeCondition();
    this.changeAuthority();
    this.authorityOption = data.authorityOption;
    this.authorityForm.patchValue({
      authorityOption: data.authorityOption,
      soCongvanTraloi: data.soCongvanTraloi,
      dateCongvanTraloi: data.dateCongvanTraloi,
      ndCongvanTraloi: data.ndCongvanTraloi,
      noidenCongvanTraloi: data.noidenCongvanTraloi,
      tinhOption: data.tinhOption,
      twOption: data.twOption,
      huyenOption: data.huyenOption,
      chuyenDenCqctqName: data.chuyenDenCqctqName,
      chuyenDenDMBHXH: data.chuyenDenDMBHXH,
      chuyenDenDVNV: data.chuyenDenDVNV
    });
  }
  changeAuthority() {
    this.authority = this.authorityForm.value.authority;
    console.log(this.authorityForm.value);
    this.authorityOption = AU_OPTION.au_nghiepvu;
    if (Number(this.authority) === Number(this.depend_authority)) {
      this.authorityForm.patchValue({
        authorityOption: AU_OPTION.au_nghiepvu,
        twOption: null,
        tinhOption: null,
        huyenOption: null
      });
      this.saveLetter = false;
    } else if (Number(this.authority) === Number(this.no_depend_authority)) {
      this.authorityForm.patchValue({
        twOption: null,
        tinhOption: null,
        huyenOption: null
      });
    }
  }


  onSubmit() {
    const formValue = this.authorityForm.value;
    const jframe = document.getElementById('iframePrint');
    if (Number(formValue.authority) === Number(this.no_depend_authority)) {
      if (formValue.tinhOption) {
        jframe.setAttribute('src', '../../../../../assets/print-document/22_KN_ChuyendonTCtoiCQcothamquyen.html');
        this.printDocument.show();
      } else if (formValue.huyenOption) {
        jframe.setAttribute('src', '../../../../../assets/print-document/22_KN_ChuyendonTCtoiCQcothamquyen.html');
        this.printDocument.show();
      }
    }
  }

  public refreshDonViNghiepVu(value: any) {
    this.donViNghiepVu = value;
    console.log(value);
  }
  public removedDVNV(value: any) {
    this.donViNghiepVu = null;
  }
  public refreshTinh(value: any) {
    this.tinh = value;
  }
  public refreshHuyen(value: any) {
    this.huyen = value;
  }

  public removed(value: any) {
    this.tinh = {};
    this.huyen = {};
  }
  // onSubmitXong() {
  //   const formValue = this.authorityForm.value;
  //   const jframe = document.getElementById('iframePrint');
  //   // if(formValue.condition == this.)
  //   if (formValue.condition === 2 && formValue.saveLetter) {
  //     jframe.setAttribute('src', '../../../../../assets/print-document/04_KN_Phieudexuatxulydon.html');
  //     this.printDocument.show();
  //   }
  // }
  onChangeCondition() {
    const formValue = this.authorityForm.value;
    this.authorityOption = AU_OPTION.au_nghiepvu;
    this.saveLetter = false;
    if (Number(formValue.condition) === Number(this.enough_condition)) {
      this.authorityForm.patchValue({
        saveLetter: false
      });
    } else if (Number(formValue.condition) === Number(this.no_enough_condition)) {
      this.authorityForm.patchValue({
        // saveLetter: false,
        authority: false,
        authorityOption: AU_OPTION.au_nghiepvu
      });
    }
  }
  onLuuTam() {
    this.status = 1;
    this.onSubmitted.emit(true);
    this.onSave({ action: 'luutam' });
  }
  onKetThuc() {
    this.status = 2;
    this.onSubmitted.emit(true);
    this.onSave({ action: 'ketthuc' });
  }
  updateValueAndValidityForm(_form: FormGroup, control: string, validators: any) {
    _form.controls[control].setValidators(validators);
    _form.controls[control].updateValueAndValidity();
  }
  updateRequiredFormCongVanTraLoi() {
    const listControl = ['soCongvanTraloi', 'dateCongvanTraloi', 'ndCongvanTraloi', 'noidenCongvanTraloi'];
    for (const control of listControl) {
      this.authorityForm.get(control).setValue('', { emitEvent: false });
      this.authorityForm.get(control).disable({ emitEvent: false });
    }
  }
  updateRequiredFormKhongThamQuyen() {
    const listControl = ['twOption', 'tinhOption', 'huyenOption', 'chuyenDenDVNV'];
    for (const control of listControl) {
      this.authorityForm.get(control).setValue('', { emitEvent: false });
      this.authorityForm.get(control).disable({ emitEvent: false });
    }
  }

  saveDonThu(formValue) {
    const donthu: any = {};
    donthu.actived = true;
    donthu.createBy = { 'id': this.account.id };
    donthu.diaChiCongDan = this.formQiaiquyetDt.get('diaChi').value;
    donthu.dmBHXH = { 'id': this.account.donViId };
    donthu.hoTenCongDan = this.formQiaiquyetDt.get('hoTenCd').value;
    donthu.ngayCongVan = this.timeBuilder.fromTimeDatePicker(this.formQiaiquyetDt.get('ngayThang').value).setUTC().toISOString();
    donthu.noiDung = this.formQiaiquyetDt.get('noiDung').value;
    donthu.phanLoaiNoiDung = { 'id': this.formQiaiquyetDt.get('selectType').value };
    donthu.soCMTND = this.formQiaiquyetDt.get('soCMND').value;
    donthu.soCongVanDen = this.formQiaiquyetDt.get('soCongVanDen').value;
    donthu.tiepCongDanId = this.formQiaiquyetDt.get('quaTc').value ? this.formQiaiquyetDt.get('tiepCongDanId').value : null;
    donthu.id = this.formQiaiquyetDt.get('id').value;
    donthu.status = this.status;
    // donthu.dvNghiepVuId = { 'id': this.donViNghiepVu.id };
    // donthu.luuDon = formValue.saveLetter;
    if (donthu.luuDon) {
      donthu.isThuocThamQuyen = false;
    }
    // if (Number(formValue.complex) === 1) {
    //   donthu.isDonPhucTap = true;
    // } else if (Number(formValue.complex) === 2) {
    //   donthu.isDonPhucTap = false;
    // }
    if (Number(this.authorityForm.value.signature) === 1) {
      donthu.isChuKyMotNguoi = true;
      donthu.isNacDanh = false;
    } else if (Number(this.authorityForm.value.signature) === 2) {
      donthu.isChuKyMotNguoi = false;
      donthu.isNacDanh = false;
    } else if (Number(this.authorityForm.value.signature) === 3) {
      donthu.isChuKyMotNguoi = true;
      donthu.isNacDanh = true;
    }
    //xử lí
    if (Number(formValue.condition) === 1) {
      donthu.isDuDieuKienXuLy = true;
      this.updateValueAndValidityForm(this.authorityForm, 'saveLetter', null);
      donthu.luuDon = null;
    } else if (Number(formValue.condition) === 2) {
      if (formValue.saveLetter == true) {
        donthu.isDuDieuKienXuLy = false;
        donthu.luuDon = true;
        this.updateValueAndValidityForm(this.authorityForm, 'authority', null);
        this.authorityForm.get('authority').setValue(null);
        this.updateRequiredFormCongVanTraLoi();
        this.updateRequiredFormKhongThamQuyen();
      } else {
        this._alert.error('Bạn chưa lưu đơn');
      }
    }
    //thẩm quyền
    if (Number(formValue.authority) === 1) {
      donthu.isThuocThamQuyen = true;
      donthu.luuDon = null;
      this.updateValueAndValidityForm(this.authorityForm, 'saveLetter', null);
      this.updateRequiredFormKhongThamQuyen();
      if(formValue.authorityOption != this.auOption_congvan){
        this.updateRequiredFormCongVanTraLoi();
      }
    } else if (Number(formValue.authority) === 2) {
      donthu.isThuocThamQuyen = false;
      donthu.luuDon = null;
      
      this.updateValueAndValidityForm(this.authorityForm, 'saveLetter', null);
      if(formValue.twOption == null){
        this.updateValueAndValidityForm(this.authorityForm, 'twOption', null);
      }
      if(formValue.tinhOption == null){
        this.updateValueAndValidityForm(this.authorityForm, 'tinhOption', null);
      }
      if(formValue.huyenOption == null){
        this.updateValueAndValidityForm(this.authorityForm, 'huyenOption', null);
      }
    }
    return donthu;
  }

  onSave({ action }) {
    if (this.isExisted) {
      this._alert.error('Số công văn đến đã tồn tại!');
      return;
    }
    const formValue = this.authorityForm.value;
    let formBody: any = {};
    const chuyenDenCqctqName = formValue.chuyenDenCqctqName || '';
    formBody.chuyenDenCqctqName = chuyenDenCqctqName;
    if (this.accountType === this.accountType_tw) {
      formBody.isChuyenDenCQCTQ = setValue(formValue.twOption, [{ key: this.twOption_thamquyen, value: 1 }, { key: this.twOption_tinh, value: 2 }, { key: this.twOption_Hd, value: 3 }]);
    } else if (this.accountType === this.accountType_tinh) {
      formBody.isChuyenDenCQCTQ = setValue(formValue.tinhOption, [{ key: this.tinhOption_thamquyen, value: 1 }, { key: this.tinhOption_huyen, value: 2 }, { key: this.tinhOption_Hd, value: 3 }]);
    } else if (this.accountType === this.accountType_huyen) {
      formBody.isChuyenDenCQCTQ = setValue(formValue.huyenOption, [{ key: this.huyenOption_thamquyen, value: 1 }, { key: this.huyenOption_nghiepvu, value: 2 }, { key: this.huyenOption_Hd, value: 3 }]);
    }
    if (formBody.isChuyenDenCQCTQ === 1) {
      formBody.chuyenDenCqctqName = formValue.chuyenDenCqctqName;

    } else {
      formBody.chuyenDenCqctqName = '';
    }
    formBody.status = this.status;
    formBody.actived = true;
    // formBody.createBy = { 'id': this.account.id };
    if (formBody.isChuyenDenCQCTQ === 2 && formValue.chuyenDenDMBHXH && formValue.chuyenDenDMBHXH['0'] && formValue.chuyenDenDMBHXH['0'].id) {
      formBody.dmBHXH = { id: formValue.chuyenDenDMBHXH['0'].id };
    }

    // if (formValue.chuyenDenDVNV && formValue.chuyenDenDVNV['0'] && formValue.chuyenDenDVNV['0'].id) {
    //   formBody.donViNghiepVu = {id: formValue.chuyenDenDVNV['0'].id};
    // }
    if (this.donViNghiepVu) {
      if (this.donViNghiepVu[0]) {
        formBody.donViNghiepVu = this.donViNghiepVu[0];
      } else {
        formBody.donViNghiepVu = this.donViNghiepVu;
      }
    }
    // if (this.donViNghiepVu) {
    //   if (this.donViNghiepVu[0]) {
    //     formBody.donViNghiepVu = { id: this.donViNghiepVu[0].id};
    //   } else {
    //     formBody.donViNghiepVu = { id: this.donViNghiepVu.id};
    //   }
    // }
    formBody.donThu = this.saveDonThu(formValue);

    formBody.hasCongVanTraLoi = setValue(formValue.authorityOption, [{ key: this.auOption_congvan, value: 1 }, { key: this.auOption_nghiepvu, value: 2 }, { key: this.auOption_tructiep, value: 3 }, { key: this.auOption_phongban, value: 4 }]);

    if (Number(formValue.authority) === 1) {
      formBody.thuocThamQuyen = true;
      formBody.isThuocThamQuyen = true;
    } else if (Number(formValue.authority) === 2) {
      formBody.thuocThamQuyen = false;
      formBody.isThuocThamQuyen = false;
    }
    formBody.donThu.luuDon = formValue.saveLetter;
    if (Number(formValue.saveLetter) === 1) {
      formBody.donThu.luuDon = true;
    } else if (Number(formValue.saveLetter) === 2) {
      formBody.donThu.luuDon = false;
    }
    formBody.ngayCongVanTraLoi = formValue.dateCongvanTraloi;
    formBody.noiDenCongVanTraLoi = formValue.noidenCongvanTraloi;
    formBody.noiDungCongVanTraLoi = formValue.ndCongvanTraloi;
    formBody.soCongVanTraLoi = formValue.soCongvanTraloi;
    formBody.isGiaiQuyetLanDau = Number(formValue.lanGiaiQuyet);
    // formBody.dvNghiepVuId = formValue.dvNghiepVuId;
    // formBody.donViNghiepVu = {'id': formValue.chuyenDenDVNV[0].id};
    if (!formBody.thuocThamQuyen) {
      delete formBody.noiDenCongVanTraLoi;
      delete formBody.ngayCongVanTraLoi;
      delete formBody.hasCongVanTraLoi;
      delete formBody.noiDungCongVanTraLoi;
      delete formBody.soCongVanTraLoi;
    } else if (formBody.thuocThamQuyen) {
      delete formBody.chuyenDenCQCTQ;
      delete formBody.isChuyenDenCQCTQ;
    }
    if (formBody.donThu.soCongVanDen !== null) {
      formBody.donThu.soCongVanDen = formBody.donThu.soCongVanDen.trim();
    }
    let api = 'createNewDtKiennghiPA';
    if (this.preview) {
      api = 'updateNewDtKiennghiPA';
      formBody.id = this.data.id;
      formBody.donThu.id = this.data.donThu.id;
    }
    formBody.donThu.ngayTiepNhan = this.timeBuilder.fromTimeDatePicker(this.formQiaiquyetDt.get('ngayThang').value).setUTC().toISOString();
    if (action === 'ketthuc') {
      formBody.donThu.ngayKetThuc = this.timeBuilder.current().setUTC().toISOString();
    }
    if (action == 'luutam') {
      this.formService.touchAllInput(this.formQiaiquyetDt, true);
      if (this.formQiaiquyetDt.invalid) {
        this.formService.touchAllInput(this.formQiaiquyetDt, true);
        this._alert.error('Cần nhập các phần bắt buộc ở Giải quyết đơn thư KN, TC, KNPA');
        return;
      }
    }

    if (action == 'ketthuc') {
      this.formService.touchAllInput(this.formQiaiquyetDt, true);
      this.formService.touchAllInput(this.authorityForm, true);
      if (this.authorityForm.invalid || this.formQiaiquyetDt.invalid) {
        console.log(this.formService.getErrorList(this.authorityForm), this.formService.getErrorList(this.formQiaiquyetDt));
        if (action === 'luutam') {
          this._alert.error('Lưu tạm làm việc không thành công');
        } else if (action === 'ketthuc') {
          this._alert.error('Kết thúc làm việc không thành công');
        }
        return;
      }
    }
    console.log(formBody);
    formBody = pickBy(formBody, { notEmpty: true, notNull: true, notUndefined: true, notStringEmpty: true });
    this.noiKiennghiPaService[api](formBody)
      .subscribe(res => {
        this.router.navigate([this.rootPage]);
        if (action === 'luutam') {
          this._alert.success('Lưu tạm làm việc thành công !', { delay: 1000 });
        } else if (action === 'ketthuc') {
          this._alert.success('Kết thúc làm việc thành công !', { delay: 1000 });
        }
      }, err => {
        if (action === 'luutam') {
          this._alert.error('Lưu tạm làm việc không thành công');
        } else if (action === 'ketthuc') {
          this._alert.error('Kết thúc làm việc không thành công');
        }
      });
  }

  onSubmitPrintDocument() {

  }
  checkConditionRequired(control: FormControl) {
    if (this.authorityForm && this.authorityForm.value.condition && !control.value) {
      return { required: true };
    }
    return null;
  }
  checkConditionRequiredForm(control: FormControl) {
    if (this.authorityForm && this.authorityForm.value.authority && !control.value) {
      return { required: true };
    }
    return null;
  }
  toogleValidateKNPA() {
    const listToogle = [
      'condition', 'authority'
    ];
    const fieldToogleConfig = {
      condition: {
        1: ['authority', 'lanGiaiQuyet', 'authorityOption', 'soCongvanTraloi', 'dateCongvanTraloi', 'ndCongvanTraloi', 'noidenCongvanTraloi', 'chuyenDenDVNV'],
        2: ['saveLetter']
      },
      authority: {
        1: ['authorityOption', 'soCongvanTraloi', 'dateCongvanTraloi', 'ndCongvanTraloi', 'noidenCongvanTraloi', 'chuyenDenDVNV'],
        2: ['twOption', 'chuyenDenCqctqName', 'chuyenDenDMBHXH', 'tinhOption', 'huyenOption']
      }
    };
    for (const field of listToogle) {
      this.authorityForm.get(field).valueChanges.subscribe(val => {
        console.log(val);
        if (val == 1) {
          for (const fieldCHild of fieldToogleConfig[field][2]) {
            console.log(fieldCHild);
            this.authorityForm.get(fieldCHild).setValue('', { emitEvent: false });
            this.authorityForm.get(fieldCHild).disable({ emitEvent: false });
          }
          for (const fieldCHild of fieldToogleConfig[field][1]) {
            console.log(fieldCHild);
            this.authorityForm.get(fieldCHild).enable();
          }
        }
        if (val == 2) {
          for (const fieldCHild of fieldToogleConfig[field][1]) {
            console.log(fieldCHild);
            this.authorityForm.get(fieldCHild).setValue('', { emitEvent: false });
            this.authorityForm.get(fieldCHild).disable({ emitEvent: false });
          }
          for (const fieldCHild of fieldToogleConfig[field][2]) {
            console.log(fieldCHild);
            this.authorityForm.get(fieldCHild).enable();
          }
        }
      });
      this.authorityForm.get('authorityOption').valueChanges.subscribe(res => {
        if (res == 1) {
          this.authorityForm.get('chuyenDenDVNV').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenDVNV').disable({ emitEvent: false });
          this.authorityForm.get('soCongvanTraloi').enable();
          this.authorityForm.get('dateCongvanTraloi').enable();
          this.authorityForm.get('ndCongvanTraloi').enable();
          this.authorityForm.get('noidenCongvanTraloi').enable();
        }
        if (res == 2) {
          this.authorityForm.get('soCongvanTraloi').setValue('', { emitEvent: false });
          this.authorityForm.get('soCongvanTraloi').disable({ emitEvent: false });
          this.authorityForm.get('dateCongvanTraloi').setValue('', { emitEvent: false });
          this.authorityForm.get('dateCongvanTraloi').disable({ emitEvent: false });
          this.authorityForm.get('ndCongvanTraloi').setValue('', { emitEvent: false });
          this.authorityForm.get('ndCongvanTraloi').disable({ emitEvent: false });
          this.authorityForm.get('noidenCongvanTraloi').setValue('', { emitEvent: false });
          this.authorityForm.get('noidenCongvanTraloi').disable({ emitEvent: false });
          this.authorityForm.get('chuyenDenDVNV').enable();
        }
        if (res == 3) {
          this.authorityForm.get('chuyenDenDVNV').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenDVNV').disable({ emitEvent: false });
          this.authorityForm.get('soCongvanTraloi').setValue('', { emitEvent: false });
          this.authorityForm.get('soCongvanTraloi').disable({ emitEvent: false });
          this.authorityForm.get('dateCongvanTraloi').setValue('', { emitEvent: false });
          this.authorityForm.get('dateCongvanTraloi').disable({ emitEvent: false });
          this.authorityForm.get('ndCongvanTraloi').setValue('', { emitEvent: false });
          this.authorityForm.get('ndCongvanTraloi').disable({ emitEvent: false });
          this.authorityForm.get('noidenCongvanTraloi').setValue('', { emitEvent: false });
          this.authorityForm.get('noidenCongvanTraloi').disable({ emitEvent: false });
        }
        if (res == 4) {
          this.authorityForm.get('chuyenDenDVNV').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenDVNV').disable({ emitEvent: false });
          this.authorityForm.get('soCongvanTraloi').setValue('', { emitEvent: false });
          this.authorityForm.get('soCongvanTraloi').disable({ emitEvent: false });
          this.authorityForm.get('dateCongvanTraloi').setValue('', { emitEvent: false });
          this.authorityForm.get('dateCongvanTraloi').disable({ emitEvent: false });
          this.authorityForm.get('ndCongvanTraloi').setValue('', { emitEvent: false });
          this.authorityForm.get('ndCongvanTraloi').disable({ emitEvent: false });
          this.authorityForm.get('noidenCongvanTraloi').setValue('', { emitEvent: false });
          this.authorityForm.get('noidenCongvanTraloi').disable({ emitEvent: false });
        }
      });
      this.authorityForm.get('twOption').valueChanges.subscribe(res => {
        if (res == 1) {
          this.authorityForm.get('chuyenDenDMBHXH').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenDMBHXH').disable({ emitEvent: false });
          this.authorityForm.get('tinhOption').setValue('', { emitEvent: false });
          this.authorityForm.get('tinhOption').disable({ emitEvent: false });
          this.authorityForm.get('huyenOption').setValue('', { emitEvent: false });
          this.authorityForm.get('huyenOption').disable({ emitEvent: false });
          this.authorityForm.get('chuyenDenCqctqName').enable();
        }
        if (res == 2) {
          this.authorityForm.get('chuyenDenCqctqName').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenCqctqName').disable({ emitEvent: false });
          this.authorityForm.get('tinhOption').setValue('', { emitEvent: false });
          this.authorityForm.get('tinhOption').disable({ emitEvent: false });
          this.authorityForm.get('huyenOption').setValue('', { emitEvent: false });
          this.authorityForm.get('huyenOption').disable({ emitEvent: false });
          this.authorityForm.get('chuyenDenDMBHXH').enable();
        }
        if (res == 3) {
          this.authorityForm.get('chuyenDenCqctqName').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenCqctqName').disable({ emitEvent: false });
          this.authorityForm.get('chuyenDenDMBHXH').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenDMBHXH').disable({ emitEvent: false });
          this.authorityForm.get('tinhOption').setValue('', { emitEvent: false });
          this.authorityForm.get('tinhOption').disable({ emitEvent: false });
          this.authorityForm.get('huyenOption').setValue('', { emitEvent: false });
          this.authorityForm.get('huyenOption').disable({ emitEvent: false });
        }
      });
      this.authorityForm.get('tinhOption').valueChanges.subscribe(res => {
        if (res == 1) {
          this.authorityForm.get('chuyenDenDMBHXH').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenDMBHXH').disable({ emitEvent: false });
          this.authorityForm.get('twOption').setValue('', { emitEvent: false });
          this.authorityForm.get('twOption').disable({ emitEvent: false });
          this.authorityForm.get('huyenOption').setValue('', { emitEvent: false });
          this.authorityForm.get('huyenOption').disable({ emitEvent: false });
          this.authorityForm.get('chuyenDenCqctqName').enable();
        }
        if (res == 2) {
          this.authorityForm.get('chuyenDenCqctqName').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenCqctqName').disable({ emitEvent: false });
          this.authorityForm.get('twOption').setValue('', { emitEvent: false });
          this.authorityForm.get('twOption').disable({ emitEvent: false });
          this.authorityForm.get('huyenOption').setValue('', { emitEvent: false });
          this.authorityForm.get('huyenOption').disable({ emitEvent: false });
          this.authorityForm.get('chuyenDenDMBHXH').enable();
        }
        if (res == 3) {
          this.authorityForm.get('chuyenDenCqctqName').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenCqctqName').disable({ emitEvent: false });
          this.authorityForm.get('chuyenDenDMBHXH').setValue('', { emitEvent: false });
          this.authorityForm.get('chuyenDenDMBHXH').disable({ emitEvent: false });
          this.authorityForm.get('twOption').setValue('', { emitEvent: false });
          this.authorityForm.get('twOption').disable({ emitEvent: false });
          this.authorityForm.get('huyenOption').setValue('', { emitEvent: false });
          this.authorityForm.get('huyenOption').disable({ emitEvent: false });
        }
      });
    }
  }

  typeMauDon: any;
  @ViewChild(PopUpPrintComponent) popUpPrint: PopUpPrintComponent;
  openModalMauDon() {
    if (this.popUpPrint !== undefined) {
      this.show_Pop_Up_Print = true;
      this.typeMauDon = { id: 1 };
      this.popUpPrint.openModalMauDon(this.typeMauDon.id);
    } else {
      this.typeMauDon = { id: 1 };
      this.show_Pop_Up_Print = true;
    }
  }

}
