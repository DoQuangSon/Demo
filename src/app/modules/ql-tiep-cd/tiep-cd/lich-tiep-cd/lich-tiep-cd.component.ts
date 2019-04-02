import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../constants/index';
import { NoiAccountService } from '../../../../services/api/noi-account/noi-account.service';
import { StatesService } from '../../../../services/api/state.service';
import { NoiLichtiepcdService } from '../../../../services/api/noi-lichtiepcongdan/noi-lichtiepcd.service';
import { AlertService } from '../../../../services/api/alert.service';
import { QUY,THANG } from '../../../../constants/ke-hoach-ttkt.constants';
import { UtilsService } from '../../../../services/api/utils/utils.service';
import { Pagging } from '../../../../shared/models/pagging.model';
import { PaginationService } from '../../../../services/helper/pagination.service';
import { TimeBuilderService } from '../../../../services/helper/time-builder.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'ttkt-lich-tiep-cd',
  templateUrl: './lich-tiep-cd.component.html',
  styleUrls: ['./lich-tiep-cd.component.scss']
})

export class LichTiepCdComponent implements OnInit {
  @ViewChild('modalLichTiepCongDan') public modalLichTiepCongDan: ModalDirective;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  isCollapseDirective: boolean = false;
  lichTiepCongDanCBTT: FormGroup;
  lichTiepCongDanTTDV: FormGroup;
  lichTiepCongDanForm: FormGroup;
  lichCuaLanhDao: FormGroup;
  titleModal: string;
  nameButtonSaveModal: string;
  iconButtonSaveModal: string;
  colorButtonSaveModal: string;
  danhSachCanBo: any;
  loaiModal: string;
  indexSelected: number;

  displayModalLichCBTT: Boolean = false;
  displayModalLichTTDV: Boolean = false;
  displayDeleteForm: Boolean = false;
  errNguoiTiep: Boolean = false;
  errChucDanh: Boolean = false;
  errTuNgay: Boolean = false;
  errDenNgay: Boolean = false;
  errNgayTiep: Boolean = false;
  dmTinhHuyenId: any;
  listCanBo: any[] = [];
  danhSachQuy: any[] = QUY;
  danhSachThang: any[] = THANG;
  danhSachNam: any[] = [];
  locationType:string = 'Chọn tháng';

  // currentPage: number = 0;
  // pageSize: number = 10;
  // pager: any = {};
  // pager2: any = {};
  paggingCb: Pagging = new Pagging();
  paggingTt: Pagging = new Pagging();
  searchCB: boolean = false;
  searchTT: boolean = false;
  isSearching: boolean = false;
  canbo: any;
  dmbhxhId: string;
  errCompareDate: boolean = false;
  constructor(
    private builder: FormBuilder,
    private noiLichtiepcdService: NoiLichtiepcdService,
    private noiAccountService: NoiAccountService,
    private timeBuilder: TimeBuilderService,
    private pagination: PaginationService,
    private _alert: AlertService,
    private helper: UtilsService,
    private auth: AuthService
  ) { }

  danhSachCanBoThuongTruc: any[] = [];
  danhSachCanBoThuongTrucNew: any[] = [];
  account: any = {};
  danhSachThuTruongDonVi: any[] = [];
  danhSachThuTruongDonViNew: any[] = [];

  ngOnInit() {
    this.lichTiepCongDanCBTT = this.builder.group({
      tenCanBo: [''],
      chucDanh: [''],
      tuNgay: [''],
      denNgay: [''],
      id: ['']
    });

    this.lichTiepCongDanTTDV = this.builder.group({
      tenCanBo: [''],
      chucDanh: [''],
      ngayTiep: [''],
      id: ['']
    });
    let now = new Date();

    this.lichTiepCongDanForm = this.builder.group({
      dmbhxhId: this.account.donViId,
      searchTuNgay: [''],
      searchDenNgay: [''],
      searchHoVaTen: [''],
      nam: [now.getFullYear()],
      quy: [this.helper.getQuyHienTai()]
    });

    this.lichCuaLanhDao = this.builder.group({
      dmbhxhId: this.account.donViId,
      searchTuNgay: [''],
      searchDenNgay: [''],
      searchHoVaTen: [''],
      nam: [now.getFullYear()],
      thang: [now.getMonth() + 1]
    });

    this.dmbhxhId = this.auth.currentUser.donViId;
    this.noiAccountService.getAcount().subscribe(res => {
      this.dmTinhHuyenId = res.dmTinhHuyenId;
      this.getListCanBoChucDanh(this.dmbhxhId);
    }, err => { });

    this.account = this.auth.currentUser;
    this.getDachsachCanBo();
    this.getDanhsachThuTruong();
  }

  getParamsFromFormSearch() {
    const formValue = this.lichTiepCongDanForm.value;
    const formBody: any = {};
    let from: any, to: any;
    [from, to] = this.helper.getDateFromToByQuyNam(formValue.quy, formValue.nam);
    formBody.dmbhxhId = this.account.donViId;
    formBody.hoVaTen = formValue.searchHoVaTen.trim();
    formBody.fromDate = from;
    formBody.toDate = to;

    return formBody;
  }

  getParamsFromFormSearchLichCanBo() {
    const formValue = this.lichCuaLanhDao.value;
    const formBody: any = {};
    let from: any, to: any;
    [from, to] = this.helper.getDateFromToByThangNam(formValue.thang, formValue.nam);
    formBody.dmbhxhId = this.account.donViId;
    formBody.hoVaTen = formValue.searchHoVaTen.trim();
    formBody.fromDate = from;
    formBody.toDate = to;

    return formBody;
  }

  getDachsachCanBo() {
    // console.log(this.paggingCb);
    this.noiLichtiepcdService.getAllLichtiepCd({ 
      page: this.paggingCb.currentPage - 1, 
      size: this.paggingCb.itemsPerPage, 
      dmbhxhId: this.account.donViId, 
      isCanBo: true
    }, this.getParamsFromFormSearch())
      .subscribe(res => {
        // convert to old logicư
        let listData = res.list;
        res = res.pagging;
        this.danhSachCanBoThuongTrucNew = res.content.map(id => {
          let lich = listData.filter(req => req.canBoTiepDanId == id);

          return {
            id: lich[0] ? lich[0].id : '',
            canBoTiepDanId: id,
            tenCanBoTiepDan: lich[0] ? lich[0].tenCanBoTiepDan : '',
            chucVuCanBoTiepDan: lich[0] ? lich[0].chucVuCanBoTiepDan : '',
            lich: lich
          }
        });
        this.danhSachCanBoThuongTruc = listData;

        this.paggingCb.totalItems = res.totalElements;
        // this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
      }, err => { });
  }

  getDanhsachThuTruong() {
    this.noiLichtiepcdService.getAllLichtiepCd2({ 
      page: this.paggingTt.currentPage - 1, 
      size: this.paggingTt.itemsPerPage, 
      dmbhxhId: this.account.donViId, 
      isCanBo: false
    }, this.getParamsFromFormSearchLichCanBo()).subscribe(res => {
        // convert to old logic
        console.log(res);
        let listData = res.list;
        res = res.pagging;
        this.danhSachThuTruongDonViNew = res.content.map(id => {
          let lich = listData.filter(req => req.canBoTiepDanId == id);

          return {
            id: lich[0] ? lich[0].id : '',
            canBoTiepDanId: id,
            tenCanBoTiepDan: lich[0] ? lich[0].tenCanBoTiepDan : '',
            chucVuCanBoTiepDan: lich[0] ? lich[0].chucVuCanBoTiepDan : '',
            lich: lich
          }
        });
        this.danhSachThuTruongDonVi = listData;

        // this.danhSachThuTruongDonVi = res.content;
        this.paggingTt.totalItems = res.totalElements;
        // this.pager2 = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
        
      }, err => { });
  }

  public refreshCanBo(value: any) {
    this.canbo = value;
    this.listCanBo.forEach(element => {
      if (element.id === value.id) {
        this.lichTiepCongDanCBTT.patchValue({
          chucDanh: element.chucDanh
        });
        this.lichTiepCongDanTTDV.patchValue({
          chucDanh: element.chucDanh
        });
      }
    });
  }

  public removed(value: any) {
    this.canbo = {};
  }

  getListCanBoChucDanh(dmbhxhId) {
    // tslint:disable-next-line:no-shadowed-variable
    this.noiLichtiepcdService.getListCanBo(dmbhxhId).subscribe(res => {
      this.listCanBo = res.map(el => {
        const _el: any = {};
        _el.text = el.tenCanBo;
        _el.chucDanh = el.tenChucDanh;
        _el.id = el.id;
        return _el;
      });
      console.log(this.listCanBo);
    }, err => { });
  }

  addLichTrucCBTT() {
    this.lichTiepCongDanCBTT.reset();
    this.resetErrMessage();
    this.loaiModal = 'addCBTT';
    this.setModalToAddForm();
    this.lichTiepCongDanCBTT.controls.tuNgay.enable();
    this.lichTiepCongDanCBTT.controls.denNgay.enable();
    this.openModalLichTiepCongDan();
  }

  editLichTrucCBTT(id: any) {
    this.resetErrMessage();
    this.loaiModal = 'editCBTT';
    this.setModalToEditForm(id);

    const searchCanbo = this.danhSachCanBoThuongTruc.find((el) => {
      return el.id === id;
    });
    const tuNgay = this.timeBuilder.fromString(searchCanbo.fromDate).toTimeDatePickerValue();
    const denNgay = this.timeBuilder.fromString(searchCanbo.toDate).toTimeDatePickerValue();
    console.log(searchCanbo);
    this.lichTiepCongDanCBTT.patchValue({
      id: searchCanbo.id,
      tenCanBo: [{
        id: searchCanbo.canBoTiepDanId,
        text: searchCanbo.tenCanBoTiepDan
      }],
      chucDanh: searchCanbo.chucVuCanBoTiepDan,
      tuNgay: tuNgay,
      denNgay: denNgay
    });
    this.lichTiepCongDanCBTT.controls.tuNgay.enable();
    this.lichTiepCongDanCBTT.controls.denNgay.enable();
    this.openModalLichTiepCongDan();
  }

  deleteLichTrucCBTT(id) {
    this.resetErrMessage();
    this.loaiModal = 'deleteCBTT';
    this.setModalToDeleteForm(id);
    const searchCanbo = this.danhSachCanBoThuongTruc.find((el) => {
      return el.id === id;
    });
    const tuNgay = this.timeBuilder.fromString(searchCanbo.fromDate).toTimeDatePickerValue();
    const denNgay = this.timeBuilder.fromString(searchCanbo.toDate).toTimeDatePickerValue();
    this.lichTiepCongDanCBTT.patchValue({
      id: searchCanbo.id,
      tenCanBo: [{
        id: searchCanbo.canBoTiepDanId,
        text: searchCanbo.tenCanBoTiepDan
      }],
      chucDanh: searchCanbo.chucVuCanBoTiepDan,
      tuNgay: tuNgay,
      denNgay: denNgay
    });
    this.lichTiepCongDanCBTT.controls.tuNgay.disable();
    this.lichTiepCongDanCBTT.controls.denNgay.disable();
    this.openModalLichTiepCongDan();
  }

  addLichTrucTTDV() {
    this.lichTiepCongDanTTDV.reset();
    this.resetErrMessage();
    this.loaiModal = 'addTTDV';
    this.setModalToAddForm();
    this.lichTiepCongDanTTDV.controls.ngayTiep.enable();
    this.openModalLichTiepCongDan();
  }

  editLichTrucTTDV(id) {
    this.resetErrMessage();
    this.loaiModal = 'editTTDV';
    this.setModalToEditForm(id);
    const searchCanbo = this.danhSachThuTruongDonVi.find((el) => {
      return el.id === id;
    });
    const tuNgay = this.timeBuilder.fromString(searchCanbo.fromDate).toTimeDatePickerValue();

    this.lichTiepCongDanTTDV.patchValue({
      id: searchCanbo.id,
      tenCanBo: [{
        id: searchCanbo.canBoTiepDanId,
        text: searchCanbo.tenCanBoTiepDan
      }],
      chucDanh: searchCanbo.chucVuCanBoTiepDan,
      ngayTiep: tuNgay
    });
    this.lichTiepCongDanTTDV.controls.ngayTiep.enable();
    this.openModalLichTiepCongDan();
  }

  deleteLichTrucTTDV(id) {
    this.resetErrMessage();
    this.loaiModal = 'deleteTTDV';
    this.setModalToDeleteForm(id);
    const searchCanbo = this.danhSachThuTruongDonVi.find((el) => {
      return el.id === id;
    });
    const tuNgay = this.timeBuilder.fromString(searchCanbo.fromDate).toTimeDatePickerValue();
    // const ngay = new Date(searchCanbo.fromDate);
    // const ngayTiepTemp = ngay.getUTCDate() + '/' + (ngay.getUTCMonth() + 1) + '/' + ngay.getUTCFullYear();
    console.log(searchCanbo);
    this.lichTiepCongDanTTDV.patchValue({
      id: searchCanbo.id,
      tenCanBo: [{
        id: searchCanbo.canBoTiepDanId,
        text: searchCanbo.tenCanBoTiepDan
      }],
      chucDanh: searchCanbo.chucVuCanBoTiepDan,
      ngayTiep: tuNgay
    });
    this.lichTiepCongDanTTDV.controls.ngayTiep.disable();
    this.openModalLichTiepCongDan();
    //this.displayDeleteForm = true;
  }


  saveLichTiepCongDan() {
    if (this.loaiModal === 'addCBTT' || this.loaiModal === 'editCBTT') {
      if (this.checkErrLichTiepCBTT()) {
        const formBody: any = {};
        const formValue = this.lichTiepCongDanCBTT.value;
        let tungay: String = '';
        let denngay: String = '';
        if (formValue.tuNgay.formatted) {
          tungay = this.timeBuilder.fromTimeDatePicker(formValue.tuNgay).setUTC().toISOString();
        } else {
          tungay = this.timeBuilder.fromTimeDatePicker(formValue.tuNgay).setUTC().toISOString();
        }

        if (formValue.denNgay.formatted) {
          denngay = this.timeBuilder.fromTimeDatePicker(formValue.denNgay).setUTC().toISOString();
        } else {
          denngay = this.timeBuilder.fromTimeDatePicker(formValue.denNgay).setUTC().toISOString();
        }
        formBody.actived = true;
        formBody.fromDate = tungay;
        formBody.toDate = denngay;
        formBody.canBo = { 'id': formValue.tenCanBo[0].id };
        formBody.isLichCanBo = true;
        formBody.nguoiTaoLich = { 'id': this.account.id };
        formBody.dMBHXH = { 'id': this.auth.currentUser.donViId };
        if (!this.errCompareDate) {
          if (this.loaiModal === 'addCBTT') {
            this.noiLichtiepcdService.createNewLichtiepCd(formBody)
              .subscribe(res => {
                this.getDachsachCanBo();
                this._alert.success('Thêm mới thành công!');
              });
          } else {
            formBody.id = formValue.id;
            formBody.lastModifiedBy = { 'id': this.account.id };
            this.noiLichtiepcdService.updateNewLichtiepCd(formBody)
              .subscribe(res => {
                this.getDachsachCanBo();
                this._alert.success('Cập nhật thành công!');
              });
          }
          this.closeModalLichTiepCongDan();

          if (this.loaiModal === 'addCBTT') {
            this.addLichTrucCBTT();
          }
        }
      }
    } else if (this.loaiModal === 'deleteCBTT') {
      const formValue = this.lichTiepCongDanCBTT.value;
      this.noiLichtiepcdService.deleteNewLichtiepCd(formValue.id)
        .subscribe(res => {
          this.getDachsachCanBo();
          this._alert.success('Xóa thành công!');
        });
      this.closeModalLichTiepCongDan();
    } else if (this.loaiModal === 'addTTDV' || this.loaiModal === 'editTTDV') {
      if (this.checkErrLichTiepTTDV()) {
        const formBody: any = {};
        const formValue = this.lichTiepCongDanTTDV.value;
        let ngayTiep: String = '';
        if (formValue.ngayTiep.formatted) {
          ngayTiep = this.timeBuilder.fromTimeDatePicker(formValue.ngayTiep).setUTC().toISOString();
        } else {
          ngayTiep = this.timeBuilder.fromTimeDatePicker(formValue.ngayTiep).setUTC().toISOString();
        }
        formBody.actived = true;
        formBody.dMBHXH = { 'id': this.auth.currentUser.donViId };
        formBody.nguoiTaoLich = { 'id': this.account.id };
        formBody.fromDate = ngayTiep;
        formBody.toDate = ngayTiep;
        formBody.isLichCanBo = false;
        formBody.canBo = { 'id': formValue.tenCanBo[0].id };
        if (this.loaiModal === 'addTTDV') {
          this.noiLichtiepcdService.createNewLichtiepCd(formBody)
            .subscribe(res => {
              this.getDanhsachThuTruong();
              this._alert.success('Thêm mới thành công!');
            });
        } else {
          formBody.id = formValue.id;
          formBody.lastModifiedBy = { 'id': this.account.id };
          this.noiLichtiepcdService.updateNewLichtiepCd(formBody)
            .subscribe(res => {
              this.getDanhsachThuTruong();
              this._alert.success('Cập nhật thành công!');
            });
        }
        this.closeModalLichTiepCongDan();
        if (this.loaiModal === 'addTTDV') {
          this.addLichTrucTTDV();
        }
      }
    } else if (this.loaiModal === 'deleteTTDV') {
      const formValue = this.lichTiepCongDanTTDV.value;
      this.noiLichtiepcdService.deleteNewLichtiepCd(formValue.id)
        .subscribe(res => {
          this.getDanhsachThuTruong();
          this._alert.success('Xóa thành công!');
        });
      this.closeModalLichTiepCongDan();
    }
  }

  search(e?: any) {
    this.getDachsachCanBo();
   // this.getDanhsachThuTruong();
  }

  searchLichLanhDao(e?: any) {
    //this.getDachsachCanBo();
    this.getDanhsachThuTruong();
  }

  pageChangedCb(event) {
    this.paggingCb.currentPage = event.page;
    this.getDachsachCanBo();
  }

  pageChangedTt(event) {
    this.paggingTt.currentPage = event.page;
    this.getDanhsachThuTruong();
  }

  openModalLichTiepCongDan() {
    this.modalLichTiepCongDan.show();
  }

  closeModalLichTiepCongDan() {
    this.modalLichTiepCongDan.hide();
  }

  setModalToAddForm() {
    this.titleModal = 'Thêm lịch tiếp';
    this.nameButtonSaveModal = 'Lưu';
    this.iconButtonSaveModal = 'fa fa-floppy-o';
    this.colorButtonSaveModal = 'btn btn-primary';
    if (this.loaiModal === 'addCBTT') {
      this.danhSachCanBo = this.danhSachCanBoThuongTruc;
      this.displayModalLichCBTT = true;
    } else {
      this.danhSachCanBo = this.danhSachThuTruongDonVi;
      this.displayModalLichTTDV = true;
    }
  }
  setModalToEditForm(index) {
    this.titleModal = 'Sửa lịch tiếp';
    this.nameButtonSaveModal = 'Cập nhật';
    this.iconButtonSaveModal = 'fa fa-floppy-o';
    this.colorButtonSaveModal = 'btn btn-primary';
    this.indexSelected = Number(index);
    if (this.loaiModal === 'editCBTT' || this.loaiModal === 'deleteCBTT') {
      this.danhSachCanBo = this.danhSachCanBoThuongTruc;
      this.displayModalLichCBTT = true;
    } else {
      this.danhSachCanBo = this.danhSachThuTruongDonVi;
      this.displayModalLichTTDV = true;
    }
  }
  setModalToDeleteForm(index) {
    this.titleModal = 'Xóa lịch tiếp';
    this.nameButtonSaveModal = 'Đồng ý';
    this.iconButtonSaveModal = 'fa fa-trash';
    this.colorButtonSaveModal = 'btn btn-danger';
    this.indexSelected = Number(index);
    if (this.loaiModal === 'editCBTT' || this.loaiModal === 'deleteCBTT') {
      this.danhSachCanBo = this.danhSachCanBoThuongTruc;
      this.displayModalLichCBTT = true;
    } else {
      this.danhSachCanBo = this.danhSachThuTruongDonVi;
      this.displayModalLichTTDV = true;
    }
  }

  checkErrLichTiepCBTT() {
    if (this.lichTiepCongDanCBTT.value.tenCanBo === null) {
      this.errNguoiTiep = true;
      return false;
    }
    if (this.lichTiepCongDanCBTT.value.chucDanh === null) {
      this.errChucDanh = true;
      return false;
    }
    if (this.lichTiepCongDanCBTT.value.tuNgay === null) {
      this.errTuNgay = true;
      return false;
    }
    if (this.lichTiepCongDanCBTT.value.denNgay === null) {
      this.errDenNgay = true;
      return false;
    }
    return true;
  }

  checkErrLichTiepTTDV() {
    if (this.lichTiepCongDanTTDV.value.tenCanBo === null) {
      this.errNguoiTiep = true;
      return false;
    }
    if (this.lichTiepCongDanTTDV.value.chucDanh === null) {
      this.errChucDanh = true;
      return false;
    }
    if (this.lichTiepCongDanTTDV.value.ngayTiep === null) {
      this.errNgayTiep = true;
      return false;
    }

    return true;
  }
  resetErrMessage() {
    this.errNguoiTiep = false;
    this.errChucDanh = false;
    this.errTuNgay = false;
    this.errDenNgay = false;
    this.errNgayTiep = false;
    this.displayDeleteForm = false;
    this.displayModalLichCBTT = false;
    this.displayModalLichTTDV = false;
  }

  onDateChanged(event, isFromDate) {
    console.log('compare date', event);
    let fromDate = null;
    let toDate = null;
    if (isFromDate) {
      fromDate = this.timeBuilder.fromTimeDatePicker(event).setUTC().toISOString();
      toDate = this.timeBuilder.fromTimeDatePicker(this.lichTiepCongDanCBTT.controls.denNgay.value).setUTC().toISOString();
    } else {
      fromDate = this.timeBuilder.fromTimeDatePicker(this.lichTiepCongDanCBTT.controls.tuNgay.value).setUTC().toISOString();
      toDate = this.timeBuilder.fromTimeDatePicker(event).setUTC().toISOString();
    }
    if (fromDate > toDate && toDate !== 0) {
      this.errCompareDate = true;
    } else {
      this.errCompareDate = false;
    }

  }
}
