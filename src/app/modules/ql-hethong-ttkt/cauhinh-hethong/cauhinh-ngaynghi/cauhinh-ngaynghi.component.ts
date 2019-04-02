import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../constants';
import { CauHinhNgayNghiService } from '../../../../services/api/cau-hinh/cau-hinh-ngay-nghi/cau-hinh-ngay-nghi.service';
import { TimeBuilderService, compareDate } from '../../../../services/helper/time-builder.service';
import { Pagging } from '../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-cauhinh-ngaynghi',
  templateUrl: './cauhinh-ngaynghi.component.html',
  styleUrls: ['./cauhinh-ngaynghi.component.scss']
})
export class CauHinhNgayNghiComponent implements OnInit {

  @ViewChild('modalNgayNghi') public modalNgayNghi: ModalDirective;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  pagging: Pagging = new Pagging();
  formNgayNghi: FormGroup;
  titleModal: string;
  iconModalHeader: string;
  typeModal: string;
  nameButtonSave: string;
  iconButtonSave: string;
  colorButtonSave: string;
  indexSelected: number;
  errTenNgayNghi: Boolean = false;
  errTuNgay: Boolean = false;
  errDenNgay: Boolean = false;
  errNgay: Boolean = false;

  ngayNghi: any;
  danhSachNgayNghi: any = [];
  pager: any = {};
  constructor(
    private builder: FormBuilder,
    private ngayNghiService: CauHinhNgayNghiService,
    private timeBuilder: TimeBuilderService,
  ) { }

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 20;
    this.getAllNgaynghi();
    this.formNgayNghi = this.builder.group({
      ten_InForm: ['', Validators.required],
      mota_InForm: [''],
      tungay_InForm: ['', Validators.required],
      denngay_InForm: ['', Validators.required]
    });
  }
  getAllNgaynghi(callback?: (data) => void) {
    this.ngayNghiService.getAllNgayNghi(this.pagging.currentPage, this.pagging.itemsPerPage).subscribe(
      res => {
        this.danhSachNgayNghi = res.content;
        this.pagging.totalItems = res.totalElements;
        if (callback) {
          callback(res);
        }
      });
  }

  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.getAllNgaynghi();
  }

  addNgayNghi() {
    this.formNgayNghi.reset();
    this.resetErrMessage();
    this.setAddForm();
    this.openModalNgayNghi();
  }

  editNgayNghi(index) {
    this.resetErrMessage();
    this.setEditForm();

    this.ngayNghi = this.danhSachNgayNghi.find(el => {
      return el.id === index;
    });

    console.log('tungay', this.timeBuilder.fromString(this.ngayNghi.ngayBatDau).setUTC().toTimeDatePickerValue());

    this.formNgayNghi.patchValue({
      ten_InForm: this.ngayNghi.tenNgayNghi,
      mota_InForm: this.ngayNghi.moTa,
      tungay_InForm: this.timeBuilder.fromString(this.ngayNghi.ngayBatDau).setUTC().toTimeDatePickerValue(),
      denngay_InForm: this.timeBuilder.fromString(this.ngayNghi.ngayKetThuc).setUTC().toTimeDatePickerValue(),
    });
    this.openModalNgayNghi();
  }

  deleteNgayNghi(index) {
    this.resetErrMessage();
    this.setDeleteForm();

    this.ngayNghi = this.danhSachNgayNghi.find(el => {
      return el.id === index;
    });

    console.log('tungay', this.timeBuilder.convertDateToString(this.ngayNghi.ngayBatDau));

    this.formNgayNghi.patchValue({
      ten_InForm: this.ngayNghi.tenNgayNghi,
      mota_InForm: this.ngayNghi.moTa,
      tungay_InForm: this.timeBuilder.convertDateToString(this.ngayNghi.ngayBatDau),
      denngay_InForm: this.timeBuilder.convertDateToString(this.ngayNghi.ngayKetThuc),
    });
    this.openModalNgayNghi();
  }

  saveNgayNghi() {
      if (this.typeModal === 'add') {
        const NEW_NGAY_NGHI = {
          tenNgayNghi: this.formNgayNghi.value.ten_InForm,
          moTa: this.formNgayNghi.value.mota_InForm,
          ngayBatDau: this.formNgayNghi.value.tungay_InForm,
          ngayKetThuc: this.formNgayNghi.value.denngay_InForm,
        };
        if (this.checkErrFormNgayNghi()) {
          NEW_NGAY_NGHI.ngayBatDau = this.timeBuilder.fromTimeDatePicker(NEW_NGAY_NGHI.ngayBatDau).toISOString();
          NEW_NGAY_NGHI.ngayKetThuc = this.timeBuilder.fromTimeDatePicker(NEW_NGAY_NGHI.ngayKetThuc).toISOString();
          // this.danhSachNgayNghi.push(NEW_NGAY_NGHI);
          console.log('ngay', NEW_NGAY_NGHI);
          this.ngayNghiService.createNgayNghi(NEW_NGAY_NGHI)
            .subscribe(res => {
              this.getAllNgaynghi();
            }, err => {
            });
          this.closeModalNgayNghi();
        }
      } else if (this.typeModal === 'edit') {
        this.ngayNghi.tenNgayNghi = this.formNgayNghi.value.ten_InForm;
        this.ngayNghi.moTa = this.formNgayNghi.value.mota_InForm;

        if (this.checkErrFormNgayNghi()) {
          this.ngayNghi.ngayBatDau = this.timeBuilder.fromTimeDatePicker(this.formNgayNghi.value.tungay_InForm).toISOString();
          this.ngayNghi.ngayKetThuc = this.timeBuilder.fromTimeDatePicker(this.formNgayNghi.value.denngay_InForm).toISOString();
          console.log('editNN', this.ngayNghi);
          this.ngayNghiService.updateNgayNghi(this.ngayNghi).subscribe(
            res => {
              this.getAllNgaynghi();
            }
          );
          this.closeModalNgayNghi();
        }
      } else {
        this.ngayNghiService.deleteNgayNghi(this.ngayNghi.id).subscribe(
          res => {
            this.getAllNgaynghi(data => {
              if (data.content.length === 0) {
                this.pagging.currentPage = this.pagging.currentPage - 1;
                this.getAllNgaynghi();
              }
            });
          }
        );
        this.closeModalNgayNghi();
      }
  }

  setAddForm() {
    this.titleModal = 'Thêm ngày nghỉ';
    this.iconModalHeader = 'fa fa-plus-circle';
    this.typeModal = 'add';
    this.nameButtonSave = 'Lưu';
    this.iconButtonSave = 'fa fa-floppy-o';
    this.colorButtonSave = 'btn btn-primary';
  }

  setEditForm() {
    this.titleModal = 'Sửa ngày nghỉ';
    this.iconModalHeader = 'fa fa-pencil';
    this.typeModal = 'edit';
    this.nameButtonSave = 'Cập nhật';
    this.iconButtonSave = 'fa fa-floppy-o';
    this.colorButtonSave = 'btn btn-primary';
  }

  setDeleteForm() {
    this.titleModal = 'Xóa ngày nghỉ';
    this.iconModalHeader = 'fa fa-exclamation-triangle';
    this.typeModal = 'delete';
    this.nameButtonSave = 'Đồng ý';
    this.iconButtonSave = 'fa fa-trash';
    this.colorButtonSave = 'btn btn-danger';
  }

  checkErrFormNgayNghi(_options?: any) {
    const defaultOptions = {
      checkten_InForm: true,
      checktungay_InForm: true,
      checkdenngay_InForm: true
    };
    const defaultOptionsFalse = { ...defaultOptions };
    // tslint:disable-next-line:forin
    for (const key in defaultOptionsFalse) {
      defaultOptionsFalse[key] = false;
    }
    let option: any = {};
    if (_options) {
      option = { ...defaultOptionsFalse, ..._options };
    } else {
      option = defaultOptions;
    }
    if (!this.formNgayNghi.value.ten_InForm && option.checkten_InForm) {
      this.errTenNgayNghi = true;
    } else {
      this.errTenNgayNghi = false;
    }
    if (this.formNgayNghi.value.tungay_InForm === null && option.checktungay_InForm) {
      this.errTuNgay = true;
      this.errNgay = false;
    } else {
      this.errTuNgay = false;
    }
    if (this.formNgayNghi.value.denngay_InForm === null && option.checkdenngay_InForm) {
      this.errDenNgay = true;
      this.errNgay = false;
      return false;
    } else {
      this.errDenNgay = false;
    }
    const batDau = new Date(this.timeBuilder.fromTimeDatePicker(this.formNgayNghi.value.tungay_InForm).setUTC().toISOString());
    const ketThuc = new Date(this.timeBuilder.fromTimeDatePicker(this.formNgayNghi.value.denngay_InForm).setUTC().toISOString());
    if (compareDate(batDau, ketThuc) <= 0) {
      console.log(batDau);
      console.log(ketThuc);
      this.errNgay = true;
      this.errTuNgay = false;
      this.errDenNgay = false;
      return false;
    } else {
      this.errNgay = false;
    }
    return true;
  }

  openModalNgayNghi() {
    this.modalNgayNghi.show();
  }
  closeModalNgayNghi() {
    this.modalNgayNghi.hide();
  }
  resetErrMessage() {
    this.errTenNgayNghi = false;
    this.errTuNgay = false;
    this.errDenNgay = false;
  }
}
