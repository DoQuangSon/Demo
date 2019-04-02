import {Component, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup } from '@angular/forms/src/model';
import { FormService } from '../../../../../../../shared/form-module/form.service';
import { AlertService } from '../../../../../../../services/api/alert.service';
import { NoiDmChucDanhService } from '../../../../../../../services/api/danh-muc/noi-dmChucDanh/noi-dm-chucdanh.service';
import { AuthService } from '../../../../../../../auth/auth.service';
import { BaseModal } from '../../../../../../../shared/modal/base-modal';
import { Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'ttkt-modal-ds-doan-ttkt',
  templateUrl: './modal-ds-doan-ttkt.component.html',
  styleUrls: ['./modal-ds-doan-ttkt.component.scss']
})
export class ModalDsDoanTtktComponent extends BaseModal implements OnInit {
  formThanhVien: FormGroup;
  listDviDsDoanTTKT: any = [];
  donViPhoiHop: any;
  isDelete = false;

  iconModalHeader = '';
  iconButtonSave = '';
  colorButtonSave = '';
  titleModal = '';
  nameButtonSave = '';
    chucDanhDoan: Array<any> = [
        {text: 'Trưởng đoàn'},
        {text: 'Phó đoàn'},
        {text: 'Thành viên'}
    ];
  chucDanh: Array<any> = [];
  constructor(
    public modalThanhVien: BsModalRef,
    public fb: FormBuilder,
    public formService: FormService,
    public _alert: AlertService,
    public noiChucDanh: NoiDmChucDanhService,
    private auth: AuthService
  ) {
    super();
   }

  ngOnInit() {
    this.formThanhVien = this.fb.group({
        hoVaTen: ['', [Validators.required, Validators.pattern(/[^-\s]/)]],
        chucVuDoan: ['', [Validators.required, Validators.pattern(/[^-\s]/)]],
        chucVuCongTac: ['', [Validators.required, Validators.pattern(/[^-\s]/)]],
        tenDonViChuTriPhoiHop: [''],
        dmCTriPHopId: ['', [Validators.required]],
        id: [''],
    });
      this.noiChucDanh.getAllDmChucDanh(0, 1000, this.auth.currentUser.donViId).subscribe(res => {
          console.log(res);
          this.chucDanh = res.content.map(item => item.chucDanh);
      });


    this.formThanhVien.get('dmCTriPHopId').valueChanges.subscribe(dvCt => {
      if (!dvCt) {
        this.formThanhVien.get('tenDonViChuTriPhoiHop').setValue('', {emitEvent: false});
      }

      for (const dv of this.listDviDsDoanTTKT) {
        if (dv.id == dvCt) {
          this.formThanhVien.get('tenDonViChuTriPhoiHop').setValue(dv.text, {emitEvent: false});
          break;
        }
      }
    });
  }
    init(listDviDsDoanTTKT: any, thanhVien?: any, isDelete?: any) {
        this.listDviDsDoanTTKT = listDviDsDoanTTKT;
        if (thanhVien) {
            if (isDelete) {
                this.isDelete = isDelete;
                this.setDeleteForm();
            } else {
                this.setEditForm();
            }
            this.formThanhVien.patchValue(thanhVien);
        } else {
            this.setAddForm();
        }
    }

  saveThanhVien() {
    this.formService.touchAllInput(this.formThanhVien);
    if (this.formThanhVien.invalid) {
      console.log(this.formService.getErrorList(this.formThanhVien));
      return;
    }
    if (this.modalThanhVien.content.typeModal === 'edit') {
      this._alert.success('Sửa thành công');
      this.modalThanhVien.hide();
    }
    if (this.modalThanhVien.content.typeModal === 'delete') {
      this._alert.success('Xóa thành công');
      this.modalThanhVien.hide();
    }
    if (this.modalThanhVien.content.typeModal === 'add') {
      this._alert.success('Thêm thành công');
    }
    this.eventChange.next(this.formThanhVien.value);
    this.formThanhVien.reset();
  }
  setAddForm() {
    this.modalThanhVien.content.titleModal = 'Thêm thành viên';
    this.modalThanhVien.content.typeModal = 'add';
    this.modalThanhVien.content.iconModalHeader = 'fa fa-plus-circle';
    this.modalThanhVien.content.nameButtonSave = 'Lưu';
    this.modalThanhVien.content.iconButtonSave = 'fa fa-floppy-o';
    this.modalThanhVien.content.colorButtonSave = 'btn btn-primary';
  }

  setEditForm() {
    this.modalThanhVien.content.titleModal = 'Sửa thành viên';
    this.modalThanhVien.content.typeModal = 'edit';
    this.modalThanhVien.content.iconModalHeader = 'fa fa-pencil';
    this.modalThanhVien.content.nameButtonSave = 'Cập nhật';
    this.modalThanhVien.content.iconButtonSave = 'fa fa-floppy-o';
    this.modalThanhVien.content.colorButtonSave = 'btn btn-primary';
  }

  setDeleteForm() {
    this.modalThanhVien.content.titleModal = 'Xóa thành viên';
    this.modalThanhVien.content.typeModal = 'delete';
    this.modalThanhVien.content.iconModalHeader = 'fa fa-trash';
    this.modalThanhVien.content.nameButtonSave = 'Đồng ý';
    this.modalThanhVien.content.iconButtonSave = 'fa fa-trash';
    this.modalThanhVien.content.colorButtonSave = 'btn btn-danger';
  }
}
