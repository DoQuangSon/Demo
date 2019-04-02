
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { ModalDirective } from 'ngx-bootstrap';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../../constants';
import { KeHoachToanNganhService } from '../../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { NoiAccountService } from '../../../../../../../services/api/noi-account/noi-account.service';
import { QUY, LOAIHINHTTKT, CHECK_LOAIHINH_TTKT, TRANG_THAI_KH, STATUS } from '../../../../../../../constants/ke-hoach-ttkt.constants';
import { AlertService } from '../../../../../../../services/api/alert.service';
import { NoiDmChutriPhoiHopService } from '../../../../../../../services/api/danh-muc/noi-dmChutriPhoihop/noi-dm-chutri-phoi-hop.service';
import { NoiDmTinhHuyenService } from '../../../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { FILE } from '../../../../../../../constants/api-file.constants';
import { FileResourceService } from '../../../../../../../services/helper/file-resource.service';
import { TimeBuilderService } from '../../../../../../../services/helper/time-builder.service';
import { MESS_TAO_KH_TW } from '../../../../../../../constants/message.constants';
import { NoiKehoachDuthaoService } from '../../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { AuthService } from '../../../../../../../auth/auth.service';
@Component({
  selector: 'ttkt-dieu-chinh',
  templateUrl: './dieu-chinh.component.html',
  styleUrls: ['./dieu-chinh.component.scss']
})
export class DieuChinhComponent implements OnInit {
  @ViewChild('addKehoach') addKehoach: ModalDirective;
  @ViewChild('fileQDDieuChinhKH') fileInputRef1: ElementRef;
  @ViewChild('fileQuyetDinhTaoKH') fileInputRef2: ElementRef;

  dieuchinhForm: FormGroup;
  addKehoachform: FormGroup;
  listKeHoach: any[] = [];
  id: any;
  type: any;
  chiTietKH: any;
  keHoachNam: any;
  account: any;
  sua = false;
  isCapNhat: boolean;
  isDieuChinh: boolean;
  tenFileQuyetDinhTaoKH: any;
  tenFileQuyetDinhDC: any;
  public listTinhThanh: any[] = [];
  loaiHinhTTKT: any[] = LOAIHINHTTKT;
  listDonViPhoiHop: any;
  selectedDonViPhoiHop: any;
  listDmChutriPhoihop: any[] = [];
  fileQDDieuChinhKH: any = [];
  fileQDTaoKH: any = [];
  duyet = false;
  responseData: any = {};
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  formBody: any = {};
  disableForm = false;
  date: Date = new Date();
  modelDate: any = { date: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() } };
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private noiAccountService: NoiAccountService,
    private alertService: AlertService,
    private timeBuilderService: TimeBuilderService,
    private noiDmChutriPhoiHopService: NoiDmChutriPhoiHopService,
    private noiDmTinhHuyenService: NoiDmTinhHuyenService,
    private fileResource: FileResourceService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.listDonViPhoiHop = [];
    this.setOffAllButtons();
    this.addKehoachform = this.fb.group({
      chonQuy: ['0'],
      chonTinh: ['0'],
      donViChuTri: ['0'],
      donViChiPhoi: ['0'],
      loaiHinhTTKT: ['0']
    });
    this.dieuchinhForm = this.fb.group({
      nam: [''],
      ngayDc: [this.date, [Validators.required]],
      soQuyetdinhDc: ['', [Validators.required]],
      lyDo: ['', [Validators.required]],
      tenKehoach: ['', [Validators.required]],
      ngayTao: ['', [Validators.required]],
      soQuyetDinh: ['', [Validators.required]],
      ngayKy: ['', [Validators.required]],
      nguoiKy: ['', [Validators.required]],
      nguoiKi: ['', [Validators.required]],
      nguoiTao: [this.auth.currentUser.tenHienThi, [Validators.required]]
    });
    this.account = this.auth.currentUser;
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.type = params['type'];
      if (this.type === 'capnhat') {
        this.isCapNhat = true;
      } else {
        if (this.type === 'dieuchinh') {
          this.isDieuChinh = true;
        } else {
          this.isDieuChinh = false;
        }

      }
      this.noiKehoachDuthaoService.getById(this.id)
        .subscribe(res => {
          this.chiTietKH = res;
          this.keHoachNam = res.keHoachYear;
          this.listKeHoach = res.chiTietKhTWSet;
          this.fileQDTaoKH = res.fileQuyetDinhTaoKH;
          this.tenFileQuyetDinhTaoKH = JSON.parse(res.fileQuyetDinhTaoKH)[0].fileName;
          this.dieuchinhForm.patchValue({
            nam: res.keHoachYear,
            tenKehoach: res.tenKeHoach,
            soQuyetDinh: res.soQuyetDinhTaoKeHoach,
            nguoiKy: res.nguoiKyQDTaoKeHoach,
            // nguoiKi: res.nguoiKyQDTaoKeHoach,
            ngayTao: res.ngayQuyetDinhTaoKeHoach,
            ngayKy: res.ngayKyQDTaoKeHoach,
          });
        }, err => { });
    });
    this.noiDmChutriPhoiHopService.getAllDmChutriPhoihop(0, 10)
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
      }, err => { });
    this.noiDmTinhHuyenService.getDanhSachTinhThanh()
      .subscribe(res => this.listTinhThanh = res['content']);
  }

  generate() {
    const formValue = this.dieuchinhForm.value;
    const arrChitiet: any[] = [];
    const listDonViPhoiHop = [];

    if (this.selectedDonViPhoiHop) {
      for (const i of this.selectedDonViPhoiHop) {
        listDonViPhoiHop.push({
          dmCTriPHop: {
            id: i.id
          }
        });
      }
    } else {
      this.selectedDonViPhoiHop = [];
    }
    this.listKeHoach.forEach(el => {
      const chitiet: any = {};
      if (el.isAdd) {
      } else {
        chitiet.id = el.id;
      }
      chitiet.quyThucHien = el.quyThucHien;
      chitiet.donViChuTri = { 'id': el.donViChuTriId };
      chitiet.phoiHopTw = listDonViPhoiHop;
      chitiet.dmTinhHuyen = { 'id': el.dmTinhHuyenId };
      chitiet.actived = el.actived;
      chitiet.loaiHinhTTKT = el.loaiHinhTTKT;
      arrChitiet.push(chitiet);
    });

    this.formBody.chiTietKehoachTWS = arrChitiet;
    this.formBody.createBy = { 'id': this.chiTietKH.createById };
    this.formBody.isOwnerTW = this.chiTietKH.ownerTW;
    this.formBody.keHoachYear = this.chiTietKH.keHoachYear;
    this.formBody.nguoiKyQDTaoKeHoach = this.chiTietKH.nguoiKyQDTaoKeHoach;
    this.formBody.soQuyetDinhDieuChinh = formValue.soQuyetdinhDc;
    this.formBody.khDthaoOld = { 'id': this.id };
    this.formBody.soQuyetDinhTaoKeHoach = this.chiTietKH.soQuyetDinhTaoKeHoach;
    this.formBody.status = STATUS.STATUS_KHDUTHAO_TW_CHO_DUYET_DIEU_CHINH;
    this.formBody.tenKeHoach = this.chiTietKH.tenKeHoach;
    this.formBody.tenQuyetDinhTaoKeHoach = this.chiTietKH.tenQuyetDinhTaoKeHoach;
  }
  onListKH(listKeHoach) {
    this.listKeHoach = listKeHoach;
  }
  onLuu(key) {
    console.log(key, this.listKeHoach);

    if (key === 'capnhat') {
      this.keHoachToanNganhService.twSuaKeHoachDauNam(this.chiTietKH)
        .subscribe(res => {
          this.alertService.success(MESS_TAO_KH_TW.SUCCESS_CAP_NHAT_KH);
          this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn']);
        });
    } else {
      if (this.dieuchinhForm.valid && (this.fileQDTaoKH.length !== 0) && (this.fileQDDieuChinhKH.length !== 0)) {
        const formValue = this.dieuchinhForm.value;
        let formBody = Object.assign({}, this.chiTietKH);
        formBody.fileQuyetDinhDieuChinh = this.fileResource.getFileString(this.fileQDDieuChinhKH);
        formBody.lyDoDieuChinh = formValue.lyDo;
        formBody.nguoiKyQDTaoKeHoach = formValue.nguoiKi;
        formBody.tenNguoiTao = formValue.nguoiTao;
        formBody.soQuyetDinhDieuChinh = formValue.soQuyetdinhDc;
        formBody.chiTietKhTWSet = this.listKeHoach.filter(res => res.id !== null);
        formBody.ngayQuyetDinhTaoKeHoach = formValue.ngayTao || '';
        formBody.ngayKyQDTaoKeHoach = formValue.ngayKy || '';
        formBody.ngayDieuChinh = formValue.ngayDc;
        if (typeof this.fileQDTaoKH === 'string') {
          formBody.fileQuyetDinhTaoKH = this.fileQDTaoKH;
        } else {
          formBody.fileQuyetDinhTaoKH = this.fileResource.getFileString(this.fileQDTaoKH);
        }
        console.log(formBody, this.chiTietKH);
        this.keHoachToanNganhService.twDieuChinhKeHoachDauNam(formBody)
          .subscribe(res => {
            this.alertService.success(MESS_TAO_KH_TW.SUCCESS_CAP_NHAT_KH);
            this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn']);
          });
      } else {
        this.alertService.error('Bạn cần điền thêm thông tin');
      }
    }
  }

  onDuyet() {
    const status = STATUS.STATUS_KHDUTHAO_TW_DA_DUOC_DUYET_DIEU_CHINH;
    this.noiKehoachDuthaoService.changeStatus(this.responseData.id, status)
      .subscribe(res => {
        this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn/chi-tiet-ke-hoach/' + this.responseData.id]);
      }, err => { });
  }
  onSua() {
    this.sua = true;
    this.duyet = false;
  }

  upFileQDDieuChinhKH() {
    const fileEl = this.fileInputRef1.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResource.uploadFile(files, FILE.FILE_QUYET_DINH).subscribe(res => {
        this.fileQDDieuChinhKH = res;
        this.tenFileQuyetDinhDC = res[0].fileName;
      }, err => {
        this.alertService.error(err.title);
      });
    } else { }
  }

  refreshValueDVPH(value: any): void {
    this.selectedDonViPhoiHop = value;
  }

  setOffAllButtons() {
    this.isCapNhat = false;
    this.isDieuChinh = false;
  }
}
