import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MESS_NGHIEP_VU } from '../../../../../../constants/message.constants';
import { DonViNghiepVuService } from '../../../../../../services/api/danh-muc/dmDviNghiepVu/dvi-nghiep-vu.service';
import { AlertService } from '../../../../../../services/api/alert.service';

@Component({
  selector: 'ttkt-modal-nghiep-vu',
  templateUrl: './modal-nghiep-vu.component.html',
  styleUrls: ['./modal-nghiep-vu.component.scss']
})
export class ModalNghiepVuComponent implements OnInit {
  modalNghiepVuForm: FormGroup;
  nghiepVu: any;
  id: number;
  typeAccount: string = '';

  constructor(
    public fb: FormBuilder,
    public modalNghiepVu: BsModalRef,
    public nghiepVuService: DonViNghiepVuService,
    private modalService: BsModalService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.modalNghiepVuForm = this.fb.group({
      id: [''],
      tenNghiepVu: [''],
    });
  }

  onSubmit() {
    const formBody: any = {};
    console.log(this.modalNghiepVuForm.value.id);
    if (this.modalNghiepVuForm.value.id === '') {
      formBody.tenNghiepVu = this.modalNghiepVuForm.value.tenNghiepVu;
      this.nghiepVuService.createDonViNghiepVu(formBody).subscribe(
        res => {
          this.alertService.success(MESS_NGHIEP_VU.SUCCESS_THEM_NGHIEP_VU);
          this.modalService.setDismissReason('modal');
          this.modalNghiepVu.hide();
        }, err => {
          this.alertService.error(MESS_NGHIEP_VU.ERROR_THEM_NGHIEP_VU);
        });
    } else {
      formBody.id = this.modalNghiepVuForm.value.id;
      formBody.tenNghiepVu = this.modalNghiepVuForm.value.tenNghiepVu;
      this.nghiepVuService.updateDonViNghiepVu(formBody).subscribe(
        res => {
          this.alertService.success(MESS_NGHIEP_VU.SUCCESS_CAP_NHAT_NGHIEP_VU);
          this.modalService.setDismissReason('modal');
          this.modalNghiepVu.hide();
        }, err => {
          this.alertService.error(MESS_NGHIEP_VU.ERROR_CAP_NHAT_NGHIEP_VU);
        });
    }
  }
}
