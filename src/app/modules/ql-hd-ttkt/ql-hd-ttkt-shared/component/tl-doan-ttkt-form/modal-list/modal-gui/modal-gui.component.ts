import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ThanhLapDoanService } from '../../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { AlertService } from '../../../../../../../services/api/alert.service';
import { COMMON_SUCCESS_MESS, COMMON_ERROR_MESS } from '../../../../../../../constants/message.constants';

@Component({
  selector: 'ttkt-modal-gui',
  templateUrl: './modal-gui.component.html',
  styleUrls: ['./modal-gui.component.scss']
})
export class ModalGuiComponent implements OnInit {
  guiModalForm: FormGroup;
  dsTinh: any = [];
  id: number;
  typeAccount: string = '';

  constructor(
    public fb: FormBuilder,
    public modalGui: BsModalRef,
    public tlDoanService: ThanhLapDoanService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.guiModalForm = this.fb.group({
      inputSend: [''],
      loiNhan: ''
    });
  }

  onSubmitGuiModal() {
    const formBody = {
      id: this.id,
      loiNhanCuaTw: this.guiModalForm.value.loiNhan,
    };

    this.tlDoanService.ver2TWGuiTinh(formBody).subscribe(res => {
      this.modalGui.hide();
      this.alertService.success(COMMON_SUCCESS_MESS.GUI, { delay: 1000 });
      this.typeAccount === 'TW' ? this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tw/tl-doan-ttkt-tw']) : this.router.navigate(['/ql-hd-ttkt/ql-doan-ttkt/tinh/tl-doan-ttkt-tinh']);
    }, err => {
      this.alertService.error(COMMON_ERROR_MESS.GUI);
    });
  }
}
