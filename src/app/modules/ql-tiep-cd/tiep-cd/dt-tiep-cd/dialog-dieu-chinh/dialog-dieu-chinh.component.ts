import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { FormService } from '../../../../../shared/form-module/form.service';
import { NoiDonthuService } from '../../../../../services/api/noi-donthu/noi-donthu.service';

@Component({
  selector: 'ttkt-dialog-dieu-chinh',
  templateUrl: './dialog-dieu-chinh.component.html',
  styleUrls: ['./dialog-dieu-chinh.component.scss']
})
export class DialogDieuChinhComponent implements OnInit {
  donthuTiepCDForm: FormGroup;
  validationMessages: any;
  _currentItem: any;
  date: Date = new Date();
  set currentItem(data: any) {
    if(data && data.ngayVanBan == null){
      data.ngayVanBan = new Date(this.date.setHours(0, 0, 0, 0)).toISOString();
    }
    if(data && data.ngayQDTL == null){
      data.ngayQDTL = new Date(this.date.setHours(0, 0, 0, 0)).toISOString();
    }
    this.donthuTiepCDForm.patchValue(data);
    this._currentItem = data;
  }
  get currentItem() {
    return this._currentItem;
  }


  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private formService: FormService,
    private noiDonThuService: NoiDonthuService,
    private modelService: BsModalService
  ) {}
  ngOnInit() {
    this.donthuTiepCDForm = this.fb.group ({
      coBanAnOrKetQua: [false],
      soVanBan: ['', [Validators.required, Validators.maxLength(50)]],
      ngayVanBan: ['', Validators.required],
      coQuanBanHanh: [''],
      trichYeuNoiDung: [''],
      soQDTL: ['', [Validators.required, Validators.maxLength(50)]],
      ngayQDTL: ['', Validators.required],
      soQDGQKN: [''],
      ngayQDGQKN: [''],
      soKLNDTC: [''],
      ngayKLNDTC: [''],
      soCongVanKNPA: [''],
      ngayCongVanKNPA: ['']
    });
  }

  onSubmit() {
    this.formService.touchAllInput(this.donthuTiepCDForm);
    console.log(this.donthuTiepCDForm.value);
    if(this.donthuTiepCDForm.valid) {
      //call api
      let formValue = this.donthuTiepCDForm.value;
      //@Todo: define
      formValue.status = 3;

      // formValue.soCongVanDen = formValue.soQDTL;
      // formValue.ngayCongVan = formValue.ngayQDTL;

      if (formValue.coBanAnOrKetQua) {
        formValue.status = 5;
        // formValue.soCongVanDen = formValue.soVanBan;
        // formValue.ngayCongVan = formValue.ngayVanBan;
      }

      if (formValue.soQDGQKN || formValue.soKLNDTC || formValue.soCongVanKNPA) {
        formValue.status = 4;
      }

      formValue.id = this._currentItem.id;

      this.noiDonThuService.updateDonThu(formValue).subscribe(req => {
        // console.log(req);
        this.modelService.setDismissReason('dc');
        this.bsModalRef.hide();
      });
    }
  }
}
