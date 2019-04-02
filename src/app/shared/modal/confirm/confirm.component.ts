import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { BaseModal } from '../base-modal';

@Component({
  selector: 'ttkt-modal-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ModalConfirmComponent extends BaseModal implements OnInit {
  title: string = '';
  message: string = 'Bạn có chắc chắn muốn lưu?';
  btnSubmit: string = 'Lưu';

  constructor(
    public modalLuu: BsModalRef,
  ) {
    super();
   }

  ngOnInit() {
  }

  init(title: string, msg: string, btn?: string) {
    this.title = title;
    this.message = msg;
    if (btn) {
      this.btnSubmit = btn;
    }
  }

  onSubmit() {
    this.eventChange.next(true);
    this.modalLuu.hide();
  }
}
