import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ttkt-cauhinh-cocau-tochuc',
  templateUrl: './cauhinh-cocau-tochuc.component.html',
  styleUrls: ['./cauhinh-cocau-tochuc.component.scss']
})

export class CauHinhCoCauToChucComponent implements OnInit {
 @ViewChild('modalPhongBan') public modalPhongBan: ModalDirective;

  formPhongBan: FormGroup;
  tenCoQuanBH: string;
  maCoQuanBH: string;
  danhSachPhongBan: any;
  titleModal: string;
  iconModalHeader: string;
  typeModal: string;
  nameButtonSave: string;
  iconButtonSave: string;
  colorButtonSave: string;
  indexSelected: number;
  display_COCAUPHONGBAN: Boolean = false;
  errMaPhongBan: Boolean = false;
  errTenPhongBan: Boolean = false;

  constructor(
    private builder: FormBuilder
  ) { }

  BHXH_VN = {
    'HA_NOI': [
      {
        'TEN': 'VP BHXH Tp.Hà Nội',
        'MA': '001',
        'PHONG_BAN': [
          { 'maphong': '01', 'tenphong': 'Tiếp công dân' },
          { 'maphong': '02', 'tenphong': 'Giải quyết đơn thư' },
          { 'maphong': '03', 'tenphong': 'Giải quyết khiếu nại, tố cáo' },
          { 'maphong': '04', 'tenphong': 'Cán bộ tổng hợp' },
          { 'maphong': '05', 'tenphong': 'Xử lý dữ liệu' }
        ]
      },
      {
        'TEN': 'BHXH Quận Hoàn Kiếm',
        'MA': '002',
        'PHONG_BAN': [
          { 'maphong': '02', 'tenphong': 'Giải quyết đơn thư' },
          { 'maphong': '03', 'tenphong': 'Giải quyết khiếu nại, tố cáo' },
          { 'maphong': '04', 'tenphong': 'Cán bộ tổng hợp' },
          { 'maphong': '05', 'tenphong': 'Xử lý dữ liệu' }
        ]
      },
      {
        'TEN': 'BHXH Quận Tây Hồ',
        'MA': '003',
        'PHONG_BAN': [
          { 'maphong': '01', 'tenphong': 'Tiếp công dân' },
          { 'maphong': '03', 'tenphong': 'Giải quyết khiếu nại, tố cáo' },
          { 'maphong': '04', 'tenphong': 'Cán bộ tổng hợp' },
          { 'maphong': '05', 'tenphong': 'Xử lý dữ liệu' }
        ]
      },
      {
        'TEN': 'BHXH Quận Thanh Xuân',
        'MA': '004',
        'PHONG_BAN': [
          { 'maphong': '01', 'tenphong': 'Tiếp công dân' },
          { 'maphong': '02', 'tenphong': 'Giải quyết đơn thư' },
          { 'maphong': '03', 'tenphong': 'Giải quyết khiếu nại, tố cáo' },
        ]
      }
    ],
    'HO_CHI_MINH': [
      {
        'TEN': 'VP BHXH Tp.Hồ Chí Minh',
        'MA': '004',
        'PHONG_BAN': [
          { 'maphong': '01', 'tenphong': 'Tiếp công dân' },
          { 'maphong': '02', 'tenphong': 'Giải quyết đơn thư' },
          { 'maphong': '03', 'tenphong': 'Giải quyết khiếu nại, tố cáo' },
          { 'maphong': '04', 'tenphong': 'Cán bộ tổng hợp' },
          { 'maphong': '05', 'tenphong': 'Xử lý dữ liệu' }
        ]
      },
      {
        'TEN': 'BHXH Quận 1',
        'MA': '004',
        'PHONG_BAN': [
          { 'maphong': '02', 'tenphong': 'Giải quyết đơn thư' },
          { 'maphong': '03', 'tenphong': 'Giải quyết khiếu nại, tố cáo' },
          { 'maphong': '04', 'tenphong': 'Cán bộ tổng hợp' },
          { 'maphong': '05', 'tenphong': 'Xử lý dữ liệu' }
        ]
      },
      {
        'TEN': 'BHXH Quận 2',
        'MA': '004',
        'PHONG_BAN': [
          { 'maphong': '01', 'tenphong': 'Tiếp công dân' },
          { 'maphong': '03', 'tenphong': 'Giải quyết khiếu nại, tố cáo' },
          { 'maphong': '04', 'tenphong': 'Cán bộ tổng hợp' },
          { 'maphong': '05', 'tenphong': 'Xử lý dữ liệu' }
        ]
      },
      {
        'TEN': 'BHXH Quận 3',
        'MA': '004',
        'PHONG_BAN': [
          { 'maphong': '01', 'tenphong': 'Tiếp công dân' },
          { 'maphong': '02', 'tenphong': 'Giải quyết đơn thư' },
          { 'maphong': '03', 'tenphong': 'Giải quyết khiếu nại, tố cáo' },
        ]
      }
    ]
  };

  ngOnInit() {
    this.formPhongBan = this.builder.group({
      maphong_InForm: [''],
      tenphong_InForm: ['']
    });
  }

  addPhongBan() {
    this.formPhongBan.reset();
    this.resetErrMessage();
    this.setAddForm();
    this.openModalPhongBan();
  }

  editPhongBan(index) {
    this.setEditForm();
    this.resetErrMessage();
    this.indexSelected = Number(index);
    this.formPhongBan.patchValue({
      maphong_InForm: this.danhSachPhongBan[index].maphong,
      tenphong_InForm: this.danhSachPhongBan[index].tenphong
    });
    this.openModalPhongBan();
  }

  deletePhongBan(index) {
    this.setDeleteForm();
    this.resetErrMessage();
    this.indexSelected = Number(index);
    this.formPhongBan.patchValue({
      maphong_InForm: this.danhSachPhongBan[index].maphong,
      tenphong_InForm: this.danhSachPhongBan[index].tenphong
    });
    this.openModalPhongBan();
  }

  savePhongBan() {
    if (this.typeModal === 'add') {
      if (this.checkErrFormPhongBan()) {
        const NEW_PHONGBAN = {
          maphong: this.formPhongBan.value.maphong_InForm,
          tenphong: this.formPhongBan.value.tenphong_InForm
        };
        this.danhSachPhongBan.push(NEW_PHONGBAN);
        this.closeModalPhongBan();
      }
    } else if (this.typeModal === 'edit') {
      if (this.checkErrFormPhongBan()) {
        this.danhSachPhongBan[this.indexSelected] = {
          maphong: this.formPhongBan.value.maphong_InForm,
          tenphong: this.formPhongBan.value.tenphong_InForm
        };
        this.closeModalPhongBan();
      }
    } else {
      this.danhSachPhongBan.splice(this.indexSelected, 1);
      this.closeModalPhongBan();
    }
  }

  chiTietCoQuan(index, BHXH_TINH) {
    this.display_COCAUPHONGBAN = true;
    if (BHXH_TINH === 'HA_NOI') {
      this.danhSachPhongBan = this.BHXH_VN.HA_NOI[index].PHONG_BAN;
      this.tenCoQuanBH = this.BHXH_VN.HA_NOI[index].TEN;
      this.maCoQuanBH = this.BHXH_VN.HA_NOI[index].MA;
    } else if (BHXH_TINH === 'HO_CHI_MINH') {
      this.danhSachPhongBan = this.BHXH_VN.HO_CHI_MINH[index].PHONG_BAN;
      this.tenCoQuanBH = this.BHXH_VN.HO_CHI_MINH[index].TEN;
      this.maCoQuanBH = this.BHXH_VN.HO_CHI_MINH[index].MA;
    }
  }

  setAddForm() {
    this.titleModal = 'Thêm phòng ban';
    this.typeModal = 'add';
    this.iconModalHeader = 'fa fa-plus-circle';
    this.nameButtonSave = 'Lưu';
    this.iconButtonSave = 'fa fa-floppy-o';
    this.colorButtonSave = 'btn btn-primary';
  }

  setEditForm() {
    this.titleModal = 'Sửa phòng ban';
    this.typeModal = 'edit';
    this.iconModalHeader = 'fa fa-pencil';
    this.nameButtonSave = 'Cập nhật';
    this.iconButtonSave = 'fa fa-floppy-o';
    this.colorButtonSave = 'btn btn-primary';
  }

  setDeleteForm() {
    this.titleModal = 'Xóa phòng ban';
    this.typeModal = 'delete';
    this.iconModalHeader = 'fa fa-exclamation-triangle';
    this.nameButtonSave = 'Đồng ý';
    this.iconButtonSave = 'fa fa-trash';
    this.colorButtonSave = 'btn btn-danger';
  }

  openModalPhongBan() {
    this.modalPhongBan.show();
  }

  closeModalPhongBan() {
    this.modalPhongBan.hide();
  }

  checkErrFormPhongBan() {
    if (this.formPhongBan.value.maphong_InForm === null) {
      this.errMaPhongBan = true;
      return false;
    }
    if (this.formPhongBan.value.tenphong_InForm === null) {
      this.errTenPhongBan = true;
      return false;
    }
    return true;
  }

  resetErrMessage() {
    this.errMaPhongBan = false;
    this.errTenPhongBan = false;
  }
}
