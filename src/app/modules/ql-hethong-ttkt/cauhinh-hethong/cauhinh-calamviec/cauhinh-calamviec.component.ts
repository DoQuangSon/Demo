import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../constants';

@Component({
  selector: 'ttkt-cauhinh-calamviec',
  templateUrl: './cauhinh-calamviec.component.html',
  styleUrls: ['./cauhinh-calamviec.component.scss']
})
export class CauHinhCaLamViecComponent implements OnInit {
  public ismeridian: Boolean = false;

  @ViewChild('modalCaLamViec') public modalCaLamViec: ModalDirective;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  formCaLamViec: FormGroup;
  titleModal: string;
  iconModalHeader: string;
  typeModal: string;
  nameButtonSave: string;
  iconButtonSave: string;
  colorButtonSave: string;
  indexSelected: number;
  convertStartTimeSang: any;
  convertEndTimeSang: any;
  convertStartTimeChieu: any;
  convertEndTimeChieu: any;
  convertNgayApDung: any;
  errStartTimeSang: Boolean = false;
  errEndTimeSang: Boolean = false;
  errStartTimeChieu: Boolean = false;
  errEndTimeChieu: Boolean = false;
  errNgayApDung: Boolean = false;

  constructor(
    private builder: FormBuilder
  ) { }

  danhSachCaLamViec = [
    {
      'starttime_sang': '8:00',
      'endtime_sang': '12:00',
      'starttime_chieu': '13:00',
      'endtime_chieu': '17:00',
      'ngay_apdung': '01/01/2017'
    },
    {
      'starttime_sang': '8:00',
      'endtime_sang': '12:00',
      'starttime_chieu': '13:00',
      'endtime_chieu': '17:00',
      'ngay_apdung': '01/01/2017'
    },
    {
      'starttime_sang': '8:00',
      'endtime_sang': '12:00',
      'starttime_chieu': '13:00',
      'endtime_chieu': '17:00',
      'ngay_apdung': '01/01/2017'
    },
  ];

  ngOnInit() {
    this.formCaLamViec = this.builder.group({
      starttime_sang_InForm: ['Thu Jan 01 1970 00:00:00 GMT+0700 (SE Asia Standard Time)'],
      endtime_sang_InForm: ['Thu Jan 01 1970 00:00:00 GMT+0700 (SE Asia Standard Time)'],
      starttime_chieu_InForm: ['Thu Jan 01 1970 00:00:00 GMT+0700 (SE Asia Standard Time)'],
      endtime_chieu_InForm: ['Thu Jan 01 1970 00:00:00 GMT+0700 (SE Asia Standard Time)'],
      ngay_apdung_InForm: ['']
    });
  }

  addCaLamViec() {
    this.formCaLamViec.reset();
    this.resetErrMessage();
    this.setAddForm();
    this.openModalCaLamViec();
  }

  editCaLamViec(index) {
    this.resetErrMessage();
    this.setEditForm();
    this.indexSelected = Number(index);
    const date = this.danhSachCaLamViec[Number(index)].ngay_apdung.split('/');

    this.formCaLamViec.patchValue({
      starttime_sang_InForm: 'Thu Jan 01 1970 ' + this.danhSachCaLamViec[index].starttime_sang + ':00 GMT+0700 (SE Asia Standard Time)',
      endtime_sang_InForm: 'Thu Jan 01 1970 ' + this.danhSachCaLamViec[index].endtime_sang + ':00 GMT+0700 (SE Asia Standard Time)',
      starttime_chieu_InForm: 'Thu Jan 01 1970 ' + this.danhSachCaLamViec[index].starttime_chieu + ':00 GMT+0700 (SE Asia Standard Time)',
      endtime_chieu_InForm: 'Thu Jan 01 1970 ' + this.danhSachCaLamViec[index].endtime_chieu + ':00 GMT+0700 (SE Asia Standard Time)',
      ngay_apdung_InForm: {
        date: {
          year: date[2],
          month: date[1] < String(10) ? date[1][1] : date[1],
          day: date[0] < String(10) ? date[0][1] : date[0]
        }
      }
    });
    this.openModalCaLamViec();
  }

  deleteCaLamViec(index) {
    this.setDeleteForm();
    this.resetErrMessage();
    this.indexSelected = Number(index);

    this.formCaLamViec.patchValue({
      starttime_sang_InForm: this.danhSachCaLamViec[index].starttime_sang,
      endtime_sang_InForm: this.danhSachCaLamViec[index].endtime_sang,
      starttime_chieu_InForm: this.danhSachCaLamViec[index].starttime_chieu,
      endtime_chieu_InForm: this.danhSachCaLamViec[index].endtime_chieu,
      ngay_apdung_InForm: this.danhSachCaLamViec[index].ngay_apdung
    });

    this.openModalCaLamViec();
  }

  saveCaLamViec() {
    if (this.typeModal === 'add') {
      if (this.checkErrFormCaLamViec()) {
        this.convertTime();
        const NEW_CA_LAM_VIEC = {
          starttime_sang: this.convertStartTimeSang,
          endtime_sang: this.convertEndTimeSang,
          starttime_chieu: this.convertStartTimeChieu,
          endtime_chieu: this.convertEndTimeChieu,
          ngay_apdung: this.convertNgayApDung
        };
        this.danhSachCaLamViec.push(NEW_CA_LAM_VIEC);
        this.closeModalCaLamViec();
      }
    } else if (this.typeModal === 'edit') {
      if (this.checkErrFormCaLamViec()) {
        this.convertTime();
        this.formCaLamViec[this.indexSelected] = {
          starttime_sang: this.convertStartTimeSang,
          endtime_sang: this.convertEndTimeSang,
          starttime_chieu: this.convertStartTimeChieu,
          endtime_chieu: this.convertEndTimeChieu,
          ngay_apdung: this.convertNgayApDung
        };
        this.closeModalCaLamViec();
      }
    } else {
      this.danhSachCaLamViec.splice(this.indexSelected, 1);
      this.closeModalCaLamViec();
    }
  }

  checkErrFormCaLamViec() {
    if (this.formCaLamViec.value.starttime_sang_InForm == null) {
      this.errStartTimeSang = true;
      return false;
    }
    if (this.formCaLamViec.value.endtime_sang_InForm == null) {
      this.errEndTimeSang = true;
      return false;
    }
    if (this.formCaLamViec.value.starttime_chieu_InForm == null) {
      this.errStartTimeChieu = true;
      return false;
    }
    if (this.formCaLamViec.value.endtime_chieu_InForm == null) {
      this.errEndTimeChieu = true;
      return false;
    }
    if (this.formCaLamViec.value.ngay_apdung_InForm == null) {
      this.errNgayApDung = true;
      return false;
    }
    return true;
  }

  convertTime() {
    this.convertStartTimeSang = this.formCaLamViec.value.starttime_sang_InForm;
    this.convertStartTimeSang = this.convertStartTimeSang.getHours() + ':' + this.addZero(this.convertStartTimeSang.getMinutes());

    this.convertEndTimeSang = this.formCaLamViec.value.endtime_sang_InForm;
    this.convertEndTimeSang = this.convertEndTimeSang.getHours() + ':' + this.addZero(this.convertEndTimeSang.getMinutes());

    this.convertStartTimeChieu = this.formCaLamViec.value.starttime_chieu_InForm;
    this.convertStartTimeChieu = this.convertStartTimeChieu.getHours() + ':' + this.addZero(this.convertStartTimeChieu.getMinutes());

    this.convertEndTimeChieu = this.formCaLamViec.value.endtime_chieu_InForm;
    this.convertEndTimeChieu = this.convertEndTimeChieu.getHours() + ':' + this.addZero(this.convertEndTimeChieu.getMinutes());

    if (!this.formCaLamViec.value.ngay_apdung_InForm.formatted) {
    } else {
      this.convertNgayApDung = this.formCaLamViec.value.ngay_apdung_InForm.formatted;
    }
  }

  setAddForm() {
    this.titleModal = 'Thêm ca làm việc';
    this.iconModalHeader = 'fa fa-plus-circle';
    this.typeModal = 'add';
    this.nameButtonSave = 'Lưu';
    this.iconButtonSave = 'fa fa-floppy-o';
    this.colorButtonSave = 'btn btn-primary';
  }

  setEditForm() {
    this.titleModal = 'Sửa ca làm việc';
    this.iconModalHeader = 'fa fa-pencil';
    this.typeModal = 'edit';
    this.nameButtonSave = 'Cập nhật';
    this.iconButtonSave = 'fa fa-floppy-o';
    this.colorButtonSave = 'btn btn-primary';
  }

  setDeleteForm() {
    this.titleModal = 'Xóa ca làm việc';
    this.iconModalHeader = 'fa fa-exclamation-triangle';
    this.typeModal = 'delete';
    this.nameButtonSave = 'Đồng ý';
    this.iconButtonSave = 'fa fa-trash';
    this.colorButtonSave = 'btn btn-danger';
  }

  resetErrMessage() {
    this.errStartTimeSang = false;
    this.errEndTimeSang = false;
    this.errStartTimeChieu = false;
    this.errEndTimeChieu = false;
    this.errNgayApDung = false;
  }

  addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  openModalCaLamViec() {
    this.modalCaLamViec.show();
  }

  closeModalCaLamViec() {
    this.modalCaLamViec.hide();
  }
}
