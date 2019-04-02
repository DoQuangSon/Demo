import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FormService } from '../../../../../shared/form-module/form.service';
import { DmHanhviService } from '../../../../../services/api/danh-muc/noi-dmHanhVi/dm-hanhvi.service';
import { ThanhLapDoanService } from '../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthService } from '../../../../../auth/auth.service';
import { TienHanhTtktService } from '../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tien-hanh-ttkt/tien-hanh-ttkt.service';
import { AlertService } from '../../../../../services/api/alert.service';
import { STATUS_HD_TAI_DVI } from '../../../../../constants/status.constants';

@Component({
  selector: 'ttkt-modal-vphc-form',
  templateUrl: './modal-vphc-form.component.html',
  styleUrls: ['./modal-vphc-form.component.scss']
})
export class ModalVphcFormComponent implements OnInit, AfterViewInit {
  @ViewChild('modalVPHC') modalVPHC: ModalDirective;
  @Output() onSaveVPHC = new EventEmitter();
  @Input() VPHCForm: FormGroup;
  @Input('isCheckDaKetThuc') isDaKetThuc;
  @Input('isLuu') isLuu;
  @Input('tld') tldId;
  @Input('response') listDonVi;
  @Input('data') _data;
  @Input('dvDcTtktID') dvDcTtktID;
  @Input('status') status;

  constructor(
    private fb: FormBuilder,
    private tldService: ThanhLapDoanService,
    private formService: FormService,
    private dmHanhviService: DmHanhviService,
    private auth: AuthService,
    private tienHanhTTKT: TienHanhTtktService,
    private _alert: AlertService
  ) { }

  ngOnInit() {
    this.getAllDMHanhVi();
    this.creatVPHCForm();
    this.getChiTietThanhLapDoan(this.tldId);
    this.patchValueFormVPHC(this._data);
  }

  ngAfterViewInit(): void {
    this.openModalVPHX();
  }

  // Modal vi phạm hành chính
  nguoiChungKienForm: FormGroup;
  caNhanViPhamForm: FormGroup;
  isThemNguoiChungKien: Boolean = false;
  isThemCaNhanToChucViPham: Boolean = false;
  isDisable: Boolean = true;
  isDisableTenNguoiDD: Boolean = false;
  numberDsDoanMax: number;
  optionHanhViViPhams: any;

  listCanBo: any;
  listBienBanVPHC: any = [];
  // listDsDvDcTTKTS: any;
  // isInvalidFormArray: Boolean = false;

  listGioiTinh: any = [
    { value: true, gioiTinh: 'Nam' },
    { value: false, gioiTinh: 'Nữ' },
  ];

  getAllDMHanhVi() {
    this.dmHanhviService.getAllHanhVi()
      .subscribe(res => {
        this.optionHanhViViPhams = res['content'];
      }, err => {
      });
  }
  get formData() {
    return <FormArray>this.VPHCForm.get('VPHCTinhMoi');
  }

  creatVPHCForm() {
    this.VPHCForm = this.fb.group({
      VPHCTinhMoi: this.fb.array([]),
    });
    this.nguoiChungKienForm = this.fb.group({
      hoVaTen: ['', Validators.required],
      ngheNghiep: ['', Validators.required],
      diaChi: ['', Validators.required],
      coQuan: ['', Validators.required],
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

  getChiTietThanhLapDoan(id) {
    this.tldService.getThanhLapDoanById(id).subscribe(res => {
      this.listCanBo = res.danhSachDoans;
      this.numberDsDoanMax = res.danhSachDoans.length;
    });
  }

  addVPHCTinh(obj?: any): FormGroup {
    const formAddVPHCTinh = this.fb.group({
      id: [''],
      tenBienBanQuyetDinh: ['', [Validators.required]],
      ngayLap: ['', [Validators.required]],
      diaDiem: ['', [Validators.required]],
      canCu: ['', [Validators.required]],
      soNguoi: ['', [Validators.required, Validators.max(this.numberDsDoanMax)]],
      danhSachDoanVien: this.fb.array([]),
      isCaNhanToChuc: [true],
      // table
      danhSachNguoiChungKien: [[]],
      danhSachCanhanTochucViPham: [[]],
      // ca nhan vi pham
      hanhViViPham: ['', [Validators.required]],
      soTien: ['', [Validators.required]],
      vanBanQuyDinh: [''],
      yKienCaNhanViPham: [''],
      yKienNguoiChungKien: [''],
      bienPhapNganChan: [''],
      thoiHanGiaiTrinh: ['', [Validators.required]],
      thoiHanKetThuc: ['', [Validators.required]],
      soBan: ['', [Validators.required]],

      // to chuc vi pham
      maDonViViPham: [''],
      tenDonViViPham: [''],
      diaChi: [''],
      soDienThoai: [''],
      soDangKy: ['', [Validators.required]],
      ngayDangKy: ['', [Validators.required]],
      capLanThu: [1, [Validators.required]],
      coQuanCap: ['', [Validators.required]],
      tenNguoiDaiDien: ['', [Validators.required]],
      gioiTinhNguoiDaiDien: ['', [Validators.required]],
      ngaySinh: ['', [Validators.required]],
      soCmt: ['', [Validators.required]],
      chucVuNguoiDaiDien: ['', [Validators.required]],
    });
    if (obj) {
      formAddVPHCTinh.patchValue(obj, { emitEvent: false });
    }
    return formAddVPHCTinh;
  }

  xoaVPHCTinh(index) {
    const formArray = <FormArray>this.VPHCForm.controls.VPHCTinhMoi;
    const formValue = formArray.controls[index];
    if(formValue.value.tenBienBanQuyetDinh == undefined && formValue.value.diaDiem != undefined){
      this._alert.error('Không thể xóa biên bản đã có quyết định xử phạt');
      return;
    }else{
      formArray.removeAt(index);
    }
  }

  themVPHCTinh() {
    const control = <FormArray>this.VPHCForm.controls.VPHCTinhMoi;
    control.push(this.addVPHCTinh());
  }

  saveBienBanViPham() {
    const formArray = <FormArray>this.VPHCForm.controls.VPHCTinhMoi;
    const formValue = formArray.getRawValue();
    let STTBienBan = 0;
    for (const item of formValue) {
      STTBienBan++;
      let i = 0;
      for (const arr of item.danhSachDoanVien) {
        if (arr.chucVuDoan === 'Trưởng đoàn') {
          i++;
        }
      }
      if (i == 0) {
        this._alert.error('Phải có ít nhất một trưởng đoàn ở biên bản ' + STTBienBan);
        return;
      } else if (i > 1) {
        this._alert.error('Chỉ có thể thêm một trưởng đoàn duy nhất ở biên bản ' + STTBienBan);
        return;
      }
      //const controls = ['soDangKy', 'ngayDangKy', 'capLanThu', 'coQuanCap', 'tenNguoiDaiDien', 'gioiTinhNguoiDaiDien', 'ngaySinh', 'soCmt', 'chucVuNguoiDaiDien'];
      //update validate while iscaNhanTocChuc = true
      if (item.isCaNhanToChuc) {
        formArray.controls[formValue.indexOf(item)].get('soDangKy').disable();
        formArray.controls[formValue.indexOf(item)].get('ngayDangKy').disable();
        formArray.controls[formValue.indexOf(item)].get('capLanThu').disable();
        formArray.controls[formValue.indexOf(item)].get('coQuanCap').disable();
        formArray.controls[formValue.indexOf(item)].get('tenNguoiDaiDien').disable();
        formArray.controls[formValue.indexOf(item)].get('gioiTinhNguoiDaiDien').disable();
        formArray.controls[formValue.indexOf(item)].get('ngaySinh').disable();
        formArray.controls[formValue.indexOf(item)].get('soCmt').disable();
        formArray.controls[formValue.indexOf(item)].get('chucVuNguoiDaiDien').disable();
      }
      //update validate while iscaNhanTocChuc = false
      else {
        formArray.controls[formValue.indexOf(item)].get('soDangKy').enable();
        formArray.controls[formValue.indexOf(item)].get('ngayDangKy').enable();
        formArray.controls[formValue.indexOf(item)].get('capLanThu').enable();
        formArray.controls[formValue.indexOf(item)].get('coQuanCap').enable();
        formArray.controls[formValue.indexOf(item)].get('tenNguoiDaiDien').enable();
        formArray.controls[formValue.indexOf(item)].get('gioiTinhNguoiDaiDien').enable();
        formArray.controls[formValue.indexOf(item)].get('ngaySinh').enable();
        formArray.controls[formValue.indexOf(item)].get('soCmt').enable();
        formArray.controls[formValue.indexOf(item)].get('chucVuNguoiDaiDien').enable();
      }
    }
    this.formService.touchAllInput(this.formData);
    if (this.formData.invalid) {
      console.log(this.formService.getErrorList(this.VPHCForm));
      this._alert.error('Bạn Chưa điền đầy đủ thông tin!');
      return;
    } else {
      for (const item of formValue) {
        if (item.danhSachNguoiChungKien.length == 0) {
          this._alert.error('Cần ít nhất 1 người chứng kiến ở biên bản số ' + (1 + formValue.indexOf(item)));
          return;
        } else if (item.isCaNhanToChuc == true && item.danhSachCanhanTochucViPham.length == 0) {
          this._alert.error('Biên bản số ' + (1 + formValue.indexOf(item)) + ' cần có ít nhất 1 cá nhân vi phạm!');
          return;
        } else {
          item.capLanThu = Number(item.capLanThu);
          item.isBienBanVPHC = true;
          item.nguoiLap = this.auth.currentUser.tenHienThi;
        }
      }
      this.listBienBanVPHC = formValue;
      this.onSaveVPHC.emit(this.listBienBanVPHC);
      this.modalVPHC.hide();
    }
  }

  onChangeSoNguoi(item) {
    const soNguoi = Number(item.value.soNguoi);
    const control: FormArray = item.controls.danhSachDoanVien;
    const lengthDsDoan = control.length;
    if (lengthDsDoan == 0) {
      for (let i = 0; i < soNguoi; i++) {
        control.push(this.initSoNguoi());
      }
    } else if (lengthDsDoan > 0) {
      const j = soNguoi - lengthDsDoan;
      if (j > 0) {
        for (let k = 0; k < j; k++) {
          control.push(this.initSoNguoi());
        }
      } else if (j < 0) {
        for (let i = j; i < 0; i++) {
          control.removeAt(control.length - 1);
        }
      }
    }
  }

  initSoNguoi(obj = { idCanBo: '', tenCanBo: '', chucVuDoan: '', chucVuCongTac: '', coQuan: '' }): FormGroup {
    const formListCanBo = this.fb.group({
      idCanBo: [obj.idCanBo, Validators.required],
      tenCanBo: [obj.tenCanBo, Validators.required],
      chucVuDoan: [obj.chucVuDoan, Validators.required],
      chucVuCongTac: [obj.chucVuCongTac, Validators.required],
      coQuan: [obj.coQuan, Validators.required],
    });

    return formListCanBo;
  }
  // change ten can bo
  onchangeTenCanBo(item, index, event) {
    const idCanBo = Number(event.target.value);
    this.listCanBo.forEach(element => {
      if (element.id === idCanBo) {
        item.controls.danhSachDoanVien.at(index).patchValue({
          idCanBo: element.id,
          tenCanBo: element.hoVaTen,
          chucVuDoan: this.listCanBo.find(el => el.id === idCanBo).chucVuDoan,
          chucVuCongTac: this.listCanBo.find(el => el.id === idCanBo).chucVuCongTac,
          coQuan: this.listCanBo.find(el => el.id === idCanBo).tenDonViChuTriPhoiHop
        });
      }
    });
  }
  // form nguoi chung kien
  themNguoiChungKien(item) {
    this.isThemNguoiChungKien = true;
    this.nguoiChungKienForm.reset();
  }

  saveNguoiChungKien(item) {
    this.formService.touchAllInput(this.nguoiChungKienForm);
    const formValue = this.nguoiChungKienForm.value;
    if (this.nguoiChungKienForm.invalid) {
      console.log(this.formService.getErrorList(this.nguoiChungKienForm));
      return;
    } else {
      item.controls['danhSachNguoiChungKien'].value.push(formValue);
      this.isThemNguoiChungKien = false;
    }
  }

  themCaNhanToChuc(item) {
    this.isThemCaNhanToChucViPham = true;
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
      this.isThemCaNhanToChucViPham = false;
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

  openModalVPHX() {
    this.modalVPHC.show();
    if (this.isLuu === false) {
      this.creatVPHCForm();
      this.patchValueFormVPHC(this._data);
    }
  }

  patchValueFormVPHC(data) {
    if (this.VPHCForm && data) {
      const bbVPHC = <FormArray>this.VPHCForm.controls.VPHCTinhMoi;
      for (const item of data) {
        if (item.isBienBanVPHC === true) {
          if (typeof item.danhSachDoanVien === 'string') {
            item.danhSachDoanVien = JSON.parse(item.danhSachDoanVien);
          }
          if (typeof item.danhSachNguoiChungKien === 'string') {
            item.danhSachNguoiChungKien = JSON.parse(item.danhSachNguoiChungKien);
          }
          if (typeof item.danhSachCanhanTochucViPham === 'string') {
            item.danhSachCanhanTochucViPham = JSON.parse(item.danhSachCanhanTochucViPham);
          }
          const itemForm = this.addVPHCTinh(item);
          bbVPHC.push(itemForm);
          for (const dsdv of item.danhSachDoanVien) {
            const control = <FormArray>itemForm.controls['danhSachDoanVien'];
            const form = this.fb.group(dsdv);
            control.push(form);
          }
        }else{
          for(const ds of bbVPHC.value){
            if(ds.tenBienBanQuyetDinh == item.bienBanCanCu){
              bbVPHC.controls[(bbVPHC.value).indexOf(ds)].get('tenBienBanQuyetDinh').disable();
            }
          }
        }
      }
    }
  }

  printPDF_VPHC(item, type) {
    const data = item.value;
    data.soQuyetDinh = this._data.soQuyetDinh;
    data.tenHanhVi = this.optionHanhViViPhams.find(hanhViItem => data.hanhViViPham == hanhViItem.id).tenHanhVi;
    this.tienHanhTTKT.printMauViPhamHanhChinh(type, data);
  }

  closePopUp() {
    this.modalVPHC.hide();
  }

  closeFormCaNhanViPham() {
    this.isThemCaNhanToChucViPham = false;
  }

  closeFormNguoiChungKien() {
    this.isThemNguoiChungKien = false;
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
