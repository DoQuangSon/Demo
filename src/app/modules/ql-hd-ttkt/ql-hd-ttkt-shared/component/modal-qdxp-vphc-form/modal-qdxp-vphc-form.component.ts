import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ThanhLapDoanService } from '../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { DmHanhviService } from '../../../../../services/api/danh-muc/noi-dmHanhVi/dm-hanhvi.service';
import { FormService } from '../../../../../shared/form-module/form.service';
import { AuthService } from '../../../../../auth/auth.service';
import { TienHanhTtktService } from '../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tien-hanh-ttkt/tien-hanh-ttkt.service';
import { AlertService } from '../../../../../services/api/alert.service';
import { STATUS_HD_TAI_DVI } from '../../../../../constants/status.constants';

@Component({
  selector: 'ttkt-modal-qdxp-vphc-form',
  templateUrl: './modal-qdxp-vphc-form.component.html',
  styleUrls: ['./modal-qdxp-vphc-form.component.scss']
})
export class ModalQdxpVphcFormComponent implements OnInit, AfterViewInit {
  @ViewChild('modalQDXP') modalQDXP: ModalDirective;
  @Input('isCheckDaKetThuc') isDaKetThuc;
  @Input('isLuu') isLuu;
  @Input() QDXPForm: FormGroup;
  @Input('tldId') tldId;
  @Input('response') listDonVi;
  @Input('data') _data;
  @Input('dvDcTtktID') dvDcTtktID;
  @Input('status') status;

  @Output() onSaveQDXP = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private tldService: ThanhLapDoanService,
    private formService: FormService,
    private dmHanhviService: DmHanhviService,
    private auth: AuthService,
    private tienHanhTTKT: TienHanhTtktService,
    private _alert: AlertService
  ) { }

  caNhanViPhamForm: FormGroup;
  listGioiTinh: any = [
    { value: true, gioiTinh: 'Nam' },
    { value: false, gioiTinh: 'Nữ' },
  ];

  // listDsDvDcTTKTS: any;
  optionHanhViViPhams: any;
  listBienBanVPHC: any;
  doiTuongTTKT: any;
  listQDXPVPHC: any = [];
  // isInvalidFormArray: Boolean;
  isThemCaNhanViPham: Boolean = false;
  isDisable: Boolean = true;
  isDisableTenNguoiDD: Boolean = false;
  listBbCanCu: any = [];
  listLoaiHinhXuPhat: any = [
    { id: 1, tenLoaiHinh: 'Phạt tiền'},
    { id: 2, tenLoaiHinh: 'Cảnh cáo'}
  ];

  listChucDanhs: any = [
    { id: 1, chucDanh: 'Tổng giám đốc' },
    { id: 2, chucDanh: 'Phó tổng giám đốc' },
    { id: 3, chucDanh: 'Giám đốc' },
    { id: 4, chucDanh: 'Phó giám đốc' },
    { id: 5, chucDanh: 'Trưởng đoàn' }
  ];

  ngOnInit() {
    this.creatVPHCForm();
    this.getAllDMHanhVi();
    this.patchValueFormQDXP(this._data);
  }

  ngAfterViewInit(): void {
    this.openModalQDXP();
  }

  get formData() {
    return <FormArray>this.QDXPForm.get('QDXPTinhMoi');
  }

  creatVPHCForm() {
    this.QDXPForm = this.fb.group({
      QDXPTinhMoi: this.fb.array([]),
    });

    this.caNhanViPhamForm = this.fb.group({
      hoVaTen: ['', Validators.required],
      gioiTinh: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      quocTich: ['', Validators.required],
      ngheNghiep: ['', Validators.required],
      diaChi: ['', Validators.required],
      soCMT: ['', Validators.required],
      ngayCap: ['', Validators.required],
      noiCap: ['', Validators.required],
    });
  }

  getAllDMHanhVi() {
    this.dmHanhviService.getAllHanhVi()
      .subscribe(res => {
        this.optionHanhViViPhams = res['content'];
      }, err => {
      });
  }

  addQDXPTinh(obj?: any): FormGroup {
    const formQDXPTinh = this.fb.group({

      id: [''],
      nguoiRaQuyetDinh: ['', [Validators.required]],
      chucDanhId: ['', [Validators.required]],
      canCu: ['', [Validators.required]],
      bienBanCanCu: ['', Validators.required],
      soBbGiaiTrinh: [''],
      ngayBbGiaiTrinh: [''],
      soBbXacMinh: [''],
      ngayBbXacMinh: [''],
      soGiaoQuyenXp: [''],
      ngayGiaoQuyenXp: [''],
      isCaNhanToChuc: [true],
      // table
      danhSachCanhanTochucViPham: [[]],
      // ca nhan vi pham
      hanhViViPham: ['', [Validators.required]],
      vanBanQuyDinh: [''],
      tinhTietTangNang: [''],
      tinhTietGiamNhe: [''],
      isLoaiHinhPhat: [1, [Validators.required]],
      soTien: ['', [Validators.required]],
      thoiHanNop: ['', [Validators.required]],
      hinhThucXuPhatBs: [''],
      bpKhacPhucHq: [''],
      thoiHanKhacPhucHq: [''],
      ngayHieuLucQd: ['', [Validators.required]],
      soTaiKhoan: ['', [Validators.required]],

      // to chuc vi pham
      maDonViViPham: [''],
      tenDonViViPham: [''],
      diaChi: [''],
      soDienThoai: [''],
      soDangKy: ['', [Validators.required]],
      ngayDangKy: ['', [Validators.required]],
      capLanThu: ['', [Validators.required]],
      coQuanCap: ['', [Validators.required]],
      tenNguoiDaiDien: ['', [Validators.required]],
      gioiTinhNguoiDaiDien: ['', [Validators.required]],
      ngaySinh: ['', [Validators.required]],
      soCmt: ['', [Validators.required]],
      chucVuNguoiDaiDien: ['', [Validators.required]],
    });

    if (obj) {
      formQDXPTinh.patchValue(obj, { emitEvent: false });
    }

    return formQDXPTinh;
  }

  xoaQDXPTinh(index) {
    const control = <FormArray>this.QDXPForm.controls['QDXPTinhMoi'];
    control.removeAt(index);
  }

  themQDXPTinh() {
    const control = <FormArray>this.QDXPForm.controls.QDXPTinhMoi;
    control.push(this.addQDXPTinh());
  }

  saveQuyetDinhXP() {
    const formArray = <FormArray>this.QDXPForm.controls.QDXPTinhMoi;
    const FormValue = formArray.getRawValue();
    for (const item of FormValue) {
      // const controls = ['soDangKy', 'ngayDangKy', 'capLanThu', 'coQuanCap', 'tenNguoiDaiDien', 'gioiTinhNguoiDaiDien', 'ngaySinh', 'soCmt', 'chucVuNguoiDaiDien'];
      // update validate while iscaNhanTocChuc = true
      if (item.isCaNhanToChuc) {
        formArray.controls[FormValue.indexOf(item)].get('soDangKy').disable();
        formArray.controls[FormValue.indexOf(item)].get('ngayDangKy').disable();
        formArray.controls[FormValue.indexOf(item)].get('capLanThu').disable();
        formArray.controls[FormValue.indexOf(item)].get('coQuanCap').disable();
        formArray.controls[FormValue.indexOf(item)].get('tenNguoiDaiDien').disable();
        formArray.controls[FormValue.indexOf(item)].get('gioiTinhNguoiDaiDien').disable();
        formArray.controls[FormValue.indexOf(item)].get('ngaySinh').disable();
        formArray.controls[FormValue.indexOf(item)].get('soCmt').disable();
        (formArray as FormArray).controls[FormValue.indexOf(item)].get('chucVuNguoiDaiDien').disable();
      }
      // update validate while iscaNhanTocChuc = false
      else {
        formArray.controls[FormValue.indexOf(item)].get('soDangKy').enable();
        formArray.controls[FormValue.indexOf(item)].get('ngayDangKy').enable();
        formArray.controls[FormValue.indexOf(item)].get('capLanThu').enable();
        formArray.controls[FormValue.indexOf(item)].get('coQuanCap').enable();
        formArray.controls[FormValue.indexOf(item)].get('tenNguoiDaiDien').enable();
        formArray.controls[FormValue.indexOf(item)].get('gioiTinhNguoiDaiDien').enable();
        formArray.controls[FormValue.indexOf(item)].get('ngaySinh').enable();
        formArray.controls[FormValue.indexOf(item)].get('soCmt').enable();
        formArray.controls[FormValue.indexOf(item)].get('chucVuNguoiDaiDien').enable();
      }
      // update validate while isLoaiHinhPhat = true
      if (item.isLoaiHinhPhat == 2) {
        formArray.controls[FormValue.indexOf(item)].get('thoiHanNop').disable();
        formArray.controls[FormValue.indexOf(item)].get('soTien').disable();
      }
    }
    this.formService.touchAllInput(this.formData);
    if (this.formData.invalid) {
      console.log(this.formService.getErrorList(this.QDXPForm));
      this._alert.error('Bạn Chưa điền đầy đủ thông tin!');
      return;
    } else {
      for (const item of FormValue) {
        if (item.isCaNhanToChuc == true && item.danhSachCanhanTochucViPham.length == 0) {
          this._alert.error('Quyết định số ' + (1 + FormValue.indexOf(item)) + ' cần có ít nhất 1 cá nhân vi phạm!');
          return;
        } else {
          item.isBienBanVPHC = false;
          if(item.isLoaiHinhPhat == 1){
            item.isLoaiHinhPhat = true;
          }else if(item.isLoaiHinhPhat == 2){
            item.isLoaiHinhPhat = false;
          }
          item.capLanThu = Number(item.capLanThu);
          item.nguoiLap = this.auth.currentUser.tenHienThi;
        }
      }
      console.log(FormValue);
      this.listQDXPVPHC = FormValue;
      this.onSaveQDXP.emit(this.listQDXPVPHC);
      this.modalQDXP.hide();
    }
  }

  onchangeTenHanhvi(item, event) {
    const idHanhvi = Number(event.target.value);
    const vanBan = this.optionHanhViViPhams.find(el => el.id === idHanhvi).vanBanQuyDinh;
    item.controls['vanBanQuyDinh'].patchValue(vanBan);
  }

  onChangeCaNhanAndToChuc(item, control) {
    const doiTuongTTKT = this.listDonVi.doiTuongTTKT;
    if (control.value === false) {
      // if la nguoi dai dien patch value
      item.patchValue({
        maDonViViPham: doiTuongTTKT.maSuDungLaoDong,
        tenDonViViPham: doiTuongTTKT.tenDoiTuong,
      });
      if (this.listDonVi.isUyQuyenCb === false) {
        item.patchValue({
          tenNguoiDaiDien: this.listDonVi.tenNguoiDaiDienCb
        });
        this.isDisableTenNguoiDD = true;
      } else {
        this.isDisableTenNguoiDD = false;
        item.controls['tenNguoiDaiDien'].patchValue('');
      }
      // reset value Ca nhan vi pham
      item.patchValue({
        danhSachCanhanTochucViPham: [],
      });
    } else {
      // reset value to chuc vi pham
      item.patchValue({
        maDonViViPham: '',
        tenDonViViPham: '',
        diaChi: '',
        soDienThoai: '',
        soDangKy: '',
        ngayDangKy: '',
        capLanThu: '',
        coQuanCap: '',
        tenNguoiDaiDien: '',
        gioiTinhNguoiDaiDien: '',
        ngaySinh: '',
        soCmt: '',
        chucVuNguoiDaiDien: '',
      });
    }
  }

  themCaNhanViPham(item) {
    this.isThemCaNhanViPham = true;
    this.caNhanViPhamForm.reset();
  }

  saveCaNhanViPham(item) {
    this.formService.touchAllInput(this.caNhanViPhamForm, true);
    const formValue = this.caNhanViPhamForm.value;
    if (this.caNhanViPhamForm.invalid) {
      console.log(this.formService.getErrorList(this.caNhanViPhamForm));
      return;
    } else {
      formValue.gioiTinh = this.listGioiTinh.find(el => String(el.value) === formValue.gioiTinh).gioiTinh;
      item.controls['danhSachCanhanTochucViPham'].value.push(formValue);
      this.isThemCaNhanViPham = false;
    }
  }

  openModalQDXP() {
    this.modalQDXP.show();
    if (this.isLuu == false) {
      this.creatVPHCForm();
      this.patchValueFormQDXP(this._data);
    }
  }

  patchValueFormQDXP(data) {
    if (this.QDXPForm && data) {
      const bbQDXP = <FormArray>this.QDXPForm.controls.QDXPTinhMoi;
      this.listBbCanCu = [];
      for (const item of data) {
        if (item.isBienBanVPHC === false) {
          if (typeof item.danhSachCanhanTochucViPham === 'string') {
            item.danhSachCanhanTochucViPham = JSON.parse(item.danhSachCanhanTochucViPham);
          }
          if(item.bienBanCanCu && this.listBbCanCu.length == 0){
            this.listBbCanCu.push({ tenBienBan: item.bienBanCanCu });
          }
          if(item.isLoaiHinhPhat == true){
            item.isLoaiHinhPhat = 1;
          }else if(item.isLoaiHinhPhat == false){
            item.isLoaiHinhPhat = 2;
          }
          bbQDXP.push(this.addQDXPTinh(item));
        } else {
          this.listBbCanCu.push({ tenBienBan: item.tenBienBanQuyetDinh });
        }
      }
      for(let bb of bbQDXP.value){
        bbQDXP.controls[(bbQDXP.value).indexOf(bb)].get('bienBanCanCu').disable();
      }
    }
  }
  onChangePhatTienAndCanhCao(item, control) {
    if (control.value == 2) {
      item.get('soTien').setValue('');
      item.get('thoiHanNop').setValue('');
    }
  }

  printPDF_XPVPHC(item, type) {
    const data = item.value;
    data.soQuyetDinh = this._data.soQuyetDinh;
    data.chucDanhNguoiRaQuyetDinh = (this.listChucDanhs.find(chucDanh => chucDanh.id == data.chucDanhId) || {}).chucDanh;
    data.tenHanhVi = this.optionHanhViViPhams.find(hanhViItem => data.hanhViViPham == hanhViItem.id).tenHanhVi;
    this.tienHanhTTKT.printMauXuPhatViPhamHanhChinh(type, data);
  }
  closePopUp() {
    this.modalQDXP.hide();
  }

  closeFormCaNhanViPham() {
    this.isThemCaNhanViPham = false;
  }
  isHidden(): boolean {
    if (this.status !== null || this.status !== undefined) {
      if (this.status === STATUS_HD_TAI_DVI.STATUS_CHI_TIET_HOAT_DONG_TAI_DON_VI_DANG_TIEN_HANH ||
        this.status === STATUS_HD_TAI_DVI.STATUS_CHI_TIET_HOAT_DONG_TAI_DON_VI_DA_KET_THUC) {
        return false;
      }
    }
    return true;
  }
}
