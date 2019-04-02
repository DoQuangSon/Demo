import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { LOAIHINHTTKT } from "../../../../../../constants/ke-hoach-ttkt.constants";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { BaseModal } from "../../../../../../shared/modal/base-modal";
import { FormService } from "../../../../../../shared/form-module/form.service";
import { UtilsService } from "../../../../../../services/api/utils/utils.service";


@Component({
    selector: 'ttkt-dialog-loai-hinh-quy',
    templateUrl: './dialog-loai-hinh-quy.component.html',
  })
  export class DialogLoaiHinhQuyComponent extends BaseModal implements OnInit {
    donViForm: FormGroup;
    constructor(
      private router: Router,
      private fb: FormBuilder,
      public modalDonVi: BsModalRef,
      private formService: FormService,
      private helper: UtilsService
    ) { 
        super();
    }
  
    optionLoaiHinhTTKTs: any[] = LOAIHINHTTKT;
    data: any;//keep ref value

    ngOnInit() {
        console.log(this.data);
        this.donViForm = this.fb.group({
            quyTrongKeHoach: [this.helper.getQuyHienTai(), Validators.required],
            loaiHinhTTKT: [1, Validators.required]
          });
    }

    saveDonVi() {
        this.formService.touchAllInput(this.donViForm);
        if (this.donViForm.valid) {
            Object.assign(this.data, this.donViForm.value);
            this.modalDonVi.hide();
        }
    }
}