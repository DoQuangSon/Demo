import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Form, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { KeHoachToanNganhService } from '../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { STATUS } from '../../../../../../constants/status.constants';
import { StatesService } from '../../../../../../services/api/state.service';
import { NoiKehoachDuthaoService } from '../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { NoiAccountService } from '../../../../../../services/api/noi-account/noi-account.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { MESS_FROM_TW, COMMON_ERROR_MESS } from '../../../../../../constants/message.constants';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { FILE } from '../../../../../../constants/api-file.constants';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { AuthService } from '../../../../../../auth/auth.service';
@Component({
  selector: 'ttkt-giao-ke-hoach-cho-cac-tinh',
  templateUrl: './giao-ke-hoach-cho-cac-tinh.component.html',
  styleUrls: ['./giao-ke-hoach-cho-cac-tinh.component.scss']
})
export class GiaoKeHoachChoCacTinhComponent implements OnInit {
  @ViewChild('guiKHModal') modal: ModalDirective;
  @ViewChild('giaoKehoachModel') giaoKehoachModel: ModalDirective;
  @ViewChild('fileQuyetDinhTaoKH') fileInputRef1: ElementRef;
  formGuiKHModal: FormGroup;
  formTimKiem: FormGroup;
  selectYear: FormControl;
  editGhichu: boolean = false;
  coDieuChinh: boolean = false;
  displayTongSo: boolean = true;
  luu: boolean = false;
  duyet: boolean = false;
  currentYear = (new Date()).getFullYear();
  khYear: any;
  listYear: any[] = [];
  listKeHoach: any[] = [];
  dsTinhDieuChinh: any[] = [];
  stateData: any;
  dmbhxhid: any;
  account: any = {};
  onGiaoKh: boolean = false;
  tenKh: FormControl = new FormControl('', Validators.required);
  nguoiKi: FormControl = new FormControl('', Validators.required);
  soQd: FormControl = new FormControl('', Validators.required);
  nguoiTao: FormControl = new FormControl(this.auth.currentUser.tenHienThi, Validators.required);
  ngay: FormControl;
  fileQd: any;
  tenFile: any = null;
  isDisableGiaoKH: boolean;
  date: Date = new Date();
  modelDate: any = { date: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() } };
  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private keHoachService: KeHoachToanNganhService,
    private statesService: StatesService,
    private alertService: AlertService,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private noiAccountService: NoiAccountService,
    private timeBuilder: TimeBuilderService,
    private fileResource: FileResourceService,
    private auth: AuthService
  ) {
     this.ngay = new FormControl(this.date, [Validators.required]);
  }

  ngOnInit() {
    this.statesService.onGiaoKeHoach.subscribe(res => {
      this.onGiaoKh = res;
    });
    this.formGuiKHModal = this.fb.group({
      noiDungLn: [''],
      inputSend: ['BHXH Tỉnh']
    });
    this.formTimKiem = this.fb.group({
      searchKey: ['']
    });
    if (!this.dmbhxhid) {
      this.noiAccountService.getAcount()
        .subscribe(res => {
          this.dmbhxhid = res.dmTinhHuyenId;
        }, err => { });
    }
    this.dmbhxhid = this.auth.currentUser.dmTinhHuyenId;
    this.getListKeHoach(this.currentYear);
    this.router.params.subscribe(params => {
      if (params['year']) {
        this.khYear = params['year'];
      } else {
        this.khYear = this.currentYear;
      }
    });
    this.selectYear = new FormControl(this.currentYear);
    this.getListYear();
  }
  getListKeHoach(year) {
    this.keHoachService.getListKeHoachGiaoTinh(year)
      .subscribe(res => {
        this.listKeHoach = res;
      }, err => { });
  }

  onDieuChinh() {
    this.coDieuChinh = true;
    this.luu = false;
  }

  generate(arr: any[]) {
    arr.forEach(el => {
      const date = new Date();
      const convertDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()));
      const result = convertDate.toISOString();
      const formBody: any = {};
      const chitiet: any = {};
      chitiet.actived = true;
      chitiet.coSoKhamChuaBenh = el.chiTietKhTinh.coSoKhamChuaBenh;
      chitiet.daiLyThuChiTra = el.chiTietKhTinh.daiLyThuChiTra;
      chitiet.dmTinhHuyen = el.chiTietKhTinh.dmTinhHuyen;
      chitiet.donViSDLD = el.chiTietKhTinh.donViSDLD;
      chitiet.lienNganh = el.chiTietKhTinh.lienNganh;
      chitiet.lyDoTuChoiDieuChinh = el.chiTietKhTinh.lyDoTuChoiDieuChinh;
      chitiet.lyDoTuChoiKeHoach = el.chiTietKhTinh.lyDoTuChoiKeHoach;
      chitiet.ngayDuocGiaoKeHoach = result;
      chitiet.ngayGuiTW = el.chiTietKhTinh.ngayGuiTW;
      chitiet.ngayXinDieuChinh = el.chiTietKhTinh.ngayXinDieuChinh;
      chitiet.noiBoCoQuanBHXH = el.chiTietKhTinh.noiBoCoQuanBHXH;
      chitiet.quyThucHien = el.chiTietKhTinh.quyThucHien;
      chitiet.thanhTraChuyenNganhDVSDLD = el.chiTietKhTinh.thanhTraChuyenNganhDVSDLD;

      formBody.actived = true;
      formBody.chiTietKeHoachTinh = chitiet;
      formBody.createBy = { 'id': el.createById };
      formBody.currentDieuChinh = el.currentDieuChinh;
      formBody.isDaDuocDieuChinh = el.isDaDuocDieuChinh;
      formBody.fileQuyetDinhDieuChinh = el.fileQuyetDinhDieuChinh;
      formBody.fileQuyetDinhTaoKH = el.fileQuyetDinhTaoKH;
      formBody.isOwnerTW = el.isOwnerTW;
      formBody.keHoachYear = el.keHoachYear;
      formBody.isDaGiaoTinh = true;
      formBody.khDthaoOld = { id: el.id };
      formBody.lyDoDieuChinh = el.lyDoDieuChinh;
      formBody.ngayQuyetDinhTaoKeHoach = el.ngayQuyetDinhTaoKeHoach;
      formBody.nguoiKyQDTaoKeHoach = el.nguoiKyQDTaoKeHoach;
      formBody.tenNguoiTao = el.tenNguoiTao;
      formBody.soQuyetDinhDieuChinh = el.soQuyetDinhDieuChinh;
      formBody.soQuyetDinhTaoKeHoach = el.soQuyetDinhTaoKeHoach;
      formBody.status = STATUS.STATUS_KHDUTHAO_TINH_TW_GIAO_KE_HOACH;
      formBody.tenKeHoach = el.tenKeHoach;
      formBody.dmTinhHuyen = { 'id': this.dmbhxhid };
      console.log(formBody);
      this.noiKehoachDuthaoService.createNewKhDuthao(formBody)
        // tslint:disable-next-line:no-shadowed-variable
        .subscribe(res => {
          console.log(res);
          this.luu = true;
          this.coDieuChinh = false;
          this.onGiaoKh = true;
          this.statesService.emitGiaoKeHoach(true);
          this.giaoKehoachModel.hide();
        }, err => {
          console.log(err);
        });
    });
  }

  onLuu() {
    if (!this.onGiaoKh) {
      this.listKeHoach.map(res => {
        res.tenNguoiTao = this.nguoiTao.value;
        res.tenKeHoach = this.tenKh.value;
        res.nguoiKyQDTaoKeHoach = this.nguoiKi.value;
        res.soQuyetDinhTaoKeHoach = this.soQd.value;
        res.fileQuyetDinhTaoKH = this.fileResource.getFileString(this.fileQd);
        res.ngayQuyetDinhTaoKeHoach = this.ngay.value;
      });
      this.keHoachService.twGiaoKeHoachChoTinh(this.listKeHoach)
        .subscribe(res => {
          this.alertService.success(MESS_FROM_TW.SUCCESS_GIAO_KH);
          this.coDieuChinh = false;
          this.onGiaoKh = true;
          this.giaoKehoachModel.hide();
          this.getListKeHoach(this.currentYear);
          this.refeshData();
        }, err => { });
    }
  }

  onTimKiem() {
    const result = [];
    const searchKey = this.formTimKiem.value.searchKey.toLowerCase();
    if (searchKey == null || searchKey === '') {
      this.getListKeHoach(this.currentYear);
    } else {
      for (const i in this.listKeHoach) {
        if (this.listKeHoach[i].tenTinhHuyen.toLowerCase().includes(searchKey)) {
          result.push(this.listKeHoach[i]);
        }
      }
      this.listKeHoach = result;
    }
  }

  onDuyet() {
    this.duyet = true;
  }

  onSend() {
    this.modal.show();
  }
  onOpenPopup() {
    this.validateThongTinChung();
  }
  getListYear() {
    for (let i = -3; i < 20; i++) {
      const year = this.currentYear.valueOf() + i;
      this.listYear.push(year);
    }
  }
  changeYear(e: any) {
    this.getListKeHoach(Number(e.target.value));
  }
  upFileQuyetDinh() {
    const fileEl = this.fileInputRef1.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResource.uploadFile(files, FILE.FILE_QUYET_DINH).subscribe(res => {
        if (res !== 0) {
          this.fileQd = res;
          this.tenFile = res[0].fileName;
        }
      }, err => {
        this.alertService.error(err.title);
      });
    } else { }
  }
  refeshData() {
    this.soQd.reset();
    this.tenKh.reset();
    this.nguoiKi.reset();
    this.fileQd = null;
    this.tenFile = null;
    this.selectYear.setValue(this.currentYear);
    this.ngay.setValue(this.date);
  }
  validateThongTinChung () {
    if ( this.listKeHoach.length !== 0
      && this.tenKh.value !== '' && this.nguoiKi.value !== ''
      && this.soQd.value !== '' && this.tenFile !== null && this.ngay !== null && this.nguoiTao !== null) {
        this.giaoKehoachModel.show();
    } else {
      this.alertService.error(COMMON_ERROR_MESS.THIEU_FIELD_REQUIRED);
      return;
    }
  }
}
