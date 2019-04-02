import { LOAI_HINH_TTKT, QUY, TRANG_THAI_KH } from '../../../../../../constants/ke-hoach-ttkt.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IMyDpOptions } from 'mydatepicker';
import { QUAN_LY_DOAN, COMMON_ERROR_MESS, MESS_TAO_KH_BHXH_VN, COMMON_SUCCESS_MESS } from '../../../../../../constants/message.constants';
import { uniqBy as LD_uniqBy, cloneDeep } from 'lodash';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { NoiDmTinhHuyenService } from '../../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { NoiKehoachDuthaoService } from '../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { NoiPhanloaiDoituongService } from '../../../../../../services/api/noi-phanloai-doituong/noi-phanloai-doituong.service';
import { PhanLoaiDtService } from '../../../../../../services/api/danh-muc/noi-dmPhanLoaiDt/phan-loai-dt.service';
import { PaginationService } from '../../../../../../services/helper/pagination.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { NoiAccountService } from '../../../../../../services/api/noi-account/noi-account.service';
import { KeHoachBhxhTinhService } from '../../../../../../services/api/ke-hoach-bhxh-tinh/ke-hoach-bhxh-tinh.service';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { FILE } from '../../../../../../constants/api-file.constants';
import { LOAIHINH_TTKT_NAME } from '../../../../../../constants/thanh-lap-doan.constants';
import { AuthService } from '../../../../../../auth/auth.service';
import { UtilsService } from '../../../../../../services/api/utils/utils.service';
import { FormService } from '../../../../../../shared/form-module/form.service';

@Component({
  selector: 'ttkt-edit-kh-bhxh-tinh',
  templateUrl: './edit-kh-bhxh-tinh.component.html',
  styleUrls: ['./edit-kh-bhxh-tinh.component.scss']
})
export class EditKHBHXHTinhComponent implements OnInit {
  @ViewChild('fileQDDieuChinhKH') fileInputRef1: ElementRef;
  @ViewChild('modalThemDonVi') modalThemDonVi: ModalDirective;
  @ViewChild('modalEditDonVi') modalEditDonVi: ModalDirective;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('modalHoan') modalHoan: ModalDirective;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  formDieuChinh: FormGroup;
  formTimKiemThemMoi: FormGroup;
  formEditDonVi: FormGroup;
  formSua: FormGroup;
  isCollapseDirective: boolean = false;
  account: any;
  keHoachId: any;
  tienDo: any;
  pager: any = {};
  type: any;
  isSua: boolean;
  isLuuSua: boolean;
  isDuyet: boolean;
  isDieuChinh: boolean;
  isLuuDieuChinh: boolean;
  disableFormSua: boolean;
  disableAllButtons: boolean;
  currentPage: number = 0;
  pageSize: number = 10;
  listQuy: any;
  listLoaiHinhTTKT: any;
  listLoaiHinh: any;
  listDonViThemMoi: any;
  listDonViSelected: any[] = [];
  loaiDoiTuongs: any[] = [];
  indexSelected: any;
  loaiHinhSelected: any;
  keHoachNam: any;
  chiTietKH: any;
  listDonViTTKT: any[] = [];
  listDiaBan: any[] = [];
  fileQDDieuChinhKH: any;
  tenFileQDDieuChinhKH: any;
  isXemLyDoHoan: boolean;
  selectedHoan: any;
  formHoanTTKT: FormGroup;
  date: Date = new Date();
  modelDate: any = { date: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() } };
  constructor(
    private fb: FormBuilder,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private timeBuilderService: TimeBuilderService,
    private phanLoaiDvi: PhanLoaiDtService,
    private pagination: PaginationService,
    private alertService: AlertService,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private noiDmTinhHuyenService: NoiDmTinhHuyenService,
    private noiPhanloaiDoituongService: NoiPhanloaiDoituongService,
    private noiAccountService: NoiAccountService,
    private keHoachBHXHTinh: KeHoachBhxhTinhService,
    private fileResource: FileResourceService,
    private auth: AuthService,
    private helper: UtilsService,
    private formService: FormService
  ) { }

  ngOnInit() {
    this.pager = this.pagination.getPager(0, 0, 0);
    this.account = this.auth.currentUser;
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.keHoachId = params['id'];
        this.type = params['type'];
        if (this.type === 'sua') {
          this.isLuuSua = true;
        } else {
          this.isDieuChinh = true;
          this.isLuuDieuChinh = true;
        }
      }
    });
    this.noiPhanloaiDoituongService.getAllDoituong({ page: 0, size: 20 })
      .subscribe(res => {
        this.loaiDoiTuongs = res['content'];
        this.listDonViTTKT = cloneDeep(res['content']);
        this.getKeHoach();
      }, err => { });

    this.formDieuChinh = this.builder.group({
      ngayDieuChinh: [this.date, [Validators.required]],
      soQDDieuChinh: ['', [Validators.required]],
      lyDoDieuChinh: ['', [Validators.required]],
      keHoachNam: ['', [Validators.required]],
      ngayTaoKH: ['', [Validators.required]],
      tenKeHoach: ['', [Validators.required]],
      soQDTaoKeHoach: ['', [Validators.required]],
      nguoiKi: ['', [Validators.required]],
      nguoiTao: [this.auth.currentUser.tenHienThi, [Validators.required]]
    });
    this.formTimKiemThemMoi = this.builder.group({
      diaBan: ['', Validators.required],
      loaiHinh: ['', Validators.required],
      tenDonVi: [''],
      quyTrongKeHoach: ['', Validators.required],
      loaiHinhTTKT: ['', Validators.required]
    });
    this.formEditDonVi = this.builder.group({
      loaiHinhTTKT: [''],
      quyTTKT: ['']
    });
    this.formSua = this.builder.group({
      keHoachNam: ['', [Validators.required]],
      ngayTaoKH: ['', [Validators.required]],
      tenKeHoach: ['', [Validators.required]],
      soQDTaoKeHoach: ['', [Validators.required]]
    });
    this.formHoanTTKT = this.fb.group({
      ngayHoanTTKT: ['', [Validators.required]],
      lyDoHoanTTKT: ['', [Validators.required]]
    });
    this.listQuy = QUY;
    this.listLoaiHinhTTKT = LOAIHINH_TTKT_NAME;
    this.getListDiaBan();
  }

  setStatusLabel(status) {
    for (const trangThai of TRANG_THAI_KH) {
      if (status === trangThai.code) {
        return trangThai.name;
      }
    }
    return this.setStatusLabel(2);
  }

  getKeHoach() {
    this.disableAllButtons = true;
    this.keHoachBHXHTinh.getKeHoachWithLiveData(this.keHoachId)
      .subscribe(res => {
        this.chiTietKH = res;
        this.keHoachNam = res.keHoachYear;
        this.tienDo = res.tienDo;
        for (let i = 0; i < this.listDonViTTKT.length; i++) {
          this.listDonViTTKT[i].children = [];
          for (let j = 0; j < res.tinhDuKiens.length; j++) {
            if (res.tinhDuKiens[j].dmPhanLoaiDtId === this.listDonViTTKT[i].id) {
              this.listDonViTTKT[i].children.push(res.tinhDuKiens[j]);
            }
          }
        }
        this.formDieuChinh.patchValue({
          keHoachNam: res.keHoachYear,
          ngayTaoKH: this.timeBuilderService.fromString(res.ngayQuyetDinhTaoKeHoach).toTimeDatePickerValue(),
          tenKeHoach: res.tenKeHoach,
          soQDTaoKeHoach: res.soQuyetDinhTaoKeHoach
        });
        this.formSua.patchValue({
          keHoachNam: res.keHoachYear,
          ngayTaoKH: this.timeBuilderService.fromString(res.ngayQuyetDinhTaoKeHoach).toTimeDatePickerValue(),
          tenKeHoach: res.tenKeHoach,
          soQDTaoKeHoach: res.soQuyetDinhTaoKeHoach
        });
        this.disableAllButtons = false;
      }, err => { });
  }
  themDonViTTKT() {
    this.pager = {};
    this.formTimKiemThemMoi.reset();
    this.formTimKiemThemMoi.patchValue({
      quyTrongKeHoach: this.helper.getQuyHienTai(),
      loaiHinhTTKT: 1
    }); 
    this.getListLoaiHinh();
    this.listDonViThemMoi = [];
    this.modalThemDonVi.show();
  }
  luuThemDonVi() {
    // this.formService.touchAllInput(this.formTimKiemThemMoi);
    // not touch
    if (this.formTimKiemThemMoi.invalid) {
      this.alertService.error("Vui lòng nhập đủ thông tin");
      return;
    }
    if (!this.listDonViTTKT || this.listDonViTTKT.length == 0) {
      this.listDonViTTKT  = Object.assign(this.listLoaiHinh);
    }
    this.listDonViSelected.map(value => {
      value.quyTrongKeHoach = this.formTimKiemThemMoi.value.quyTrongKeHoach;
      value.loaiHinhTTKT = this.formTimKiemThemMoi.value.loaiHinhTTKT;
    });
    
    this.listDonViTTKT.map(res=> {
      let listDcByLoai = this.listDonViSelected.filter(item => item.doiTuongTTKTDTO.dmPhanLoaiDtId == res.id);
      if (res.children && res.children.length > 0) {
        res.children.push(...listDcByLoai);
        res.children = LD_uniqBy(res.children, 'id');
      } else {
        res.children = listDcByLoai;
      }
    })

    this.listDonViSelected = [];
    this.modalThemDonVi.hide();
  }
  editDonVi(type, data, index) {
    this.indexSelected = index;
    this.loaiHinhSelected = Number(data.doiTuongTTKTDTO.dmPhanLoaiDtId);
    let listDonViTTKT = [];
    for (let i = 0; i < this.listDonViTTKT.length; i++) {
      if (this.listDonViTTKT[i].id === this.loaiHinhSelected) {
        listDonViTTKT = this.listDonViTTKT[i].children;
        break;
      }
    }
    if (type === 'hoan') {
      this.hoanTTKT(data);
    } else if (type === 'huyHoan') {
      this.huyHoanTTKT(data);
    } else {
      this.formEditDonVi.patchValue({
        loaiHinhTTKT: listDonViTTKT[index].loaiHinhTTKT,
        quyTTKT: listDonViTTKT[index].quyTrongKeHoach
      });
      this.modalEditDonVi.show();
    }
  }
  luuEditDonVi() {
    const value = this.formEditDonVi.value;
    let listDonViTTKT = [];
    for (let i = 0; i < this.listDonViTTKT.length; i++) {
      if (this.listDonViTTKT[i].id === this.loaiHinhSelected) {
        listDonViTTKT = this.listDonViTTKT[i].children;
        break;
      }
    }
    listDonViTTKT[this.indexSelected].loaiHinhTTKT = value.loaiHinhTTKT;
    listDonViTTKT[this.indexSelected].quyTrongKeHoach = value.quyTTKT;
    this.modalEditDonVi.hide();
  }
  luuDieuChinh() {
    this.disableAllButtons = true;
    if (this.formDieuChinh.valid && this.fileQDDieuChinhKH) {
      if (this.checkValidDonViTTKT(this.listDonViTTKT)) {
        const tmp = [];
        const formBody = this.chiTietKH;
        const dieuChinhValue = this.formDieuChinh.value;
        formBody.ngayDieuChinh = dieuChinhValue.ngayDieuChinh;
        formBody.soQuyetDinhDieuChinh = dieuChinhValue.soQDDieuChinh;
        formBody.fileQuyetDinhDieuChinh = this.fileResource.getFileString(this.fileQDDieuChinhKH);
        formBody.lyDoDieuChinh = dieuChinhValue.lyDoDieuChinh;
        formBody.nguoiKyQDTaoKeHoach = dieuChinhValue.nguoiKi;
        formBody.tenKeHoach = dieuChinhValue.tenKeHoach;
        formBody.soQuyetDinhTaoKeHoach = dieuChinhValue.soQDTaoKeHoach;
        formBody.ngayQuyetDinhTaoKeHoach = this.timeBuilderService.fromTimeDatePicker(dieuChinhValue.ngayTaoKH).toISOString();
        for (let i = 0; i < this.listDonViTTKT.length; i++) {
          const value = this.listDonViTTKT[i].children;
          for (let j = 0; j < value.length; j++) {
            tmp.push(
              {
                dmPhanLoaiDtId: value[j].doiTuongTTKTDTO.dmPhanLoaiDtId,
                doiTuongTTKTId: value[j].doiTuongTTKTDTO.id,
                loaiHinhTTKT: Number(value[j].loaiHinhTTKT),
                quyTrongKeHoach: Number(value[j].quyTrongKeHoach),
                isHoan: value[j].isHoan,
                ngayHoan: value[j].ngayHoan,
                lyDoHoan: value[j].lyDoHoan,
                status: value[j].status
              }
            );
          }
        }
        formBody.tinhDuKiens = tmp;
        this.keHoachBHXHTinh.tinhDieuChinhKeHoachDuThao(formBody)
          .subscribe(res => {
            this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-tinh']);
          }, err => { });
      } else {
        this.disableAllButtons = false;
        this.alertService.error(MESS_TAO_KH_BHXH_VN.ERROR_NHAP_QUY_KH_LOAI_TTKT);
      }
    } else {
      this.disableAllButtons = false;
      this.alertService.error(COMMON_ERROR_MESS.THIEU_FIELD_REQUIRED);
    }
  }
  luuSua() {
    this.disableAllButtons = true;
    if (this.formSua.valid) {
      if (this.checkValidDonViTTKT(this.listDonViTTKT)) {
        const tmp = [];
        const formBody = this.chiTietKH;
        const suaValue = this.formSua.value;
        formBody.tenKeHoach = suaValue.tenKeHoach;
        formBody.soQuyetDinhTaoKeHoach = suaValue.soQDTaoKeHoach;
        formBody.ngayQuyetDinhTaoKeHoach = this.timeBuilderService.convertDateUTC(suaValue.ngayTaoKH);
        for (let i = 0; i < this.listDonViTTKT.length; i++) {
          const value = this.listDonViTTKT[i].children;
          for (let j = 0; j < value.length; j++) {
            tmp.push(
              {
                dmPhanLoaiDtId: value[j].doiTuongTTKTDTO.dmPhanLoaiDtId,
                doiTuongTTKTId: value[j].doiTuongTTKTDTO.id,
                loaiHinhTTKT: Number(value[j].loaiHinhTTKT),
                quyTrongKeHoach: Number(value[j].quyTrongKeHoach)
              }
            );
          }
        }
        formBody.tinhDuKiens = tmp;
        this.noiKehoachDuthaoService.updateNewKhDuthao(formBody)
          .subscribe(res => {
            this.alertService.success(COMMON_SUCCESS_MESS.CAP_NHAT);
            this.setOffAllButtons();
            this.isDuyet = true;
            this.isSua = true;
            this.disableFormSua = true;
          }, err => {
            this.disableAllButtons = false;
          });
      } else {
        this.disableAllButtons = false;
        this.alertService.error(MESS_TAO_KH_BHXH_VN.ERROR_NHAP_QUY_KH_LOAI_TTKT);
      }
    } else {
      this.disableAllButtons = false;
      this.alertService.error(COMMON_ERROR_MESS.THIEU_FIELD_REQUIRED);
    }
  }
  onSua() {
    this.setOffAllButtons();
    this.isLuuSua = true;
  }
  confirmDuyet() {
    this.keHoachBHXHTinh.duyetKeHoachDuKienTinh(this.chiTietKH.id)
      .subscribe(res => {
        this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-tinh']);
      }, err => { });
  }
  upFileQDDieuChinhKH() {
    const fileEl = this.fileInputRef1.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResource.uploadFile(files, FILE.FILE_QUYET_DINH).subscribe(res => {
        this.fileQDDieuChinhKH = res;
        this.tenFileQDDieuChinhKH = res[0].fileName;
      }, err => {
        this.alertService.error(err.title);
      });
    }
  }
  getQuy(id) {
    const quy = this.listQuy.find(el => {
      return el.id === Number(id);
    });
    return quy;
  }
  getLoaiHinh(id) {
    return this.listLoaiHinhTTKT.find(el => el.id === Number(id));
  }
  getListLoaiHinh() {
    this.phanLoaiDvi.getListPhanLoaiDt(0, 100).subscribe(res => {
      this.listLoaiHinh = res.content;
    }, err => { });
  }
  chonDonVi(number, status) {
    status = !status;
    this.listDonViThemMoi[number].active = status;
    if (this.listDonViThemMoi[number].active) {
      if (this.listDonViSelected.length !== 0) {
        for (let i = 0; i < this.listDonViSelected.length; i++) {
          if (this.listDonViThemMoi[number].id === this.listDonViSelected[i].doiTuongTTKTDTO.id) {
            break;
          } else {
            this.listDonViSelected.push(
              {
                doiTuongTTKTDTO: this.listDonViThemMoi[number],
                loaiHinhTTKT: null,
                quyTrongKeHoach: null,
                trongKeHoach: true,
                status: 2
              },
            );
          }
        }
      } else {
        this.listDonViSelected.push(
          {
            doiTuongTTKTDTO: this.listDonViThemMoi[number],
            loaiHinhTTKT: null,
            quyTrongKeHoach: null,
            trongKeHoach: true,
            status: 2
          });
      }
    }
  }
  setPage(page) {
    this.currentPage = page;
    this.searchDvDoiTuong();
  }
  getListDiaBan() {
    this.noiDmTinhHuyenService.getDsHuyenByTinh(this.account.dmTinhHuyenId)
      .subscribe(res => this.listDiaBan = res);
  }
  checkValidDonViTTKT(data) {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].children.length !== 0) {
        for (let j = 0; j < data[i].children.length; j++) {
          const loaiHinhTTKT = data[i].children[j].loaiHinhTTKT;
          const quyTrongKeHoach = data[i].children[j].quyTrongKeHoach;
          if (loaiHinhTTKT === null || loaiHinhTTKT === undefined || quyTrongKeHoach === null || quyTrongKeHoach === undefined) {
            count++;
          }
        }
      }
    }
    return count === 0;
  }
  setOffAllButtons() {
    this.isSua = false;
    this.isLuuSua = false;
    this.isDieuChinh = false;
    this.isLuuDieuChinh = false;
    this.isDuyet = false;
    this.disableFormSua = false;
    this.disableAllButtons = false;
  }
  hoanTTKT(data) {
    this.isXemLyDoHoan = false;
    this.selectedHoan = data;
    this.formHoanTTKT.reset();
    this.modalHoan.show();
  }
  huyHoanTTKT(data) {
    data.status = 2;
    data.isHoan = false;
  }
  acceptHoanTTKT() {
    const formValue = this.formHoanTTKT.value;
    this.selectedHoan.isHoan = true;
    this.selectedHoan.lyDoHoan = formValue.lyDoHoanTTKT;
    this.selectedHoan.ngayHoan = this.timeBuilderService.convertDateUTC(formValue.ngayHoanTTKT);
    this.selectedHoan.status = 1;
    this.modalHoan.hide();
  }
  xemLyDoHoan(data) {
    this.isXemLyDoHoan = true;
    this.formHoanTTKT.patchValue({
      lyDoHoanTTKT: data.lyDoHoan,
      ngayHoanTTKT: this.timeBuilderService.fromString(data.ngayHoan).toTimeDatePickerValue()
    });
    this.modalHoan.show();
  }

  searchDvDoiTuong() {
    const body: any = {};
    body.phanLoaiDtId = this.formTimKiemThemMoi.value.loaiHinh;
    body.page = this.currentPage;
    body.size = this.pageSize;
    body.maCha = this.auth.currentUser.maTinhHuyen;
    body.dmTinhHuyenId = this.formTimKiemThemMoi.value.diaBan;
    body.tenDoiTuong = this.formTimKiemThemMoi.value.search_TenDonVi ? this.formTimKiemThemMoi.value.search_TenDonVi.trim() : '';
    body.maDonVi = this.formTimKiemThemMoi.value.search_MaDonVi ? this.formTimKiemThemMoi.value.search_MaDonVi.trim() : '';

    this.noiPhanloaiDoituongService.searchByTenDoiTuong(body).subscribe(res => {
      this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
      this.listDonViThemMoi = res.content;
      (this.listDonViThemMoi || []).map(el => {
        el.active = false;
      });
    });
  }

  loadDonViTTKT(e?: any) {
    const loaiHinhID = this.formTimKiemThemMoi.value.loaiHinh;
    const diaBanID = this.formTimKiemThemMoi.value.diaBan;
    if (diaBanID !== null && diaBanID !== undefined && diaBanID !== '' && loaiHinhID !== null && loaiHinhID !== undefined && loaiHinhID !== '') {
      this.currentPage = 0;
      this.searchDvDoiTuong();
    }
  }
}
