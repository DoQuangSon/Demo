
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
// tslint:disable-next-line:import-blacklist
import { Observable, forkJoin } from 'rxjs';
import { KeHoachToanNganhService } from '../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { NoiKehoachDuthaoService } from '../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { QUY } from '../../../../../../constants/ke-hoach-ttkt.constants';
import { STATUS } from '../../../../../../constants/status.constants';
import { AlertService } from '../../../../../../services/api/alert.service';
import { COMMON_SUCCESS_MESS } from '../../../../../../constants/message.constants';

@Component({
  selector: 'ttkt-ke-hoach-chi-tiet',
  templateUrl: './ke-hoach-chi-tiet.component.html',
  styleUrls: ['./ke-hoach-chi-tiet.component.scss']
})
export class KeHoachChiTietComponent implements OnInit {
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('tuChoiModal') public tuChoiModal: ModalDirective;
  id: any;
  formModal: FormGroup;
  quy: any[] = QUY;
  length: any = 0;
  chiTietKH: any = {};
  tinhTrang: any = '';
  trangThai: any;
  type: any;
  duyetKehoachForm: FormGroup;
  lyDoTuChoi: any;
  tuChoiKehoachForm: FormGroup;
  listKhDieuchinh: any[] = [];
  status: any;
  sumRow: any;
  isDuyetTuChoi: boolean = false;
  tenFileQuyetDinh: any;
  urlFileDownload: any;
  optionLichsu: any[] = [];
  isChuaGui: boolean;
  listLichSu: any[];
  countLichSu: number = 0;
  isShowBtnLichSu = false;
  isDaChinhSua: boolean;
  daGiao: number;
  chapNhanDieuChinh: number;
  apiExcuteListKhDieuchinh: any;
  apiNoiKehoachDuthaoService: any;
  TWDaDieuChinh: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.forkJorkApi();
      this.getAllLichSuDieuChinh();
      this.isDaChinhSua = false;
      this.mapStatus();
    });
    this.duyetKehoachForm = this.fb.group({
      id: ['']
    });
    this.tuChoiKehoachForm = this.fb.group({
      id: [''],
      lyDoTuChoi: ['',Validators.required]
    });
    if (Object.keys(this.chiTietKH).length === 0) {

      this.forkJorkApi();
    }
    if (this.tinhTrang === '') {
      this.tinhTrang = this.getTinhTrang();
    }
    this.formModal = this.fb.group({
      noiDungLn: [''],
      selectSend: ['']
    });
  }
  forkJorkApi() {
    this.apiExcuteListKhDieuchinh = this.noiKehoachDuthaoService.getKhOld(this.id);
    this.apiNoiKehoachDuthaoService = this.noiKehoachDuthaoService.getById(this.id);
    forkJoin(this.apiNoiKehoachDuthaoService, this.apiExcuteListKhDieuchinh)
      .subscribe((res) => {
        this.excuteGetKehoach(res[0]);
        this.excuteListKhDieuchinh(res[1]);
      });
  }
  excuteListKhDieuchinh(res) {
    this.listKhDieuchinh = res;
    this.getLichSuGiaoNhan(res);
  }
  excuteGetKehoach(res) {
    this.chiTietKH = res;
    this.sumRow = res.chiTietKhTinh.tongSo;
    this.urlFileDownload = JSON.parse(res.fileQuyetDinhTaoKH);
    this.tenFileQuyetDinh = this.urlFileDownload[0].fileName;
    this.status = res.status;
    this.length = Object.keys(res).length;
    this.type = this.chiTietKH.status;
    this.tinhTrang = this.getTinhTrang();
    this.checkThongTinDieuChinh();
  }
  checkThongTinDieuChinh() {
    if ((this.chiTietKH.soQuyetDinhDieuChinh !== undefined && this.chiTietKH.soQuyetDinhDieuChinh !== null)
      || (this.chiTietKH.lyDoDieuChinh !== undefined && this.chiTietKH.lyDoDieuChinh !== null)
      || (this.chiTietKH.ngayXinDieuChinh !== undefined && this.chiTietKH.ngayXinDieuChinh !== null)
      // || (this.chiTietKH.soQuyetDinhDieuChinh !== undefined && this.chiTietKH.soQuyetDinhDieuChinh !== null)
      // || (this.chiTietKH.soQuyetDinhDieuChinh !== undefined && this.chiTietKH.soQuyetDinhDieuChinh !== null)
      // || (this.chiTietKH.soQuyetDinhDieuChinh !== undefined && this.chiTietKH.soQuyetDinhDieuChinh !== null)
      || (this.chiTietKH.fileQuyetDinhDieuChinh !== undefined && this.chiTietKH.fileQuyetDinhDieuChinh !== null)) {
      this.isDaChinhSua = true;
    } else {
      this.isDaChinhSua = false;
    }
  }
  getTinhTrang() {
    // tslint:disable-next-line:max-line-length
    if (this.status === STATUS.STATUS_KHDUTHAO_TINH_TW_TU_CHOI_KH || this.status === STATUS.STATUS_KHDUTHAO_TINH_TW_CHAP_NHAN_KH || this.status === STATUS.STATUS_KHDUTHAO_TINH_TW_GIAO_KE_HOACH || this.status === STATUS.STATUS_KHDUTHAO_TINH_TW_CHAP_NHAN_DIEU_CHINH || this.status === STATUS.STATUS_KHDUTHAO_TINH_KE_HOACH_DA_DUOC_DIEU_CHINH) {
      this.isDuyetTuChoi = false;
    } else {
      this.isDuyetTuChoi = true;
    }
    if (Object.keys(this.chiTietKH).length > 0) {
      // tslint:disable-next-line:triple-equals
      if (this.chiTietKH.status == STATUS.STATUS_KHDUTHAO_TINH_CHO_DUYET_TAO_KH) {
        // this.trangThai = 'Chưa gửi';
        this.tinhTrang = 'Chưa duyệt';
        // tslint:disable-next-line:triple-equals
      } else if (this.chiTietKH.status == STATUS.STATUS_KHDUTHAO_TINH_DA_DUOC_DUYET_TAO_KH) {
        // this.trangThai = 'Đã gửi';
        this.tinhTrang = 'Đã duyệt';
        // tslint:disable-next-line:triple-equals
      } else if (this.chiTietKH.status == STATUS.STATUS_KHDUTHAO_TINH_CHO_TW_DUYET) {
        // this.trangThai = 'Chưa gửi';
        this.tinhTrang = 'Chờ duyệt kế hoạch';
        // tslint:disable-next-line:triple-equals
      } else if (this.chiTietKH.status == STATUS.STATUS_KHDUTHAO_TINH_TW_TU_CHOI_KH) {
        // this.trangThai = 'Chưa gửi';
        this.tinhTrang = 'Từ chối kế hoạch';
        // tslint:disable-next-line:triple-equals
      } else if (this.chiTietKH.status == STATUS.STATUS_KHDUTHAO_TINH_TW_CHAP_NHAN_KH) {
        // this.trangThai = 'Chưa gửi';
        this.tinhTrang = 'Chấp nhận kế hoạch';
        // tslint:disable-next-line:triple-equals
      } else if (this.chiTietKH.status == STATUS.STATUS_KHDUTHAO_TINH_TW_GIAO_KE_HOACH) {
        // this.trangThai = 'Chưa gửi';
        this.tinhTrang = 'Trung ương giao kế hoạch';
        // tslint:disable-next-line:triple-equals
      } else if (this.chiTietKH.status == STATUS.STATUS_KHDUTHAO_TINH_XIN_DIEU_CHINH) {
        // this.trangThai = 'Chưa gửi';
        this.tinhTrang = 'Xin điều chỉnh kế hoạch';
        // tslint:disable-next-line:triple-equals
      } else if (this.chiTietKH.status == STATUS.STATUS_KHDUTHAO_TINH_TW_CHAP_NHAN_DIEU_CHINH) {
        // this.trangThai = 'Chưa gửi';
        this.tinhTrang = 'Duyệt điều chỉnh kế hoạch';
        // tslint:disable-next-line:triple-equals
      } else if (this.chiTietKH.status == STATUS.STATUS_KHDUTHAO_TINH_TW_TU_CHOI_DIEU_CHINH) {
        // this.trangThai = 'Chưa gửi';
        this.tinhTrang = 'Từ chối điều chỉnh kế hoạch';
      }
      return this.tinhTrang;
    } else {
      this.tinhTrang = '';
      return this.tinhTrang;
    }
  }
  mapStatus() {
    this.daGiao = STATUS.STATUS_KHDUTHAO_TINH_TW_GIAO_KE_HOACH;
    this.chapNhanDieuChinh = STATUS.STATUS_KHDUTHAO_TINH_TW_CHAP_NHAN_DIEU_CHINH;
    this.TWDaDieuChinh = STATUS.STATUS_KHDUTHAO_TINH_KE_HOACH_DA_DUOC_DIEU_CHINH;
  }

  onClose() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh']);
  }
  getQuy(id) {
    const q = this.quy.find(el => {
      return el.id = id;
    });
    return q;
  }
  duyetKH() {
    this.duyetModal.show();
    this.duyetKehoachForm.patchValue({
      id: this.id
    });
  }
  duyet() {
    const formValue = this.duyetKehoachForm.value;
    this.keHoachToanNganhService.twDuyetKeHoachTinhGui(formValue.id)
      .subscribe(res => {
        this.forkJorkApi();
        this.alertService.success(COMMON_SUCCESS_MESS.DUYET);
      }, err => {
      });
    this.duyetModal.hide();
  }

  tuChoiKH() {
    this.lyDoTuChoi = null;
    this.tuChoiModal.show();
    this.tuChoiKehoachForm.patchValue({
      id: this.id
    });
  }

  tuChoi() {
    if(this.tuChoiKehoachForm.invalid){
      this.alertService.error('Bạn cần nhập lý do từ chối!')
      return;
    }
    const formValue = this.tuChoiKehoachForm.value;
    this.tuChoiModal.hide();
    const formBody: any = {};
    formBody.id = formValue.id;
    formBody.lyDoTuChoiKh = formValue.lyDoTuChoi;
    this.keHoachToanNganhService.twTuChoiKeHoachTinhGui(formBody)
      .subscribe(res => {
        this.forkJorkApi();
        this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh']);
      }, err => {
      });
  }
  getLichSuGiaoNhan(data) {
    this.optionLichsu = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === STATUS.STATUS_KHDUTHAO_TINH_CHO_TW_DUYET
        || data[i].status === STATUS.STATUS_KHDUTHAO_TINH_TW_CHAP_NHAN_KH) {
        this.optionLichsu.push({
          coquan: this.chiTietKH.tenTinhHuyen,
          loinhan: this.chiTietKH.loiNhanCuaTinh,
          thoigian: data[i].ngayGuiTW
        });
      }
      if (data[i].status === STATUS.STATUS_KHDUTHAO_TINH_TW_TU_CHOI_KH) {
        this.optionLichsu.push({
          coquan: 'BHXH VN',
          loinhan: data[i].lyDoTuChoiKeHoach,
          thoigian: data[i].ngayTwTuChoiKh
        });
        this.optionLichsu.push({
          coquan: this.chiTietKH.tenTinhHuyen,
          loinhan: data[i].loiNhanCuaTinh,
          thoigian: data[i].ngayGuiTW
        });
      }
      if (data[i].status === STATUS.STATUS_KHDUTHAO_TINH_CHO_DUYET_XIN_DIEU_CHINH
        || data[i].status === STATUS.STATUS_KHDUTHAO_TINH_TW_CHAP_NHAN_DIEU_CHINH) {
        this.optionLichsu.push({
          coquan: this.chiTietKH.tenTinhHuyen,
          loinhan: data[i].loiNhanCuaTinh,
          thoigian: data[i].ngayGuiTW
        });
      }
      if (data[i].status === STATUS.STATUS_KHDUTHAO_TINH_TW_TU_CHOI_DIEU_CHINH) {
        this.optionLichsu.push({
          coquan: 'BHXH VN',
          loinhan: data[i].lyDoTuChoiKeHoach,
          thoigian: data[i].ngayTwTuChoiDieuChinh
        });
        this.optionLichsu.push({
          coquan: this.chiTietKH.tenTinhHuyen,
          loinhan: data[i].loiNhanCuaTinh,
          thoigian: data[i].ngayGuiTW
        });
      }
      if (data[i].status === STATUS.STATUS_KHDUTHAO_TINH_TW_GIAO_KE_HOACH) {
        this.optionLichsu.push({
          coquan: 'BHXH VN',
          loinhan: data[i].lyDoTuChoiKeHoach,
          thoigian: data[i].ngayDuocGiaoKeHoach
        });
      }
      if (data[i].status <= STATUS.STATUS_KHDUTHAO_TINH_DA_DUOC_DUYET_TAO_KH) {
        this.isChuaGui = true;
      }
    }
  }
  getAllLichSuDieuChinh() {
    this.keHoachToanNganhService.getLichSuDieuChinh(this.id)
      .subscribe(res => {
        this.listLichSu = res;
        if (res.length > 0) {
          this.countLichSu = res.length;
          this.isShowBtnLichSu = true;
        }
      }, err => {
      });
  }

}
