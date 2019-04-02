import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FILE } from '../../../../../../constants/api-file.constants';
import { QUAN_LY_DOAN, COMMON_ERROR_MESS, COMMON_SUCCESS_MESS } from '../../../../../../constants/message.constants';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { groupBy } from 'lodash';
import { IMyDpOptions } from 'mydatepicker';
import { ModalDirective } from 'ngx-bootstrap';
import { AlertService } from '../../../../../../services/api/alert.service';
import { ThanhLapDoanService } from '../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { FormService } from '../../../../../../shared/form-module/form.service';
import { NoiDmChucDanhService } from '../../../../../../services/api/danh-muc/noi-dmChucDanh/noi-dm-chucdanh.service';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { AuthService } from '../../../../../../auth/auth.service';
import { DateCompareValidator } from '../../../../../../shared/form-module/custom-validattion';

@Component({
  selector: 'ttkt-quyet-dinh-cong-bo-form',
  templateUrl: './quyet-dinh-cong-bo-form.component.html',
  styleUrls: ['./quyet-dinh-cong-bo-form.component.scss']
})
export class QuyetDinhCongBoFormComponent implements OnInit {
  @ViewChild('editThanhPhanThamGia') public modalEditThanhPhanThamGia: ModalDirective;
  @ViewChild('editDanhSachDonViThamGia') public modalEditDanhSachDonViThamGia: ModalDirective;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('thongTinNguoiDaiDienModal') public thongTinNguoiDaiDienModal: ModalDirective;

  formEditDonViThamGia: FormGroup;
  selectedThanhPhanThamGia: string;
  selectedDonViThamGia: string;
  selectedLoaiDonViThamGia: string;
  hiddenErr_LyDoVangMat_ThanhPhanThamGia: Boolean = true;
  hiddeErr_LyDoVangMat_DonViThamGia: Boolean = true;
  hiddenErr_FormEditDonViThamGia: Boolean = true;
  hiddenDuyet: Boolean = true;
  hiddenGui: Boolean = true;
  title: any;
  titleDonVi: any;
  luu: boolean = false;
  duyet: boolean = false;
  listChucVu: Array<any> = [];
  danhsachdonvithamgia = {};
  typeOption = [];
  currentPage: number = 0;
  pageSize: number = 10;
  isTTKT: Boolean = false;

  // File
  tenFileBienBanCongBo: any;
  tenFileBBCongBoModal: any;
  urlFileDownload: any;

  // Rework
  @ViewChild('fileBienBanCongBo') fileInputRef: ElementRef;
  @ViewChild('fileBBCongBo') fileBBCongBo: ElementRef;
  thanhLapDoanId: any;
  quyetDinhTLDForm: FormGroup;
  currentThanhLapDoan: any;
  fileBienBanCongBo: any = [];
  thanhPhanThamGia: any = [];
  thanhPhanThamGiaIndex: number;
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  formEditThanhPhanThamGia: FormGroup;
  tableContent: any = [];
  strNguoiDaiDienOrUyQuyen: any;

  // Modal edit đơn vị
  index1: number;
  index2: number;

  // Modal chi tiết người đại diện đơn vị
  childItem: any;

  // Check đã công bố chưa
  isHaveCongBo: boolean = false;
  isCanEdit: boolean = true;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tldService: ThanhLapDoanService,
    private fileResourceService: FileResourceService,
    private timeBuilder: TimeBuilderService,
    private alert: AlertService,
    private location: Location,
    public formService: FormService,
    private noiDmChucDanhService: NoiDmChucDanhService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.formEditThanhPhanThamGia = this.builder.group({
      isVangMat: [false, Validators.required],
      lyDoVangMat: ['', Validators.required]
    });
    // this.formEditThanhPhanThamGia.valueChanges.subscribe(val => { console.log(val) })
    this.formEditThanhPhanThamGia.get('isVangMat').valueChanges.subscribe(vangmat => {
      if (!vangmat || vangmat == 'false') {
        this.formEditThanhPhanThamGia.get('lyDoVangMat').setValue('');
      }
    });
    this.creatFormEditDviThamGia();
    this.creatTldForm();
    this.getListChucDanh();
    // this.showThongTinNguoiDaiDien();
  }
  getListChucDanh() {
    this.noiDmChucDanhService.getAllDmChucDanh(this.currentPage, this.pageSize, this.auth.currentUser.donViId)
      .subscribe((res: any) => {
        this.listChucVu = res.content;
        //chạy xong list chức vụ mới patch Value vào form, tránh bị undefined
        this.getTldoanID();
      }, err => {
      });
  }

  creatFormEditDviThamGia() {
    this.formEditDonViThamGia = this.builder.group({
      tenDonVi: [''],
      isVangMat: [false, Validators.required],
      lyDoVangMat: ['', Validators.required],
      hasDaiDien: [false, Validators.required],
      tenNguoiDaiDienCb: ['', [Validators.required, Validators.maxLength(30)]],
      dmChucDanhId: [''],
      sdtNguoiDaiDienCb: [''],
      mailNguoiDaiDienCb: [''],
      isUyQuyenCb: ['', Validators.required],
      soGiayUyQuyenCb: [''],
      fileUyQuyenCb: [''],
      hieuLucUyQuyenFrom: [''],
      hieuLucUyQuyenTo: [''],
      haveFile: false
    });
    const configFieldFormDviTg = {
      isVangMat: {
        listField: ['hasDaiDien', 'isUyQuyenCb', 'tenNguoiDaiDienCb',
          'sdtNguoiDaiDienCb', 'mailNguoiDaiDienCb', 'dmChucDanhId', 'soGiayUyQuyenCb', 'fileUyQuyenCb', 'hieuLucUyQuyenFrom', 'hieuLucUyQuyenTo'],
        fieldBoolean: ['hasDaiDien']
      },

      hasDaiDien: {
        listField: ['isUyQuyenCb', 'tenNguoiDaiDienCb',
          'sdtNguoiDaiDienCb', 'mailNguoiDaiDienCb', 'dmChucDanhId', 'soGiayUyQuyenCb', 'fileUyQuyenCb', 'hieuLucUyQuyenFrom', 'hieuLucUyQuyenTo'],
        fieldBoolean: ['isUyQuyenCb']
      },
    };
    for (const field of Object.keys(configFieldFormDviTg)) {
      this.formEditDonViThamGia.get(field).valueChanges.subscribe(val => {
        if (field !== 'isVangMat') {
          if (!val || val == 'false') {
            configFieldFormDviTg[field].listField.forEach(key => {
              this.formEditDonViThamGia.get(key).setValue('');
              this.formEditDonViThamGia.get(key).disable();
            });
            configFieldFormDviTg[field].fieldBoolean.forEach(key => {
              this.formEditDonViThamGia.get(key).setValue('');
              this.formEditDonViThamGia.get(key).disable();
            });
          } else {
            configFieldFormDviTg[field].listField.forEach(key => {
              this.formEditDonViThamGia.get(key).enable();
            });
            configFieldFormDviTg[field].fieldBoolean.forEach(key => {
              this.formEditDonViThamGia.get(key).enable();
            });
          }
        }

        if (field !== 'hasDaiDien') {
          if (val && val == 'true') {
            configFieldFormDviTg[field].listField.forEach(key => {
              this.formEditDonViThamGia.get(key).setValue('');
              this.formEditDonViThamGia.get(key).disable();
            });
            configFieldFormDviTg[field].fieldBoolean.forEach(key => {
              this.formEditDonViThamGia.get(key).setValue('');
              this.formEditDonViThamGia.get(key).disable();
            });
          } else {
            configFieldFormDviTg[field].listField.forEach(key => {
              this.formEditDonViThamGia.get(key).enable();
            });
            configFieldFormDviTg[field].fieldBoolean.forEach(key => {
              this.formEditDonViThamGia.get(key).enable();
            });
          }
        }

      });
    }
    this.formEditDonViThamGia.get('isVangMat').valueChanges.subscribe(val => {
      if (!val || val == 'false') {
        this.formEditDonViThamGia.get('lyDoVangMat').setValue('');
        this.formEditDonViThamGia.get('lyDoVangMat').disable();
        configFieldFormDviTg['isVangMat'].listField.forEach(key => {
          this.formEditDonViThamGia.get(key).enable();
        });
      } else {
        this.formEditDonViThamGia.get('lyDoVangMat').enable();
        configFieldFormDviTg['isVangMat'].listField.forEach(key => {
          this.formEditDonViThamGia.get(key).disable();
        });
      }
    });
  }


  emailReg: any = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  creatTldForm() {
    this.quyetDinhTLDForm = this.builder.group({
      quyetDinhTTKT: [''],
      tenBienBan: ['', Validators.required],
      fileBienBan: [''],
      ngay: [(new Date()), Validators.required],
      diaDiem: ['', Validators.required],
      haveFile: false
    });
  }

  getTldoanID() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.thanhLapDoanId = params['id'];
        this.getTlDoanInFo(this.thanhLapDoanId);
      }
    });
  }

  // Get thành lập đoàn theo id
  getTlDoanInFo(id) {
    this.tldService.getThanhLapDoanById(id).subscribe(res => {
      if (res.fileBienBanCongBo) {
        this.fileBienBanCongBo = this.fileResourceService.getFileObj(res.fileBienBanCongBo);
      }
      if (res.fileBienBanCongBo || res.tenBienBanCongBo || res.diaDiemCongBo || res.ngayBienBanCongBo) {
        this.isHaveCongBo = true;
        this.isCanEdit = false;
      }

      this.patchValueTlDoanForm(res);
      this.patchValueThanhPhanThamGia(res);
      this.patchValueDonViThamGia(res);
      this.currentThanhLapDoan = res;
    }, err => { });
  }

  onEdit() {
    this.isHaveCongBo = false;
    this.isCanEdit = true;
    this.luu = false;
  }

  // Patch Value vào form thành lập doàn
  patchValueTlDoanForm(res) {
    if (res.ngayBienBanCongBo) {
      this.quyetDinhTLDForm.controls.ngay.setValue(res.ngayBienBanCongBo, { onlySelf: true });
    }

    this.quyetDinhTLDForm.patchValue({
      quyetDinhTTKT: res.tenQuyetDinh,
      tenBienBan: res.tenBienBanCongBo,
      fileBienBan: (this.fileBienBanCongBo || {}).fileName,
      diaDiem: res.diaDiemCongBo,
      haveFile: res.fileBienBanCongBo ? true : false
    });
  }

  // Patch value cho table thành phần tham gia
  patchValueThanhPhanThamGia(res) {
    for (const item of res.danhSachDoans) {
      const _el: any = item;
      if (String(item.isVangMat) !== "null") {
        _el.isVangMat = String(item.isVangMat);
      } else {
        _el.isVangMat = "false";
      }
      this.thanhPhanThamGia.push(_el);
    }
  }

  // Mở modal Edit thông tin thành phần tham gia
  suaThanhPhanThamGia(index) {
    this.thanhPhanThamGiaIndex = index;
    this.formEditThanhPhanThamGia.patchValue({
      isVangMat: this.thanhPhanThamGia[index].isVangMat,
      lyDoVangMat: this.thanhPhanThamGia[index].lyDoVangMat
    });
    this.formEditThanhPhanThamGia.get('isVangMat').setValue(String(this.thanhPhanThamGia[index].isVangMat));
    this.modalEditThanhPhanThamGia.show();
  }

  checkButtonCapNhat() {
    const formValue = this.formEditThanhPhanThamGia.value;
    if ((formValue.isVangMat === true || formValue.isVangMat === 'true') && (formValue.lyDoVangMat && formValue.lyDoVangMat.trim() != '')) {
      return false;
    } else if (formValue.isVangMat === false || formValue.isVangMat === 'false') {
      return false;
    } else {
      return true;
    }
  }

  // Save modal edit thành phần tham gia
  saveEditThanhPhanThamGia() {
    const index = this.thanhPhanThamGiaIndex;
    const formValue = this.formEditThanhPhanThamGia.value;
    this.thanhPhanThamGia[index].isVangMat = formValue.isVangMat;
    if (formValue.isVangMat === false || formValue.isVangMat === 'false') {
      this.thanhPhanThamGia[index].lyDoVangMat = '';
    } else {
      this.thanhPhanThamGia[index].lyDoVangMat = formValue.lyDoVangMat;
    }
    this.modalEditThanhPhanThamGia.hide();
  }

  // Upload file quyết định công bố
  upFileQDCongBo() {
    const fileEl = this.fileInputRef.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResourceService.uploadFile(files, FILE.FILE_QUYET_DINH).subscribe(res => {
        this.urlFileDownload = res;
        if (this.urlFileDownload.length !== 0) {
          this.tenFileBienBanCongBo = this.urlFileDownload[0].fileName;
        }
        this.fileBienBanCongBo = res[0];
        this.quyetDinhTLDForm.patchValue({
          haveFile: true,
          fileBienBan: res[0].fileName
        });
      }, err => { });
    } else { }
  }

  // download file quyết định công bố
  downLoadFileBBCongBo() {
    this.fileResourceService.downloadFile(this.fileBienBanCongBo.url).subscribe(blob => {
      this.fileResourceService.saveFile(blob, this.fileBienBanCongBo.fileName);
    }, err => { });
  }

  // File Resource cho đơn vị ủy quyền tham gia công bố
  upFileUyQuyenCongBo() {
    const fileEl = this.fileBBCongBo.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResourceService.uploadFile(files, FILE.FILE_BIEN_BAN).subscribe(res => {
        this.urlFileDownload = res;
        if (this.urlFileDownload.length !== 0) {
          this.tenFileBBCongBoModal = this.urlFileDownload[0].fileName;
        }
        this.formEditDonViThamGia.patchValue({
          haveFile: true,
          fileUyQuyenCb: this.fileResourceService.getFileString(res[0]),
        });
      }, err => { });
    } else { }
  }

  downLoadFileUyQuyenCongBo(obj) {
    let fileString = obj;
    try {
      fileString = JSON.parse(fileString);
    } catch (e) {
      fileString = '';
    }
    this.fileResourceService.downloadFile(fileString.url).subscribe(blob => {
      this.fileResourceService.saveFile(blob, fileString.fileName);
    }, err => { });
  }

  getFileName(fileString) {
    if (typeof fileString === 'object') {
      return fileString.fileName;
    } else {
      try {
        fileString = JSON.parse(fileString);
        return fileString.fileName;
      } catch (e) {
        return '';
      }
    }
  }

  // Patch value ra table đơn vị tham gia
  patchValueDonViThamGia(res) {
    const tableContent = res.dsDvDcTTKTS;
    let groupContent: any = groupBy(tableContent, (el: any) => (el.dmPhanLoaiDtId));
    groupContent = Object.keys(groupContent).map(key => {
      return [Number(key), groupContent[key]];
    });
    for (const item of groupContent) {
      // Patch value to table content
      const _el: any = {};
      _el.dmPhanLoaiDtId = item[1][0].dmPhanLoaiDtId;
      _el.tenDanhMuc = item[1][0].tenDanhMucPhanLoaiDt;
      _el.thanhLapDoanId = item[1][0].thanhLapDoanId;
      _el.children = [];
      for (const element of item[1]) {
        if(element.moreInfo.status != null){
          this.isTTKT = true;
        }
        element.doiTuongTTKT.noiDungTTKTS = element.noiDungKTS;
        element.doiTuongTTKT.id = element.id;
        element.doiTuongTTKT.tenNguoiDaiDienCb = element.tenNguoiDaiDienCb;
        element.doiTuongTTKT.sdtNguoiDaiDienCb = element.sdtNguoiDaiDienCb;
        element.doiTuongTTKT.mailNguoiDaiDienCb = element.mailNguoiDaiDienCb;
        element.doiTuongTTKT.isUyQuyenCb = element.isUyQuyenCb;
        element.doiTuongTTKT.dmChucDanhId = element.dmChucDanhId;
        if (element.dmChucDanhId !== null) {
          element.doiTuongTTKT.tenChucDanh = this.listChucVu.find(cv => cv.id === element.dmChucDanhId).chucDanh;
        }
        element.doiTuongTTKT.soGiayUyQuyenCb = element.soGiayUyQuyenCb;
        element.doiTuongTTKT.fileUyQuyenCb = element.fileUyQuyenCb;
        element.doiTuongTTKT.hieuLucUyQuyenFrom = element.hieuLucUyQuyenFrom;
        element.doiTuongTTKT.hieuLucUyQuyenTo = element.hieuLucUyQuyenTo;
        element.doiTuongTTKT.lyDoVangMat = element.lyDoVangMat;
        if (String(element.isVangMat) !== "null") {
          element.doiTuongTTKT.isVangMat = String(element.isVangMat);
        } else {
          element.doiTuongTTKT.isVangMat = "false";
        }
        if (element.hasDaiDien !== null) {
          element.doiTuongTTKT.hasDaiDien = element.hasDaiDien;
        } else {
          element.doiTuongTTKT.hasDaiDien = false;
        }
        //element.doiTuongTTKT.hasDaiDien = element.hasDaiDien;
        if (element.fileUyQuyenCb) {
          element.doiTuongTTKT.haveFile = true;
          this.formEditDonViThamGia.patchValue({
            fileUyQuyenCb: element.fileUyQuyenCb,
          });
        } else {
          element.doiTuongTTKT.haveFile = false;
        }
        _el.children.push(element.doiTuongTTKT);
      }
      this.tableContent.push(_el);
    }
  }

  // Mở modal edit đơn vị tham gia
  editDonViThamGia(i, j) {
    const currentItem = this.tableContent[i].children[j];
    this.index1 = i;
    this.index2 = j;
    console.log(currentItem);
    this.formEditDonViThamGia.patchValue({
      tenDonVi: currentItem.tenDoiTuong,
      isVangMat: String(currentItem.isVangMat),
      lyDoVangMat: currentItem.lyDoVangMat,
      hasDaiDien: String(currentItem.hasDaiDien),
      tenNguoiDaiDienCb: currentItem.tenNguoiDaiDienCb,
      sdtNguoiDaiDienCb: currentItem.sdtNguoiDaiDienCb,
      mailNguoiDaiDienCb: currentItem.mailNguoiDaiDienCb,
      dmChucDanhId: currentItem.dmChucDanhId,
      soGiayUyQuyenCb: currentItem.soGiayUyQuyenCb,
      tenChucDanh: currentItem.tenChucDanh,
      hieuLucUyQuyenFrom: currentItem.hieuLucUyQuyenFrom,
      hieuLucUyQuyenTo: currentItem.hieuLucUyQuyenTo,
      fileUyQuyenCb: currentItem.fileUyQuyenCb,
    });
    if (currentItem.sUyQuyenCb == null) {
      this.formEditDonViThamGia.patchValue({ isUyQuyenCb: null });
    } else {
      this.formEditDonViThamGia.patchValue({ isUyQuyenCb: String(currentItem.isUyQuyenCb) });
    }
    Object.keys(this.formEditDonViThamGia.controls).forEach(key => {
      this.formEditDonViThamGia.get(key).markAsPristine();
      this.formEditDonViThamGia.get(key).markAsUntouched();
    });
    if (this.formEditDonViThamGia.value.isUyQuyenCb == "false") {
      this.updateValidateNgDaiDien();
    } else if (this.formEditDonViThamGia.value.isUyQuyenCb == "true") {
      this.updateValidateNgUyQuyen();
    }
    this.modalEditDanhSachDonViThamGia.show();
  }

  updateValueAndValidity(control: string, validators: any) {
    this.formEditDonViThamGia.controls[control].setValidators(validators);
    this.formEditDonViThamGia.controls[control].updateValueAndValidity();
  }

  onResetValueUyQuyen() {
    this.strNguoiDaiDienOrUyQuyen = 'đại diện';
    this.updateValidateNgDaiDien();
    //reset value
    this.formEditDonViThamGia.get('dmChucDanhId').setValue(null);
    this.formEditDonViThamGia.get('soGiayUyQuyenCb').setValue(null);
    this.formEditDonViThamGia.get('haveFile').setValue(false);
    this.formEditDonViThamGia.get('fileUyQuyenCb').setValue([]);
    this.formEditDonViThamGia.get('hieuLucUyQuyenFrom').setValue(null);
    this.formEditDonViThamGia.get('hieuLucUyQuyenTo').setValue(null);

  }
  updateValidateNgDaiDien() {
    this.updateValueAndValidity('mailNguoiDaiDienCb', [Validators.pattern(this.emailReg), Validators.required]);
    this.updateValueAndValidity('dmChucDanhId', null);
    this.updateValueAndValidity('soGiayUyQuyenCb', null);
    this.updateValueAndValidity('fileUyQuyenCb', null);
    this.updateValueAndValidity('hieuLucUyQuyenFrom', null);
    this.updateValueAndValidity('hieuLucUyQuyenTo', null);
  }
  onResetValueDaiDien() {
    this.strNguoiDaiDienOrUyQuyen = 'ủy quyền';
    this.updateValidateNgUyQuyen();
    //reset value
    this.formEditDonViThamGia.get('mailNguoiDaiDienCb').setValue(null);
  }
  updateValidateNgUyQuyen() {
    this.updateValueAndValidity('mailNguoiDaiDienCb', null);
    this.updateValueAndValidity('dmChucDanhId', Validators.required);
    this.updateValueAndValidity('soGiayUyQuyenCb', [Validators.required, Validators.maxLength(30)]);
    this.updateValueAndValidity('fileUyQuyenCb', Validators.required);
    this.updateValueAndValidity('hieuLucUyQuyenFrom', [Validators.required, DateCompareValidator('hieuLucUyQuyenTo', true)]);
    this.updateValueAndValidity('hieuLucUyQuyenTo', [Validators.required, DateCompareValidator('hieuLucUyQuyenFrom', false)]);
  }
  // update/save info đơn vị tham gia
  saveEditDonViThamGia() {
    this.formService.touchAllInput(this.formEditDonViThamGia);
    const formValue = this.formEditDonViThamGia.value;
    //update requied
    if (formValue.isUyQuyenCb === 'true') {
      this.updateValidateNgUyQuyen();
    } else if (formValue.isUyQuyenCb === 'false') {
      this.updateValidateNgDaiDien();
    }
    if (this.formEditDonViThamGia.invalid || (formValue.hasDaiDien == 'true' && formValue.isUyQuyenCb == null)) {
      this.alert.error("Bạn chưa điền đầy đủ thông tin");
      return;
    }
    const index1 = this.index1;
    const index2 = this.index2;

    this.tableContent[index1].children[index2].tenDonVi = formValue.tenDonVi;
    this.tableContent[index1].children[index2].isVangMat = formValue.isVangMat;
    this.tableContent[index1].children[index2].hasDaiDien = formValue.hasDaiDien;
    this.tableContent[index1].children[index2].isUyQuyenCb = formValue.isUyQuyenCb;
    this.tableContent[index1].children[index2].tenNguoiDaiDienCb = formValue.tenNguoiDaiDienCb;
    this.tableContent[index1].children[index2].sdtNguoiDaiDienCb = formValue.sdtNguoiDaiDienCb;
    // Nếu vắng mặt -> Xóa value lý do
    if (formValue.isVangMat === false || formValue.isVangMat == 'false') {
      this.tableContent[index1].children[index2].lyDoVangMat = '';
    } else {
      this.tableContent[index1].children[index2].lyDoVangMat = formValue.lyDoVangMat;
    }
    if (formValue.isUyQuyenCb === 'false') {
      this.tableContent[index1].children[index2].mailNguoiDaiDienCb = formValue.mailNguoiDaiDienCb;

      this.tableContent[index1].children[index2].dmChucDanhId = null;
      this.tableContent[index1].children[index2].tenChucDanh = null;
      this.tableContent[index1].children[index2].soGiayUyQuyenCb = null;
      this.tableContent[index1].children[index2].fileUyQuyenCb = [];
      this.tableContent[index1].children[index2].hieuLucUyQuyenFrom = null;
      this.tableContent[index1].children[index2].hieuLucUyQuyenTo = null;
    } else if (formValue.isUyQuyenCb === 'true') {
      this.tableContent[index1].children[index2].mailNguoiDaiDienCb = null;

      this.tableContent[index1].children[index2].dmChucDanhId = formValue.dmChucDanhId;
      this.tableContent[index1].children[index2].tenChucDanh = this.listChucVu.find(cv => cv.id === +formValue.dmChucDanhId).chucDanh;
      this.tableContent[index1].children[index2].soGiayUyQuyenCb = formValue.soGiayUyQuyenCb;
      this.tableContent[index1].children[index2].fileUyQuyenCb = formValue.fileUyQuyenCb;
      this.tableContent[index1].children[index2].hieuLucUyQuyenFrom = formValue.hieuLucUyQuyenFrom;
      this.tableContent[index1].children[index2].hieuLucUyQuyenTo = formValue.hieuLucUyQuyenTo;
    }
    this.modalEditDanhSachDonViThamGia.hide();
  }
  showThongTinNguoiDaiDien(ngDaiDien) {
    this.childItem = Object.assign(ngDaiDien);
    this.thongTinNguoiDaiDienModal.show();
  }

  // Send data lên server
  onSubmit() {
    this.formService.touchAllInput(this.quyetDinhTLDForm);
    if (this.quyetDinhTLDForm.invalid) {
      this.alert.error("Bạn chưa điền đủ thông tin");
      return;
    }
    const formValue = this.quyetDinhTLDForm.value;
    const formBody: any = this.currentThanhLapDoan;
    formBody.tenBienBanCongBo = formValue.tenBienBan;
    formBody.ngayBienBanCongBo = this.timeBuilder.fromTimeDatePicker(formValue.ngay).setUTC().toISOString();
    formBody.ngayCongBo = this.timeBuilder.fromTimeDatePicker(formValue.ngay).setUTC().toISOString();
    formBody.diaDiemCongBo = formValue.diaDiem;
    formBody.fileBienBanCongBo = this.fileResourceService.getFileString(this.fileBienBanCongBo);
    formBody.danhSachDoans = this.thanhPhanThamGia;
    formBody.dsDvDcTTKTS = this.saveDvDcTTKTS(formBody.dsDvDcTTKTS, this.tableContent);
    this.tldService.ver2QdinhCongBo(formBody).subscribe(res => {
      this.alert.success(QUAN_LY_DOAN.SUCCESS_CONG_BO_QUYET_DINH);
      this.luu = true;
      this.isHaveCongBo = true;
      this.isCanEdit = false;
    }, err => {
      this.alert.error(QUAN_LY_DOAN.ERROR_CONG_BO_QUYET_DINH);
    });
  }

  // Xử lí data cho đơn vị đc TTKT
  saveDvDcTTKTS(currentdsDvDcTTKTS, dataTable) {
    for (let item of currentdsDvDcTTKTS) {
      item = this.getInfoDvDcTTKTS(item, dataTable);
    }
    return currentdsDvDcTTKTS;
  }

  getInfoDvDcTTKTS(item, dataTable) {
    for (const element of dataTable) {
      for (const el of element.children) {
        if (item.id === el.id) {
          if (el.isVangMat === 'true') {
            item.isThamGiaCongBo = false;
            item.isVangMat = true;
          } else {
            item.isThamGiaCongBo = true;
            item.isVangMat = false;
          }
          item.lyDoVangMat = el.lyDoVangMat;
          item.hasDaiDien = el.hasDaiDien;
          item.tenNguoiDaiDienCb = el.tenNguoiDaiDienCb;
          item.sdtNguoiDaiDienCb = el.sdtNguoiDaiDienCb;
          item.mailNguoiDaiDienCb = el.mailNguoiDaiDienCb;
          item.isUyQuyenCb = el.isUyQuyenCb;
          item.dmChucDanhId = el.dmChucDanhId;
          item.soGiayUyQuyenCb = el.soGiayUyQuyenCb;
          item.fileUyQuyenCb = this.fileResourceService.getFileString(el.fileUyQuyenCb);
          item.hieuLucUyQuyenFrom = el.hieuLucUyQuyenFrom;
          item.hieuLucUyQuyenTo = el.hieuLucUyQuyenTo;
          return item;
        }
      }
    }
  }

  onDuyet() {
    this.duyet = true;
    this.duyetModal.show();
  }

  onSubmitDuyet() {
    this.duyetModal.hide();
    this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tien-hanh-ttkt-tw']);
  }

  edit_CoQuanBHXH(index, type) {
    this.resetErrMessage();
    this.selectedLoaiDonViThamGia = 'coQuanBHXH';
    this.selectedDonViThamGia = index;

    this.title = this.typeOption[type - 1].name;
    this.modalEditDanhSachDonViThamGia.show();
  }

  checkErrFormEditDonViThamGia() {
    if (this.formEditDonViThamGia.value.thamGiaCongBo_DonViThamGia === '') {
      return false;
    } else {
      return true;
    }
  }

  checkErrLyDoVangMat_DonViThamGia() {
    if (this.formEditDonViThamGia.value.thamGiaCongBo_DonViThamGia === 'no') {
      if (!this.formEditDonViThamGia.value.lyDoVangMat_DonViThamGia) {
        this.hiddeErr_LyDoVangMat_DonViThamGia = false;
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  resetErrMessage() {
    this.hiddenErr_LyDoVangMat_ThanhPhanThamGia = true;
    this.hiddeErr_LyDoVangMat_DonViThamGia = true;
    this.hiddenErr_FormEditDonViThamGia = true;
  }

  onBack() {
    this.location.back();
  }
}
