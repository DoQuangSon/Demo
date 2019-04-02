import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../constants';
import { CauHinhThoiHanService } from '../../../../services/api/cau-hinh/cauhinh-thoihan/cau-hinh-thoi-han.service';
import { TimeBuilderService } from '../../../../services/helper/time-builder.service';
import { Pagging } from '../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-cauhinh-thoihan',
  templateUrl: './cauhinh-thoihan.component.html',
  styleUrls: ['./cauhinh-thoihan.component.scss']
})
export class CauhinhThoihanComponent implements OnInit {

  @ViewChild('modalThamSo') public modalThamSo: ModalDirective;
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
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
  errNgayGui: Boolean = false;
  indexSelected: number;

  pager: any = {};
  constructor(
    private builder: FormBuilder,
    private cauHinhThoiHanService: CauHinhThoiHanService,
    private timeBuilder: TimeBuilderService,
  ) { }

  danhSachThoiHan: any[] = [];
  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 20;
    this.getAllData();
    this.formThamSo = this.builder.group({
      id: [''],
      tenThamSo: ['', Validators.required],
      ngayGui: ['', Validators.required],
    });
    }


    getAllData(callback?: (data) => void) {
       this.cauHinhThoiHanService.getAllThoiHan(this.pagging.currentPage, this.pagging.itemsPerPage).subscribe(
        res => {
          this.danhSachThoiHan = res.content;
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
    const index = this.danhSachThoiHan.findIndex(m => m.id === id);
    this.formThamSo.patchValue({
      id: this.danhSachThoiHan[index].id,
      tenThamSo: this.danhSachThoiHan[index].tenThamSo,
      ngayGui: this.timeBuilder.fromString(this.danhSachThoiHan[index].ngayGui).toTimeDatePickerValue(),
    });
    this.modalThamSo.show();
  }

  saveThamSo() {
    const formValue = this.formThamSo.value;
    formValue.ngayGui = this.timeBuilder.fromTimeDatePicker(formValue.ngayGui).setUTC().toISOString();
    if (this.typeModal === 'add') {
      if (this.checkErrFormThamSo()) {
        this.resetMessageErr();
      }
    } else if (this.typeModal === 'edit') {
      console.log(this.formThamSo.value);
      console.log(this.formThamSo);
      if (this.checkErrFormThamSo()) {
        this.cauHinhThoiHanService.updateThoiHan(formValue).subscribe(res => {
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
    if (this.formThamSo.controls.ngayGui.invalid) {
      this.errNgayGui = true;
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
    this.errNgayGui = false;
  }

}
