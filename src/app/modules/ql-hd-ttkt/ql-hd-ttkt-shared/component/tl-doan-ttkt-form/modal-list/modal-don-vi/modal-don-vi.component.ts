import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup } from '@angular/forms/src/model';
import { ThanhlapdoanCommonMethodService } from '../../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/thanhlapdoan-common-method.service';
import { FormService } from '../../../../../../../shared/form-module/form.service';
import { AlertService } from '../../../../../../../services/api/alert.service';
import { NoiDmChucDanhService } from '../../../../../../../services/api/danh-muc/noi-dmChucDanh/noi-dm-chucdanh.service';
import { AuthService } from '../../../../../../../auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseModal } from '../../../../../../../shared/modal/base-modal';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
@Component({
  selector: 'ttkt-modal-don-vi',
  templateUrl: './modal-don-vi.component.html',
  styleUrls: ['./modal-don-vi.component.scss']
})
export class ModalDonViComponent extends BaseModal implements OnInit {
  donViForm: FormGroup;
  tldoanForm: FormGroup;
  listNDTTDvi: Array<any> = [];
  listNDKTDvi: Array<any> = [];
  type: string;
  title: string;
  isDelete: boolean = false;

  constructor(
    private fb: FormBuilder,
    private commonMethodTld: ThanhlapdoanCommonMethodService,
    public modalDonVi: BsModalRef,
    private modalService: BsModalService,
    private formService: FormService,
    private alert: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.donViForm = this.fb.group({
      id: [''],
      tenDoiTuong: ['', Validators.required],
      maThu: [''],
      noiDungTT: ['', Validators.required],
      noiDungKT: ['', Validators.required],
      maSuDungLaoDong: [''],
      maCoSoKhamChuaBenh: [''],
      dmPhanLoaiDtId: [''],
      noiDungTTName: [''],
      noiDungKTName: ['']
    });
  }

  init(tldForm: FormGroup, donVi?: any, isDelete?: any) {
    this.tldoanForm = tldForm;
    this.isDelete = isDelete;
    if (tldForm.value.listNoiDungTT) {
      this.listNDTTDvi = tldForm.value.listNoiDungTT;
    }
    if (donVi.noiDungTT) {
      donVi.noiDungTT.map(res => res.text = res.tenNoiDungTTKT || res.text);
    }

    if (donVi.noiDungKT) {
      donVi.noiDungKT.map(res => res.text = res.tenNoiDungTTKT || res.text);
    }

    if (tldForm.value.listNoiDungKT) {
      this.listNDKTDvi = tldForm.value.listNoiDungKT;
    }
    console.log('vá');
    if (isDelete) {
      this.title = 'Xóa đơn vị';
      this.type = 'delete';
    } else {
      this.title = 'Chi tiết đơn vị';
      this.type = 'edit';
    }

    console.log(tldForm.value, donVi);
    if (donVi) {
      this.donViForm.patchValue(donVi);
    }
  }
   // bam save btn modal don vi
   saveDonVi() {
    this.formService.touchAllInput(this.donViForm);
    if (this.donViForm.invalid) {
      this.alert.error('Vui lòng nhập đầy đủ thông tin');
      console.log(this.formService.getErrorList(this.donViForm));
      return;
    }
    let ndtt = this.formService.joinArray(this.donViForm.get('noiDungTT').value, 'text', '; ');
    this.donViForm.get('noiDungTTName').setValue(ndtt, {emitEvent: false});
    let ndkt = this.formService.joinArray(this.donViForm.get('noiDungKT').value, 'text', '; ');
    this.donViForm.get('noiDungKTName').setValue(ndkt, {emitEvent: false});

    this.eventChange.next(this.donViForm.value);
    this.modalDonVi.hide();
  }
}
