import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';


import { CauHinhThamSoHtService } from '../../../../services/api/cau-hinh/cau-hinh-tham-so-ht/cau-hinh-tham-so-ht.service';
import { TimeBuilderService } from '../../../../services/helper/time-builder.service';
import { Pagging } from '../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-cauhinh-thamso-hethong',
  templateUrl: './cauhinh-thamso-hethong.component.html',
  styleUrls: ['./cauhinh-thamso-hethong.component.scss']
})
export class CauHinhThamSoHeThongComponent implements OnInit {
  @ViewChild('modalThamSo') public modalThamSo: ModalDirective;
  pagging: Pagging = new Pagging();
  titleModal: string;
  typeModal: string;
  iconModalHeader: string;
  nameButtonSave: string;
  iconButtonSave: string;
  colorButtonSave: string;
  formThamSo: FormGroup;
  errMaThamSo: Boolean = false;
  errTenThamSo: Boolean = false;
  errDonVi: Boolean = false;
  errGiaTri: Boolean = false;
  indexSelected: number;

  pager: any = {};
  constructor(
    private builder: FormBuilder,
    private cauHinhThamSoHtService: CauHinhThamSoHtService,
    private timeBuilder: TimeBuilderService,
  ) { }

  danhSachThamSoHeThong: any[] = [];
  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 20;
    this.getAllData();
    this.formThamSo = this.builder.group({
      id: [''],
      tenThamSo: ['', Validators.required],
      giaTri: ['', Validators.required],
      donVi: ['', Validators.required],
    });
    }


    getAllData(callback?: (data) => void) {
       this.cauHinhThamSoHtService.getThamSoHTs(this.pagging.currentPage, this.pagging.itemsPerPage).subscribe(
        res => {
          this.danhSachThamSoHeThong = res.content;
          this.pagging.totalItems = res.totalElements;
          if (callback) {
            callback(res);
          }
    });
  }
  pageChanged(event) {
      this.pagging.currentPage = event.page - 1;
      this.getAllData();
  }

  editThamSo(id) {

    this.formThamSo.reset();
    this.setEditForm();
    const index = this.danhSachThamSoHeThong.findIndex(m => m.id === id);

    this.formThamSo.patchValue({
      id: this.danhSachThamSoHeThong[index].id,
      tenThamSo: this.danhSachThamSoHeThong[index].tenThamSo,
      giaTri: this.danhSachThamSoHeThong[index].giaTri,
      donVi: this.danhSachThamSoHeThong[index].donVi,
    });
    this.modalThamSo.show();
  }

  saveThamSo() {
    const formValue = this.formThamSo.value;
    if (this.typeModal === 'add') {
      if (this.checkErrFormThamSo()) {
        this.resetMessageErr();
      }
    } else if (this.typeModal === 'edit') {
      if (this.checkErrFormThamSo()) {
        this.cauHinhThamSoHtService.updateThamSoHT(formValue).subscribe(res => {
          this.getAllData();
        }, err => {} );
        this.closeModalThamSo();
        this.resetMessageErr();
      }
    }
  }

  checkErrFormThamSo() {
    if (this.formThamSo.value.id === null) {
      this.errMaThamSo = true;
      return false;
    }
    if (this.formThamSo.value.tenThamSo === null) {
      this.errTenThamSo = true;
      return false;
    }
    if (this.formThamSo.value.donVi === '') {
      this.errDonVi = true;
      return false;
    }
    if (this.formThamSo.value.giaTri === null) {
      this.errGiaTri = true;
      return false;
    }
    return true;
  }

  setAddForm() {
    this.titleModal = 'Thêm tham số';
    this.typeModal = 'add';
    this.iconModalHeader = 'fa fa-plus-circle';
    this.nameButtonSave = 'Lưu';
    this.iconButtonSave = 'fa fa-floppy-o';
    this.colorButtonSave = 'btn btn-primary';
  }

  setEditForm() {
    this.titleModal = 'Sửa tham số';
    this.typeModal = 'edit';
    this.iconModalHeader = 'fa fa-pencil';
    this.nameButtonSave = 'Cập nhật';
    this.iconButtonSave = 'fa fa-floppy-o';
    this.colorButtonSave = 'btn btn-primary';
  }

  setDeleteForm() {
    this.titleModal = 'Xóa tham số';
    this.typeModal = 'delete';
    this.iconModalHeader = 'fa fa-trash';
    this.nameButtonSave = 'Đồng ý';
    this.iconButtonSave = 'fa fa-trash';
    this.colorButtonSave = 'btn btn-danger';
  }

  openModalThamSo() {
    this.modalThamSo.show();
  }

  closeModalThamSo() {
    this.modalThamSo.hide();
    this.resetMessageErr();
  }

  resetMessageErr() {
    this.errMaThamSo = false;
    this.errTenThamSo = false;
    this.errDonVi = false;
    this.errGiaTri = false;
  }
}
