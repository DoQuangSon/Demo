import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'ttkt-modal-luu',
  templateUrl: './modal-luu.component.html',
  styleUrls: ['./modal-luu.component.scss']
})
export class ModalLuuComponent implements OnInit {
  isLuu: boolean = false;

  constructor(
    public modalLuu: BsModalRef,
  ) { }

  ngOnInit() {
    this.isLuu = false;
  }

  onSubmit() {
    this.isLuu = true;
    this.modalLuu.hide();
  }
}
