import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMON_SUCCESS_MESS, MESS_TAO_KH_TW } from '../../../../../../../constants/message.constants';
import { cloneDeep } from 'lodash';
import { CHECK_LOAIHINH_TTKT, LOAIHINHTTKT, QUY } from '../../../../../../../constants/ke-hoach-ttkt.constants';
import { ModalDirective } from '../../../../../../../../../node_modules/ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../../../node_modules/@angular/forms';
import { IMyDpOptions } from '../../../../../../../../../node_modules/mydatepicker';
import { Router } from '../../../../../../../../../node_modules/@angular/router';
import { FILE } from '../../../../../../../constants/api-file.constants';
import { NoiDmChutriPhoiHopService } from '../../../../../../../services/api/danh-muc/noi-dmChutriPhoihop/noi-dm-chutri-phoi-hop.service';
import { StatesService } from '../../../../../../../services/api/state.service';
import { NoiDmTinhHuyenService } from '../../../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { NoiAccountService } from '../../../../../../../services/api/noi-account/noi-account.service';
import { TimeBuilderService } from '../../../../../../../services/helper/time-builder.service';
import { NoiKehoachDuthaoService } from '../../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { AlertService } from '../../../../../../../services/api/alert.service';
import { FileResourceService } from '../../../../../../../services/helper/file-resource.service';
import { KeHoachToanNganhService } from '../../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { AuthService } from '../../../../../../../auth/auth.service';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../../constants';
@Component({
  selector: 'ttkt-tao-kh-du-thao-bhxhvn',
  templateUrl: './tao-kh-du-thao-bhxhvn.component.html',
  styleUrls: ['./tao-kh-du-thao-bhxhvn.component.scss']
})
export class TaoKhDuThaoBhxhvnComponent implements OnInit {

  @ViewChild('fileQuyetDinhTaoKH') fileInputRef1: ElementRef;
  @ViewChild('chooseFileExcel') chooseFileExcel: ModalDirective;
  @ViewChild('addKehoach') addKehoach: ModalDirective;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;

  formModalChooseFile: FormGroup;
  addKehoachform: FormGroup;

  dong: boolean = false;
  taoChiTietKH: boolean = true;
  excel: boolean = false;
  isSua: boolean;
  isDuyet: boolean;
  isLuuTao: boolean;
  isLuuSua: boolean;
  disableForm: boolean;
  validLoaiHinh: boolean = false;
  isDaTaoKeHoach: boolean = false;
  errorTaoKHForm: boolean = false;
  formModal: FormGroup;
  public taoKHForm: FormGroup;
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  public listTinhThanh: any[] = [];
  public listKeHoach: any[] = [];
  loaiHinhTTKT: any[] = LOAIHINHTTKT;
  listDmChutriPhoihop: any[] = [];
  listDmChutriPhoihopByType: any[] = [];
  listDonViPhoiHop: any;
  listDonViPhoiHopByType: any;
  selectedDonViPhoiHop: any;
  fileQuyetDinhTaoKH: any = [];
  tenFileQuyetDinh: any;
  urlFileDownload: any;
  khDuThaoId: any;
  formBody: any = {};
  tmp: any[] = [];
  listQuy: any[] = QUY;
  optionNam: any[] = [];
  account: any = {};
  date: Date = new Date();
  modelDate: any = { date: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() } };

  constructor(
    private builder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private noiDmChutriPhoiHopService: NoiDmChutriPhoiHopService,
    private noiDmTinhHuyenService: NoiDmTinhHuyenService,
    private statesService: StatesService,
    private noiAccountService: NoiAccountService,
    private timeBuilderService: TimeBuilderService,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private alertService: AlertService,
    private fileResource: FileResourceService,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.setOffAllButtons();
    this.isLuuTao = true;
    this.disableForm = false;
    const year = (new Date()).getFullYear();
    this.listDonViPhoiHop = [];
    this.listDonViPhoiHopByType = [];
    for (let i = year; i < year + 12; i++) {
      this.optionNam.push(i);
    }
    this.account = this.auth.currentUser;
    this.formModalChooseFile = this.fb.group({
      inputFile: ['']
    });

    this.noiDmChutriPhoiHopService.getAllDmChutriPhoihopByType(0, 100)
      .subscribe(res => {
        this.listDmChutriPhoihopByType = res['content'];
        for (const i of this.listDmChutriPhoihopByType) {
          this.listDonViPhoiHopByType.push(
            {
              'text': i.tenDonViChuTriPhoiHop,
              'id': i.id
            }
          );
        }
      }, err => {
        console.log(err);
      });

    this.noiDmChutriPhoiHopService.getAllDmChutriPhoihop(0, 100)
      .subscribe(res => {
        this.listDmChutriPhoihop = res['content'];
        for (const i of this.listDmChutriPhoihop) {
          this.listDonViPhoiHop.push(
            {
              'text': i.tenDonViChuTriPhoiHop,
              'id': i.id
            }
          );
        }
      }, err => {
        console.log(err);
      });

    this.noiDmTinhHuyenService.getDanhSachTinhThanh()
      .subscribe(res => {
        this.listTinhThanh = res;
      }, err => {
        console.log(err);
      });
    this.formModal = this.fb.group({
      noiDungLn: [''],
      inputSend: ['BHXH Tỉnh']
    });
    this.addKehoachform = this.fb.group({
      chonQuy: ['', [Validators.required]],
      chonTinh: ['', [Validators.required]],
      donViChuTri: ['', [Validators.required]],
      donViChiPhoi: ['',[Validators.required]],
      loaiHinhTTKT: ['', [Validators.required]]
    });
    this.taoKHForm = this.builder.group({
      nam: ['', [Validators.required]],
      tenKehoach: ['', [Validators.required]],
      ngayTao: [this.date, [Validators.required]],
      soQuyetDinh: ['', [Validators.required]],
      ngayKy: [this.date, [Validators.required]],
      nguoiKy: ['', [Validators.required]],
      tenNguoiTao: [this.auth.currentUser.tenHienThi, [Validators.required]],
      fileQuyetDinh: ['']
    });
  }

  onDieuChinh() {
    this.dong = true;
    this.keHoachToanNganhService.getKeHoachTWDauNam(this.khDuThaoId)
      .subscribe(res => {
        this.formBody = res;
      }, err => { });
  }
  onSua() {
    this.setOffAllButtons();
    this.isLuuSua = true;
    this.keHoachToanNganhService.getKeHoachTWDauNam(this.khDuThaoId)
      .subscribe(res => {
        this.formBody = res;
      }, err => { });
  }

  generate() {
    const formValue = this.taoKHForm.value;
    const arrKHTWS: any[] = [];

    for (let i = 0; i < this.tmp.length; i++) {
      for (let j = 0; j < this.tmp[i].phoiHopTwDTOS.length; j++) {
        this.tmp[i].phoiHopTwDTOS[j] = {
          dmCTriPHopId: this.tmp[i].phoiHopTwDTOS[j].dmCTriPHopId
        };
      }
    }
    this.tmp.forEach(el => {
      const KHTW: any = {};
      KHTW.dmTinhHuyenId = el.dmTinhHuyenId;
      KHTW.donViChuTriId = el.donViChuTriId;
      KHTW.phoiHopTwDTOS = el.phoiHopTwDTOS;
      KHTW.quyThucHien = el.quyThucHien;
      KHTW.loaiHinhTTKT = el.loaiHinhTTKT;
      arrKHTWS.push(KHTW);
    });
    this.formBody.actived = true;
    this.formBody.dmTinhHuyenId = this.account.dmTinhHuyenId;
    this.formBody.chiTietKhTWSet = arrKHTWS;
    this.formBody.isOwnerTW = true;
    this.formBody.isDaDuocDieuChinh = false;
    this.formBody.nguoiKyQDTaoKeHoach = formValue.nguoiKy;
    this.formBody.tenNguoiTao = formValue.tenNguoiTao;
    this.formBody.soQuyetDinhTaoKeHoach = formValue.soQuyetDinh;
    this.formBody.tenQuyetDinhTaoKeHoach = formValue.tenQuyetDinh;
    this.formBody.tenKeHoach = formValue.tenKehoach;
    this.formBody.keHoachYear = formValue.nam;
    this.formBody.isDaGiaoTinh = false;
    this.formBody.fileQuyetDinhTaoKH = this.fileResource.getFileString(this.fileQuyetDinhTaoKH);
    this.formBody.ngayKyQDTaoKeHoach = formValue.ngayKy;
    this.formBody.ngayQuyetDinhTaoKeHoach = formValue.ngayTao;
  }

  onLuuTaoSua(key) {
    if (this.taoKHForm.valid && (this.fileQuyetDinhTaoKH.length !== 0)) {
      this.generate();
      const listDonVi = this.formBody.chiTietKhTWSet;
      if (listDonVi.length > 0) {
        if (key === 'tao') {
          this.keHoachToanNganhService.twTaoKeHoachDuThao(this.formBody)
            .subscribe(res => {
              this.setOffAllButtons();
              this.isSua = true;
              this.isDuyet = true;
              this.disableForm = true;
              this.khDuThaoId = res.id;
              this.alertService.success(COMMON_SUCCESS_MESS.THEM_MOI);
              this.onClose();
            }, err => {
              this.alertService.error(MESS_TAO_KH_TW.ERROR_CHECK_TW_DA_TAO_KH);
            });
        } else if (key === 'sua') {
          // this.keHoachToanNganhService.twSuaKeHoachDauNam(this.formBody)
          //   .subscribe(res => {
          //     this.setOffAllButtons();
          //     this.isSua = true;
          //     this.isDuyet = true;
          //     this.disableForm = true;
          //     this.khDuThaoId = res.id;
          //     this.alertService.success(COMMON_SUCCESS_MESS.CAP_NHAT);
          //   }, err => {
          //     this.alertService.error(MESS_TAO_KH_TW.ERROR_CHECK_TW_DA_TAO_KH);
          //   });
        }
      } else {
        this.alertService.error(MESS_TAO_KH_TW.ERROR_CHUA_THEM_DON_VI_TTKT);
      }
    } else {
      this.alertService.error(MESS_TAO_KH_TW.ERROR_CHUA_DU_THONG_TIN_CHUNG);
    }
  }

  onDuyet() {
    this.duyetModal.show();
  }

  onSubmitDuyet() {
    this.keHoachToanNganhService.twDuyetKeHoachDauNam(this.khDuThaoId)
      .subscribe(data => {
        this.duyetModal.hide();
        this.setOffAllButtons();
        this.disableForm = true;
        this.alertService.success(MESS_TAO_KH_TW.SUCCESS_DUYET_KE_HOACH);
      }, err => { });
    this.router.navigate(['ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-du-thao-bhxhvn/']);
  }

  onClose() {
    this.router.navigate(['ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-du-thao-bhxhvn/']);
  }

  onNhapKHExcel() {
    this.chooseFileExcel.show();
  }

  onSendFile() {
  }
  onThem() {
    if (this.addKehoachform.invalid){
      this.alertService.error('Chưa điền đủ thông tin');
    }
    if (this.addKehoachform.valid) {
      let data: any = {};
      let selectedDonViPhoiHop = [];
      const formValue = this.addKehoachform.value;
      const quy = this.listQuy.find(el => {
        return el.id === Number(formValue.chonQuy);
      });

      const dvChutri = this.listDmChutriPhoihopByType.find(el => {
        return el.id === Number(formValue.donViChuTri);
      });
      const tinh = this.listTinhThanh.find(el => {
        return el.id === Number(formValue.chonTinh);
      });
      if (this.selectedDonViPhoiHop) {
        for (const i of this.selectedDonViPhoiHop) {
          selectedDonViPhoiHop.push({ dmCTriPHopId: i.id });
        }
      } else {
        selectedDonViPhoiHop = [];
      }

      data.id = this.listKeHoach.length + 1;
      data.phoiHopTwDTOS = selectedDonViPhoiHop;
      data.donViChuTriId = dvChutri.id;
      data.dmTinhHuyenId = tinh.id;
      data.quyThucHien = quy.id;
      data.loaiHinhTTKT = Number(formValue.loaiHinhTTKT);
      data.trongKeHoach = true;
      data = this.replaceDuplicateData(data);

      this.excel = true;
      if (data.length !== 0) {
        this.tmp.push(data);
      }

      this.listKeHoach = cloneDeep(this.tmp);
      this.listKeHoach = [...this.listKeHoach];

      this.addKehoach.hide();
    }
  }
  onOpenModalADD() {
    this.resetErrorMess();
    this.addKehoachform.reset();
    this.addKehoachform.patchValue({
      chonQuy: '0',
      chonTinh: '0',
      donViChuTri: '0',
      loaiHinhTTKT: '0'
    });
    this.addKehoach.show();
  }

  refreshValueDVPH(value: any): void {
    this.selectedDonViPhoiHop = value;
  }

  changeLoaiHinh() {
    const value = Number(this.addKehoachform.value.loaiHinhTTKT);
    this.addKehoachform.patchValue({
      donViChiPhoi: ''
    });
    if (value === CHECK_LOAIHINH_TTKT.TTLN || value === CHECK_LOAIHINH_TTKT.KTLN) {
      this.validLoaiHinh = true;
      this.addKehoachform.controls['donViChiPhoi'].setValidators(Validators.required);
      this.addKehoachform.controls['donViChiPhoi'].updateValueAndValidity();
    } else {
      this.validLoaiHinh = false;
      this.addKehoachform.controls['donViChiPhoi'].setValidators(null);
      this.addKehoachform.controls['donViChiPhoi'].updateValueAndValidity();
    }
  }
  checkIsDaTaoKeHoach() {
    const year = Number(this.taoKHForm.value.nam);
    const isOwnerTw = true;
    this.noiAccountService.getAcount()
      .subscribe(res => {
        const tinhHuyenId = res.dmTinhHuyenId;
        this.noiKehoachDuthaoService.checkTinhTaoKH(tinhHuyenId, year, isOwnerTw)
          .subscribe(response => {
            if (response._body === 'false') {
              this.isDaTaoKeHoach = false;
            } else {
              this.isDaTaoKeHoach = true;
              this.alertService.error(MESS_TAO_KH_TW.ERROR_CHECK_TW_DA_TAO_KH);
            }
          }, err => {
          });
      }, err => {
      });
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
  
  resetErrorMess() {
    this.validLoaiHinh = false;
    this.errorTaoKHForm = false;
  }

  replaceDuplicateData(data) {
    const dmTinhHuyenId = data.dmTinhHuyenId;
    if (this.tmp.length !== 0) {
      for (const i in this.tmp) {
        if (dmTinhHuyenId === this.tmp[i].dmTinhHuyenId) {
          this.tmp[i].donViChuTriId = data.donViChuTriId;
          this.tmp[i].loaiHinhTTKT = data.loaiHinhTTKT;
          this.tmp[i].quyThucHien = data.quyThucHien;
          this.tmp[i].phoiHopTwDTOS = data.phoiHopTwDTOS;
          return data = [];
        }
      }
      return data = data;
    } else {
      return data = data;
    }
  }
  setOffAllButtons() {
    this.isSua = false;
    this.isDuyet = false;
    this.isLuuTao = false;
    this.isLuuSua = false;
    this.disableForm = false;
  }
  onListKH(listKeHoach) {
    this.tmp = listKeHoach;
  }

}
