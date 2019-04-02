import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../../../node_modules/@angular/forms';
import { Pagging } from '../../../../shared/models/pagging.model';
import { BsModalRef, BsModalService, ModalDirective } from '../../../../../../node_modules/ngx-bootstrap';
import { ModalNghiepVuComponent } from './modal-list/modal/modal-nghiep-vu.component';
import { MESS_NGHIEP_VU } from '../../../../constants/message.constants';
import { DonViNghiepVuService } from '../../../../services/api/danh-muc/dmDviNghiepVu/dvi-nghiep-vu.service';
import { AlertService } from '../../../../services/api/alert.service';

@Component({
  selector: 'ttkt-danh-muc-don-vi-nghiep-vu',
  templateUrl: './danh-muc-don-vi-nghiep-vu.component.html',
  styleUrls: ['./danh-muc-don-vi-nghiep-vu.component.scss']
})
export class DanhMucDonViNghiepVuComponent implements OnInit {
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  modalNghiepVu: BsModalRef;

  pagging: Pagging = new Pagging();
  danhMucNghiepVuForm: FormGroup;
  listNghiepVu: any[] = [];
  id_delete : any;

  isSearching: boolean = false;
  searchName: string = '';

  constructor(
    private fb: FormBuilder,
    private nghiepVuService: DonViNghiepVuService,
    private modalService: BsModalService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getAll();
    this.danhMucNghiepVuForm = this.fb.group({
      tenNghiepVu: ['']
    });

    this.modalService.onHidden.subscribe(
      res => {
        if (res) {
          this.getAll();
        }
      }
    );
  }

  getAll() {
    this.pagging.itemsPerPage = 15;
    this.nghiepVuService.getAllDonViNghiepVu(this.pagging.currentPage - 1, this.pagging.itemsPerPage)
      .subscribe(res => {
        this.listNghiepVu = res.content;
        this.pagging.totalItems = res.totalElements;
      }, err => {
    });
  }

  pageChanged(event) {
    this.pagging.currentPage = event.page;
    this.getAll();
  }

  action(data?) {
    this.modalNghiepVu = this.modalService.show(ModalNghiepVuComponent);
    if (data !== undefined) {
      this.modalNghiepVu.content.modalNghiepVuForm.patchValue({
        id: data.id,
        tenNghiepVu: data.tenNghiepVu,
      });
    }
  }
  //xóa thông tin
  onDelete(nghiepVuId) {
    this.id_delete = nghiepVuId;
    this.modalDelete.show();
  }
  actionDelete() {
    this.modalDelete.hide();
    this.nghiepVuService.deleteDonViNghiepVu(this.id_delete)
    .subscribe(res => {
      this.alertService.success(MESS_NGHIEP_VU.SUCCESS_XOA_NGHIEP_VU);
      this.getAll();
    }, err => {
      this.alertService.error(MESS_NGHIEP_VU.ERROR_XOA_NGHIEP_VU);
    });
  }
}
