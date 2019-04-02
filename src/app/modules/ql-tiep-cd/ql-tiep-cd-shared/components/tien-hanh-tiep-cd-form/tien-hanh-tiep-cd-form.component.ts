import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ModalDirective, BsModalRef } from 'ngx-bootstrap/modal';
import { IMyDpOptions } from 'mydatepicker';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { TimeBuilderService } from '../../../../../services/helper/time-builder.service';
import { NoiDmtinhtrangtailieuService } from '../../../../../services/api/danh-muc/noi-dmtinhtrangtailieu/noi-dmtinhtrangtailieu.service';
import { NoiDmphanloainoidungService } from '../../../../../services/api/danh-muc/noi-dmphanloainoidung/noi-dmphanloainoidung.service';
import { AlertService } from '../../../../../services/api/alert.service';
import { NoiTiepcongdanService } from '../../../../../services/api/noi-tiepcongdan/noi-tiepcongdan.service';
import { NoiAccountService } from '../../../../../services/api/noi-account/noi-account.service';
import { StatesService } from '../../../../../services/api/state.service';
import { DIEUKIENXULY, CUMOI } from '../../../../../constants/tiep-cong-dan.constants';
import { REGEXR } from '../../../../../constants/regexr.constants';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../constants';
import { AuthService } from '../../../../../auth/auth.service';
import { FormService } from '../../../../../shared/form-module/form.service';

@Component({
  selector: 'ttkt-tien-hanh-tiep-cd-form',
  templateUrl: './tien-hanh-tiep-cd-form.component.html',
  styleUrls: ['./tien-hanh-tiep-cd-form.component.scss']
})
export class TienHanhTiepCdFormComponent implements OnInit {
  public tienHanhTiepCdForm: FormGroup;
  public themTaiLieuForm: FormGroup;
  public phanLoai: any[] = [];
  public cuMoi: any[] = CUMOI;
  public dieuKienXuLy: any[] = DIEUKIENXULY;
  public tinhTrang: any[] = [];
  public submitted: Boolean = false;
  public regexr: any = REGEXR;
  public currentSoNguoiKyDon: number = 0;
  public bsModalRef: BsModalRef;
  public dt: Date = new Date();
  public minDate: Date = void 0;
  public dateDisabled: { date: Date, mode: string }[];
  public isModalShown: Boolean = false;
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  public thongTinTaiLieu: any[] = [];
  modalOptions = { add: 1, edit: 2, delete: 3 };
  selectedOption: number;
  titleHanhDong: string;
  isTuChoi: boolean = false;

  @ViewChild('printDocument') printDocument: ModalDirective;
  @ViewChild('themTaiLieuModal') public themTaiLieuModal: ModalDirective;
  @Input() readOnly?: boolean = false;
  @Input() source?: Subject<any>;
  isSubmit: boolean = false;
  errSoNguoiKy : boolean = false;

  dataTiepcongdan: any = {};
  account: any = {};
  form : FormGroup;

  constructor(
    private fb: FormBuilder,
    private statesService: StatesService,
    private noiAccount: NoiAccountService,
    private router: Router,
    private noiDmphanloainoidungService: NoiDmphanloainoidungService,
    private noiDmtinhtrangtailieuService: NoiDmtinhtrangtailieuService,
    private noiTiepcongdanService: NoiTiepcongdanService,
    private _alert: AlertService,
    private timeBuilder: TimeBuilderService,
    public formService: FormService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getDmTinhTrangTaiLieu();
    this.account = this.auth.currentUser;
    this.fillDataChiTiet();
    this.getDmPhanLoaiNoiDung();
    this.creatTienHanhTiepCdForm();
    this.creatThemTaiLieuForm();
  }

  getDmTinhTrangTaiLieu() {
    this.noiDmtinhtrangtailieuService.getAllDmTinhtrangtailieu(0, 10)
      .subscribe((res: any) => {
        this.tinhTrang = res.content;
      });
  }

  getDmPhanLoaiNoiDung() {
    this.noiDmphanloainoidungService.getAllDmPhanloainoidung(0, 10)
      .subscribe((res: any) => {
        this.phanLoai = res.content;
      });
  }

  creatTienHanhTiepCdForm() {
    this.tienHanhTiepCdForm = this.fb.group({
      ndcdTrinhBay: ['', [Validators.required, this.formService.nospaceValidator]],
      ndcbTraLoi: ['', [Validators.required, this.formService.nospaceValidator]],
      plVuViec: [0, [Validators.required]],
      ndTrinhBay: [true],
      coDonThu: false,
      plDon: [0, [Validators.required]],
      vuViec: [''],
      tomTatDon: [''],
      ngayThangLapDon: [this.timeBuilder.current().toTimeDatePickerValue(), [Validators.required]],
      soNguoiKyDon: ['1', [Validators.required]],
      nguoiKyDon: this.fb.array([]),
      duDieuKien: [''],
      thuocThamQuyen: [''],
      thuLy: [''],
      huongDanGiaiThich: false,
      coTaiLieuKemTheo: false,
    });
    this.tienHanhTiepCdForm.get('plVuViec').valueChanges.subscribe(val => {
      this.tienHanhTiepCdForm.get('plDon').setValue(val, { emitEvent: false });
    });
    // this.tienHanhTiepCdForm.get('plDon').valueChanges.subscribe(val => {
    //   this.tienHanhTiepCdForm.get('plVuViec').setValue(val, { emitEvent: false });
    // });
  }

  creatThemTaiLieuForm() {
    this.themTaiLieuForm = this.fb.group({
      index: [''],
      ten: ['', [Validators.required,this.formService.nospaceValidator]],
      tinhTrang: [0],
      soLuong: ['', [Validators.required]],
      moTa: ['', [Validators.required,this.formService.nospaceValidator]]
    });
  }

  fillDataChiTiet() {
    if (!this.readOnly) {
      this.statesService.tiepcongdanData.subscribe(res => {
        this.dataTiepcongdan = res;
      });
      if (Object.keys(this.dataTiepcongdan).length === 0) {
        this.router.navigate(['/ql-tiep-cd/tiep-cong-dan']);
      }
    } else {
      this.source.subscribe(res => {
        this.fillData(res);
        console.log(res);
        this.isTuChoi = res.lyDoTuChoiTiepDans.length > 0;
      });
    }
  }

  openThemTaiLieuModal() {
    this.themTaiLieuForm.reset();
    this.selectedOption = this.modalOptions.add;
    this.themTaiLieuModal.show();
    this.titleHanhDong = 'Thêm';
    this.themTaiLieuForm.get('tinhTrang').setValue('1');
  }

  addTaiLieu() {
    if (!this.themTaiLieuForm.valid) {
      this.isSubmit = true;
      setTimeout(() => {
        this.isSubmit = false;
      }, 1500);
    } else {
      const formValue = this.themTaiLieuForm.value;
      formValue.tenTinhTrang = this.getTenTinhTrang(formValue.tinhTrang);
      this.thongTinTaiLieu.push({
        ten: formValue.ten,
        tinhTrang: formValue.tinhTrang,
        soLuong: formValue.soLuong,
        moTa: formValue.moTa,
        tenTinhTrang: formValue.tenTinhTrang
      });
      this.themTaiLieuModal.hide();
    }
  }

  getTenTinhTrang(id) {
    for (const item of this.tinhTrang) {
      if (Number(id) === Number(item.id)) {
        return item.tenTinhTrang;
      }
    }
  }

  fillData(data: any) {
    const _data: any = {};
    const congDanTrinhBay: string = data.congDanTrinhBay;
    const canBoTraLoi: string = data.canBoTraLoi;
    const phanLoaiNoiDungId: number = data.phanLoaiNoiDungId;
    const ndTrinhBay: boolean = data.noiDungMoi;
    const coDonThu: boolean = data.hasDonThuKemTheo;
    const dtKemTheo: any = {};
    const _dtKemTheo: any = data.dtKemTheo || {};
    dtKemTheo.loaiNoiDung = _dtKemTheo.phanLoaiNoiDungId;
    dtKemTheo.isVuViecMoi = _dtKemTheo.isVuViecMoi;
    dtKemTheo.tomTatNoiDung = _dtKemTheo.tomTatNoiDung;
    dtKemTheo.ngayVietDon = _dtKemTheo.ngayVietDon;
    dtKemTheo.nguoiKyDonThuKemTheos = _dtKemTheo.nguoiKyDonThuKemTheos || [];

    _data.congDanTrinhBay = congDanTrinhBay;
    _data.canBoTraLoi = canBoTraLoi;
    _data.phanLoaiNoiDungId = phanLoaiNoiDungId;
    _data.ndTrinhBay = ndTrinhBay;
    _data.coDonThu = coDonThu;
    _data.dtKemTheo = dtKemTheo;
    _data.hasDuDieuKienXuLy = data.hasDuDieuKienXuLy;
    _data.hasCoTaiLieuKemTheo = data.hasCoTaiLieuKemTheo;
    _data.taiLieuKemTheos = data.taiLieuKemTheos;
    this.patchTienHanhTiepCdForm(_data);
  }
  patchTienHanhTiepCdForm(data) {
    this.tienHanhTiepCdForm.patchValue({
      ndcdTrinhBay: data.congDanTrinhBay || '',
      ndcbTraLoi: data.canBoTraLoi || '',
      plVuViec: data.phanLoaiNoiDungId || '',
      ndTrinhBay: data.ndTrinhBay || false,
      coDonThu: data.coDonThu || false,
      plDon: data.dtKemTheo.loaiNoiDung,
      vuViec: data.dtKemTheo.isVuViecMoi,
      tomTatDon: data.dtKemTheo.tomTatNoiDung,
      ngayThangLapDon: this.timeBuilder.fromString(data.dtKemTheo.ngayVietDon).toTimeDatePickerValue(),
      soNguoiKyDon: data.dtKemTheo.nguoiKyDonThuKemTheos.length,
      duDieuKien: data.hasDuDieuKienXuLy,
      coTaiLieuKemTheo: data.hasCoTaiLieuKemTheo
    });
    this.thongTinTaiLieu = data.taiLieuKemTheos.map(el => {
      el.tenTinhTrang = this.getTenTinhTrang(el.tinhTrangId);
      const _el: any = {};
      _el.ten = el.tenTaiLieu;
      _el.tinhTrang = el.tinhTrangId;
      _el.moTa = el.moTaTaiLieu;
      _el.soLuong = el.soLuong;
      _el.tenTinhTrang = this.getTenTinhTrang(el.tinhTrangId);
      return _el;
    });
    const controlNguoiKyDon = <FormArray>this.tienHanhTiepCdForm.controls.nguoiKyDon;
    (data.dtKemTheo.nguoiKyDonThuKemTheos || []).forEach(el => {
      controlNguoiKyDon.push(this.initSoNguoiKyDon({
        tenNguoiKy: el.tenNguoiKy,
        chucDanh: el.chucDanh,
        diaChi: el.diaChi,
        sdt: el.soDienThoai
      }));
    });
  }
  editTaiLieu(formItem, index) {
    this.selectedOption = this.modalOptions.edit;
    this.titleHanhDong = 'Sửa';
    this.themTaiLieuForm.patchValue({
      index: index,
      ten: formItem.ten,
      tinhTrang: formItem.tinhTrang,
      soLuong: formItem.soLuong,
      moTa: formItem.moTa
    });
    this.themTaiLieuModal.show();
  }

  updateTaiLieu() {
    if (!this.themTaiLieuForm.valid) {
      this.isSubmit = true;
      setTimeout(() => {
        this.isSubmit = false;
      }, 1500);
    } else {
      const formValue = this.themTaiLieuForm.value;
      const index = formValue.index;
      this.thongTinTaiLieu[index].ten = formValue.ten;
      this.thongTinTaiLieu[index].tinhTrang = formValue.tinhTrang;
      this.thongTinTaiLieu[index].tenTinhTrang = this.getTenTinhTrang(formValue.tinhTrang);
      this.thongTinTaiLieu[index].soLuong = formValue.soLuong;
      this.thongTinTaiLieu[index].moTa = formValue.moTa;
      this.themTaiLieuModal.hide();
    }
  }

  deleteTaiLieu(formItem, index) {
    this.selectedOption = this.modalOptions.delete;
    this.titleHanhDong = 'Xóa';
    this.themTaiLieuForm.patchValue({
      index: index,
      ten: formItem.ten,
      tinhTrang: formItem.tinhTrang,
      soLuong: formItem.soLuong,
      moTa: formItem.moTa
    });
    this.themTaiLieuModal.show();
  }

  confirmDeleteTaiLieu() {
    const formValue = this.themTaiLieuForm.value;
    // const index = this.thongTinTaiLieu.findIndex(item => item.id === formValue.index);
    this.thongTinTaiLieu.splice(formValue.index, 1);
    this.themTaiLieuModal.hide();
  }

  initSoNguoiKyDon(obj = { tenNguoiKy: '', chucDanh: '', diaChi: '', sdt: '' }): FormGroup {
    this.form = this.fb.group({
      tenNguoiKy: [obj.tenNguoiKy],
      chucDanh: [obj.chucDanh], // , Validators.required
      diaChi: [obj.diaChi],
      sdt: [obj.sdt]
    });
    
    return this.form;
  }
  changeValidateCoDonThu(){
    if(this.tienHanhTiepCdForm.value.coDonThu === true){
      this.updateValueAndValidity(this.tienHanhTiepCdForm,'tomTatDon', [Validators.required, this.formService.nospaceValidator]);
      this.updateValueAndValidity(this.form,'tenNguoiKy',[Validators.required, this.formService.nospaceValidator]);
      this.updateValueAndValidity(this.form,'diaChi', [Validators.required, this.formService.nospaceValidator]);
    }else{
      this.updateValueAndValidity(this.tienHanhTiepCdForm,'tomTatDon', null);
      this.tienHanhTiepCdForm.get('tomTatDon').setValue('');
      this.updateValueAndValidity(this.form,'tenNguoiKy',null);
      this.form.get('tenNguoiKy').setValue('');
      this.updateValueAndValidity(this.form,'diaChi',null);
      this.form.get('diaChi').setValue('');
    }
  }
  
  soNguoiKyDonChange() {
    const soNguoiKyDon = Number(this.tienHanhTiepCdForm.value.soNguoiKyDon);
    const control = <FormArray>this.tienHanhTiepCdForm.controls.nguoiKyDon;
    const l = control.length;

    if(soNguoiKyDon === 0){
      this.errSoNguoiKy = true;
    }else{
      this.errSoNguoiKy = false;
    }
    if (Number.isInteger(soNguoiKyDon)) {
      if (this.currentSoNguoiKyDon < 0) {
        for (let i = 0; i < soNguoiKyDon; i++) {
          control.push(this.initSoNguoiKyDon());
        }
      } else {
        let change = this.currentSoNguoiKyDon - soNguoiKyDon;
        if (change < 0 || change > 0) {
          if (change < 0) {
            while (change !== 0) {
              control.push(this.initSoNguoiKyDon());
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

    this.currentSoNguoiKyDon = soNguoiKyDon;
    if (this.currentSoNguoiKyDon <= 0 || !this.currentSoNguoiKyDon) {
      this.tienHanhTiepCdForm.controls['duDieuKien'].setValue(false);
    }else {
      this.tienHanhTiepCdForm.controls['duDieuKien'].setValue('');
    }
  }

  // updatevalidate
  updateValueAndValidity(form : FormGroup,control: string, validators: any) {
    form.controls[control].setValidators(validators);
    form.controls[control].updateValueAndValidity();
  }

  onSubmit(type) {
    const formValue = this.tienHanhTiepCdForm.value;
    this.formService.touchAllInput(this.tienHanhTiepCdForm, true);
    if (this.tienHanhTiepCdForm.invalid || this.errSoNguoiKy === true || (formValue.coTaiLieuKemTheo === true && this.thongTinTaiLieu.length === 0) || this.tienHanhTiepCdForm.value.plDon === 0) {
      console.log(this.formService.getErrorList(this.tienHanhTiepCdForm));
      this._alert.error('Bạn chưa nhập đầy đủ các trường bắt buộc', {delay: 1000});
      return false;
    }
    const account: any = {};
    account.id = this.account.id;
    this.dataTiepcongdan.createBy = account;

    const dvtiepdan: any = {};
    dvtiepdan.id = this.account.donViId;

    const dtkemtheo: any = {};
    const arrNguoikys: any[] = [];
    for (const el of formValue.nguoiKyDon) {
      const _el: any = {};
      _el.chucDanh = el.chucDanh;
      _el.diaChi = el.diaChi;
      _el.soDienThoai = el.sdt;
      _el.tenNguoiKy = el.tenNguoiKy;
      arrNguoikys.push(_el);
    }

    dtkemtheo.vuViecMoi = formValue.vuViec;
    dtkemtheo.isVuViecMoi = formValue.vuViec;
    dtkemtheo.ngayVietDon = this.timeBuilder.fromTimeDatePicker(formValue.ngayThangLapDon).setUTC().toISOString();
    dtkemtheo.phanLoaiNoiDung = { 'id': formValue.plDon };
    dtkemtheo.tomTatNoiDung = formValue.tomTatDon;
    dtkemtheo.nguoiKyDonThuKemTheos = arrNguoikys;


    const arrtailieus: any[] = [];

    for (const el of this.thongTinTaiLieu) {
      const _el: any = {};
      _el.moTaTaiLieu = el.moTa;
      _el.soLuong = el.soLuong;
      _el.tenTaiLieu = el.ten;
      _el.tinhTrang = { 'id': el.tinhTrang };
      arrtailieus.push(_el);
    }

    this.dataTiepcongdan.canBoTraLoi = formValue.ndcbTraLoi;
    this.dataTiepcongdan.congDanTrinhBay = formValue.ndcdTrinhBay;
    this.dataTiepcongdan.createBy = { 'id': this.account.id };
    this.dataTiepcongdan.donViTiepDan = { 'id': this.account.donViId };
    this.dataTiepcongdan.hasCoTaiLieuKemTheo = formValue.coTaiLieuKemTheo;
    this.dataTiepcongdan.hasDonThuKemTheo = formValue.coDonThu;
    this.dataTiepcongdan.hasDuDieuKienXuLy = formValue.duDieuKien;
    this.dataTiepcongdan.isNoiDungMoi = formValue.ndTrinhBay;
    this.dataTiepcongdan.noiDungMoi = formValue.ndTrinhBay;
    this.dataTiepcongdan.phanLoaiNoiDung = { 'id': formValue.plVuViec };
    this.dataTiepcongdan.taiLieuKemTheos = arrtailieus;
    // this.dataTiepcongdan.daGiaiQuyet = true;
    this.dataTiepcongdan.isDaGiaiQuyet = false;
    // this.dataTiepcongdan.hasThongTinUyQuyen = true;
    this.dataTiepcongdan.isTuChoi = false;
    // this.dataTiepcongdan.tuChoi = false;
    this.dataTiepcongdan.actived = true;
    if (formValue.coDonThu === true) {
      this.dataTiepcongdan.dtKemTheo = dtkemtheo; 
    }
    this.dataTiepcongdan.lastModifiedBy = { 'id': this.account.id };

    // this.statesService.emitTransferDataTiepCdToComponent(null);

    this.noiTiepcongdanService.createNewCongdan(this.dataTiepcongdan)
      .subscribe(res => {
        this.router.navigate(['/ql-tiep-cd/ls-tiep-cd']);
        this._alert.success('Tiếp dân thành công!', {delay: 1000});
      }, err => {
        this._alert.error('Tiếp dân không thành công!');
      });
  }
}
