import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ThanhLapDoanService } from '../../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
import { AlertService } from '../../../../../../../services/api/alert.service';
import { COMMON_ERROR_MESS } from '../../../../../../../constants/message.constants';

@Component({
  selector: 'ttkt-modal-duyet',
  templateUrl: './modal-duyet.component.html',
  styleUrls: ['./modal-duyet.component.scss']
})
export class ModalDuyetComponent implements OnInit {
  id: number;
  isDuyet: boolean = false;

  constructor(
    public modalDuyet: BsModalRef,
    public tlDoanService: ThanhLapDoanService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.isDuyet = false;
  }

  onSubmitDuyet() {
    this.tlDoanService.ver2DuyetTLD(this.id)
      .subscribe(res => {
        this.isDuyet = true;
      }, err => {
        this.alertService.error(COMMON_ERROR_MESS.DUYET);
      });
      this.modalDuyet.hide();
  }
}
