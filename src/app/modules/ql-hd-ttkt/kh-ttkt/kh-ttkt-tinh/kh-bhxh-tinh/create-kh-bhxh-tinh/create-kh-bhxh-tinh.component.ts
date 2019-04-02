import { ModalDirective, DateFormatter } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { uniqBy as LD_uniqBy } from 'lodash';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { NoiKehoachDuthaoService } from '../../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { NoiDmTinhHuyenService } from '../../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { TimeBuilderService } from '../../../../../../services/helper/time-builder.service';
import { NoiAccountService } from '../../../../../../services/api/noi-account/noi-account.service';
import { LOAIHINHTTKT, TYPE_KE_HOACH, QUY } from '../../../../../../constants/ke-hoach-ttkt.constants';
import { STATUS } from '../../../../../../constants/status.constants';
import { NoiPhanloaiDoituongService } from '../../../../../../services/api/noi-phanloai-doituong/noi-phanloai-doituong.service';
import { PhanLoaiDtService } from '../../../../../../services/api/danh-muc/noi-dmPhanLoaiDt/phan-loai-dt.service';
import { PaginationService } from '../../../../../../services/helper/pagination.service';
import { KeHoachBhxhTinhService } from '../../../../../../services/api/ke-hoach-bhxh-tinh/ke-hoach-bhxh-tinh.service';
import { COMMON_SUCCESS_MESS, MESS_TAO_KH_BHXH_VN, MESS_TAO_KH_TW, COMMON_ERROR_MESS } from '../../../../../../constants/message.constants';
import { FileResourceService } from '../../../../../../services/helper/file-resource.service';
import { FILE } from '../../../../../../constants/api-file.constants';
import { AuthService } from '../../../../../../auth/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { TtktModalService } from '../../../../../../shared/modal/ttkt-modal.service';
import { DialogLoaiHinhQuyComponent } from '../dialog-loai-hinh-quy/dialog-loai-hinh-quy.component';
import { Pagging } from '../../../../../../shared/models/pagging.model';
import { UtilsService } from '../../../../../../services/api/utils/utils.service';

@Component({
  selector: 'ttkt-create-kh-bhxh-tinh',
  templateUrl: './create-kh-bhxh-tinh.component.html',
  styleUrls: ['./create-kh-bhxh-tinh.component.scss']
})
export class CreateKHBHXHTinhComponent implements OnInit {
  @ViewChild('dsachModal') public dsachModal: ModalDirective;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('modalThemDonVi') modalThemDonVi: ModalDirective;
  @ViewChild('modalDonVi') modalDonVi: ModalDirective;
  @ViewChild('fileQuyetDinhTaoKH') fileInputRef1: ElementRef;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  taoKeHoachBHXHTinhForm: FormGroup;
  formModal: FormGroup;
  themKeHoachForm: FormGroup;
  formThemDonVi: FormGroup;
  // titleModalDV: string;
  typeModalDV: string;
  isDuyet: boolean;
  isSua: boolean;
  isLuuTao: boolean;
  isLuuSua: boolean;
  disableForm: boolean;
  readOnly = false;
  chiTietKeHoach: any;
  account: any;
  optionQuys: any[] = QUY;
  loaiDoiTuongs: any[] = [];
  listDviDoiTuong: any = [];
  listLoaiHinhDonVi: any = [];
  tableContent: any = [];
  listDcChon: any[] = [];
  currentPage = 0;
  pageSize = 10;
  pager: any = {};
  index: number;
  resData: any = {};
  iconButtonSave: string;
  colorButtonSave: string;
  // errLoaiHinhTTKT = false;
  disableAllButtons: boolean;
  // errQuyTTKT = false;
  // listKehoach: any[] = [];
  listDiaBan: any[] = [];
  // fileQd: any;
  tenFile: any = null;
  fileQuyetDinhTaoKH: any = [];
  pagingDt: Pagging = new Pagging(10);
  currentPageControl = new FormControl(1);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private noiDmTinhHuyenService: NoiDmTinhHuyenService,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private alertService: AlertService,
    private timeBuilderService: TimeBuilderService,
    private noiAccountService: NoiAccountService,
    private noiPhanloaiDoituongService: NoiPhanloaiDoituongService,
    private phanLoaiDvi: PhanLoaiDtService,
    private pagination: PaginationService,
    private keHoachBHXHTinh: KeHoachBhxhTinhService,
    private fileResource: FileResourceService,
    private auth: AuthService,
    private modalService: BsModalService,
    private ttktModaService: TtktModalService,
    private helper: UtilsService
  ) { }

  optionLoaiHinhTTKTs: any[] = LOAIHINHTTKT;
  optionNam: any[] = [];
  date: Date = new Date();
  modelDate: any = { date: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() } };

  ngOnInit() {
    this.pager = this.pagination.getPager(0, 0, 0);
    const year = (new Date()).getFullYear();
    for (let i = year; i < year + 20; i++) {
      this.optionNam.push(i);
    }
    this.themKeHoachForm = this.fb.group({
      id: [''],
      loaiDoiTuong: ['', Validators.required],
      tenDonVi: ['', Validators.required],
      maDonVi: ['', Validators.required],
      maThu: ['', Validators.required],
      quyMo: ['', Validators.required],
      diaChi: ['', Validators.required],
      quy: ['', Validators.required],
      tuNgay: ['', Validators.required],
      denNgay: ['', Validators.required],
      dotXuat: [''],
      loaiHinhTTKT: ['', Validators.required]
    });
    this.account = this.auth.currentUser;
    this.creatFormThemDonVi();

    this.noiPhanloaiDoituongService.getAllDoituong({ page: 0, size: 20 })
      .subscribe(res => {
        this.loaiDoiTuongs = res['content'];
      }, err => { });
    this.formModal = this.fb.group({
      noiDungLn: [''],
      inputSend: ['BHXH VN']
    });
    this.taoKeHoachBHXHTinhForm = this.fb.group({
      khNam: [year, Validators.required],
      soKH: ['', Validators.required],
      ngayLap: [this.date, Validators.required],
      tenKh: ['', Validators.required],
      nguoiKi: ['', Validators.required],
      nguoiTao: [this.auth.currentUser.tenHienThi, Validators.required],
      fileQuyetDinhTaoKH: ['']
    });
    this.isLuuTao = true;
    this.getListDiaBan();
  }

  creatFormThemDonVi() {
    this.formThemDonVi = this.fb.group({
      diaBan: ['', Validators.required],
      search_MaDonVi: [''],
      loaiHinh: ['', Validators.required],
      loaiHinhTTKT: ['', Validators.required],
      quyTrongKeHoach: ['', Validators.required],
      search_TenDonVi: [''],
    });
  }

  xuLiSauKhiSave(res) {
    this.resData = res;
    this.setOffAllButtons();
    this.disableForm = true;
    this.isSua = true;
    this.isDuyet = true;
  }

  onSua() {
    this.disableAllButtons = true;
    this.noiKehoachDuthaoService.getById(this.resData.id)
      .subscribe(res => {
        this.chiTietKeHoach = res;
        this.setOffAllButtons();
        this.isLuuSua = true;
      }, err => { });
  }

  onDuyet() {
    this.duyetModal.show();
  }

  onSubmitDuyet() {
    this.keHoachBHXHTinh.duyetKeHoachDuKienTinh(this.resData.id)
      .subscribe(res => {
        this.duyetModal.hide();
        this.alertService.success(COMMON_SUCCESS_MESS.DUYET);
        this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-tinh']);
      }, err => { });
  }

  onClose() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-tinh']);
  }
  getQuy(id) {
    const quy = this.optionQuys.find(el => {
      return el.id === Number(id);
    });
    return quy;
  }
  getLoaiHinh(id) {
    const loaiHinh = this.optionLoaiHinhTTKTs.find(el => {
      return el.id === Number(id);
    });
    return loaiHinh;
  }

  // currentIndex: number;
  // getCurrentNoiDungIndex(currentItem, listAll) {
  //   this.currentIndex = listAll.findIndex(item => {
  //     return item.id === currentItem.id;
  //   });
  // }
  // getListDonViConLai(listAll, listHienTai) {
  //   listHienTai.forEach(el => {
  //     const index = listAll.findIndex(it => {
  //       return it.id === el.id;
  //     });
  //     listAll.splice(index, 1);
  //   });
  //   return listAll;
  // }

  // indexTable: number;
  // isCurrentNoiDung= false;
  getDsDoiTuong(e?: any) {
    const loaiHinhID = this.formThemDonVi.value.loaiHinh;
    const diaBanID = this.formThemDonVi.value.diaBan;
    // const dmTinhHuyenId = this.auth.currentUser.dmTinhHuyenId;
    // let currentNoiDung: any;

    if (diaBanID !== null && diaBanID !== undefined && diaBanID !== '' && loaiHinhID !== null && loaiHinhID !== undefined && loaiHinhID !== '') {
        this.currentPageControl.setValue(1);
        this.searchDvDoiTuong();
    }
    // for (const item of this.tableContent) {
    //   if (Number(item.id) === Number(loaiHinhID)) {
    //     currentNoiDung = item;
    //   }
    // }
    // if (e) {
      // debugger;
      // this.listDcChon = [];
      // this.listDviDoiTuong = [];
      // this.currentPage = 0;
    // }
    // this.listLoaiHinhDonVi.forEach((el, i) => {
    //   if (el.id === Number(loaiHinhID)) {
    //     this.indexTable = i;
    //   }
    // });
    // this.phanLoaiDvi.getDtByPhanLoaiDt(loaiHinhId, dmTinhHuyenId, this.currentPage, this.pageSize)
    //   .subscribe(res => {
    //     this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
    //     this.listDviDoiTuong = res.content;
    //     (this.listDviDoiTuong || []).map(el => {
    //       el.active = false;
    //     });
    //     if (currentNoiDung !== 'undefined' && currentNoiDung) {
    //       this.isCurrentNoiDung = true;
    //       this.getCurrentNoiDungIndex(currentNoiDung, this.tableContent);
    //       this.listDviDoiTuong = this.getListDonViConLai(this.listDviDoiTuong, currentNoiDung.children);
    //     } else {
    //       this.isCurrentNoiDung = false;
    //     }
      // }, err => {
      //   this.alertService.error(QUAN_LY_DOAN.ERROR_GET_DT_TTKT);
      // });
  }

  searchDvDoiTuong() {
    const body: any = {};
    body.phanLoaiDtId = this.formThemDonVi.value.loaiHinh;
    body.page = this.pagingDt.currentPage - 1;
    body.size = this.pagingDt.itemsPerPage;
    body.maCha = this.auth.currentUser.maTinhHuyen;
    body.dmTinhHuyenId = this.formThemDonVi.value.diaBan;
    body.tenDoiTuong = this.formThemDonVi.value.search_TenDonVi ? this.formThemDonVi.value.search_TenDonVi.trim() : '';
    body.maDonVi = this.formThemDonVi.value.search_MaDonVi ? this.formThemDonVi.value.search_MaDonVi.trim() : '';

    this.noiPhanloaiDoituongService.searchByTenDoiTuong(body).subscribe(res => {
      this.pagingDt.totalItems = res.totalElements;
      this.listDviDoiTuong = res.content;
      (this.listDviDoiTuong || []).map(el => { el.active = false; });
    });
  }
  chonNoiDung(number, status) {
    this.listDviDoiTuong[number].active = !status;
    if (this.listDviDoiTuong[number].active) {
      this.listDcChon.push(this.listDviDoiTuong[number]);
    }
    this.listDcChon = LD_uniqBy(this.listDcChon, 'id');
  }
  addDonVi() {
    this.pagingDt.totalItems = 0;
    this.formThemDonVi.reset();
    this.formThemDonVi.patchValue({
      quyTrongKeHoach: this.helper.getQuyHienTai(),
      loaiHinhTTKT: 1
    });
    this.listDviDoiTuong = [];
    this.typeModalDV = 'add';
    this.modalThemDonVi.show();
    this.phanLoaiDvi.getListPhanLoaiDt(0, 100).subscribe(res => this.listLoaiHinhDonVi = res.content);
  }

  pageChanged(event: any) {
    this.pagingDt.currentPage = event.page;
    this.searchDvDoiTuong();
  }

    saveListDvi() {
    // this.listLoaiHinhDonVi[this.indexTable].children = this.listDcChon;
    // mapping loai hinh
    if (!this.tableContent || this.tableContent.length == 0) {
      this.tableContent  = Object.assign(this.listLoaiHinhDonVi);
    }
    this.listDcChon.map(value => {
      value.quyTrongKeHoach = this.formThemDonVi.value.quyTrongKeHoach;
      value.loaiHinhTTKT = this.formThemDonVi.value.loaiHinhTTKT;
    });

    this.tableContent.map(res => {
      let listDcByLoai = this.listDcChon.filter(item => item.dmPhanLoaiDtId == res.id);
      if (res.children && res.children.length > 0) {
        res.children.push(...listDcByLoai);
        res.children = LD_uniqBy(res.children, 'id');
      } else {
        res.children = listDcByLoai;
      }
    });

    this.listDcChon = [];
    this.modalThemDonVi.hide();
  }

  // show modal sua, xoa don vi
  editDonVi(index, index2) {
    const data = this.tableContent[index].children[index2];
    this.modalService.show(DialogLoaiHinhQuyComponent, {
      class: 'modal-lg',
      initialState: {
        data: data// parse ref value to dialog
      }
    });
  }

  deleteDonVi(index: any, index2: any) {
    this.ttktModaService.openConfirm('Xóa đơn vị', 'Bạn có chắc chắn muốn xóa đơn vị này?')
    .subscribe(res => {
      if (res) {
        this.tableContent[index].children.splice(index2, 1);
        if (this.tableContent[index].children.length === 0) {
          this.tableContent.splice(index, 1);
        }
      }
    });
  }

  checkValidListDonVi(data) {
    let count = 0;
    for (const i of data) {
      if ((i.loaiHinhTTKT || i.quyTrongKeHoach) === (null || undefined)) {
        count++;
      }
    }
    return count === 0;
  }

  creatFormBody() {
    const formValue = this.taoKeHoachBHXHTinhForm.value;
    const formBody: any = {};
    formBody.actived = true;
    formBody.soQuyetDinhTaoKeHoach = formValue.soKH;
    formBody.keHoachYear = formValue.khNam;
    formBody.currentDieuChinh = 0;
    formBody.isOwnerTW = false;
    formBody.status = STATUS.STATUS_TINH_DU_KIEN_CHO_DUYET;
    formBody.tenKeHoach = formValue.tenKh;
    formBody.ngayQuyetDinhTaoKeHoach = formValue.ngayLap || '';
    formBody.dmTinhHuyenId = this.account.dmTinhHuyenId;
    formBody.isDaDuocDieuChinh = false;
    formBody.type = TYPE_KE_HOACH.KE_HOACH_TINH_DU_KIEN;
    formBody.tinhDuKiens = this.getTinhDuKien();
    formBody.nguoiKyQDTaoKeHoach = formValue.nguoiKi;
    formBody.tenNguoiTao = formValue.nguoiTao;
    formBody.fileQuyetDinhTaoKH = this.fileResource.getFileString(this.fileQuyetDinhTaoKH);
    return formBody;
  }

  getTinhDuKien() {
    const tinhDuKiens: any[] = [];
    this.tableContent.forEach(el => {
        el.children.forEach(element => {
        const dukien: any = {};
        dukien.dmPhanLoaiDtId = element.dmPhanLoaiDtId;
        dukien.loaiHinhTTKT = element.loaiHinhTTKT;
        dukien.quyTrongKeHoach = element.quyTrongKeHoach;
        dukien.doiTuongTTKTId = element.id;
        dukien.tenDanhMucPhanLoaiDt = element.tenDoiTuong;
        tinhDuKiens.push(dukien);
      });
    });
    return tinhDuKiens;
  }

  onLuuTaoSua(type) {
    const formBody = this.creatFormBody();
    const listDonVi = formBody.tinhDuKiens;
    if (listDonVi.length === 0) {
      this.alertService.error(MESS_TAO_KH_BHXH_VN.ERROR_THEM_DV_TK);
    } else {
      if (this.checkValidListDonVi(listDonVi)) {
        if (type === 'tao') {
          if (!this.taoKeHoachBHXHTinhForm.invalid && (this.fileQuyetDinhTaoKH.length !== 0)) {
            this.keHoachBHXHTinh.tinhTaoKeHoachDuKien(formBody)
            .subscribe(res => {
              this.alertService.success(MESS_TAO_KH_TW.SUCCESS_TAO_KE_HOACH);
              this.xuLiSauKhiSave(res);
            });
          } else {
            this.alertService.error(MESS_TAO_KH_BHXH_VN.ERROR_CHUA_DU_THONG_TIN);
          }
        } else if (type === 'sua') {
          const formValue = this.taoKeHoachBHXHTinhForm.value;
          this.chiTietKeHoach.tenKeHoach = formValue.tenKh;
          this.chiTietKeHoach.ngayQuyetDinhTaoKeHoach = formValue.ngayLap;
          this.chiTietKeHoach.soQuyetDinhTaoKeHoach = formValue.soKH;
          this.chiTietKeHoach.tinhDuKiens = this.getTinhDuKien();
          this.noiKehoachDuthaoService.updateNewKhDuthao(this.chiTietKeHoach)
            .subscribe(res => {
              this.alertService.success(COMMON_SUCCESS_MESS.CAP_NHAT);
              this.xuLiSauKhiSave(res);
            }, err => {
              this.alertService.error(COMMON_ERROR_MESS.CAP_NHAT_LOI);
            });
        } else {
          this.alertService.error(MESS_TAO_KH_BHXH_VN.ERROR_NHAP_QUY_KH_LOAI_TTKT);
        }
      } else {
        this.alertService.error(MESS_TAO_KH_BHXH_VN.ERROR_NHAP_QUY_KH_LOAI_TTKT);
      }
    }
  }

  getListDiaBan() {
    this.noiDmTinhHuyenService.getDsHuyenByTinh(this.account.dmTinhHuyenId).subscribe(res =>  this.listDiaBan = res);
  }
  setOffAllButtons() {
    this.isSua = false;
    this.isDuyet = false;
    this.isLuuTao = false;
    this.isLuuSua = false;
    this.disableForm = false;
    this.disableAllButtons = false;
  }

  upFileQuyetDinh() {
    const fileEl = this.fileInputRef1.nativeElement;
    if (fileEl.files.length > 0) {
      const files = fileEl.files;
      this.fileResource.uploadFile(files, FILE.FILE_QUYET_DINH).subscribe(res => {
        this.fileQuyetDinhTaoKH = res;
        if (this.fileQuyetDinhTaoKH.length !== 0) {
          this.tenFile = this.fileQuyetDinhTaoKH[0].fileName;
        }
      }, err => {
        this.alertService.error(err.title);
      });
    } else { }
  }
 }
