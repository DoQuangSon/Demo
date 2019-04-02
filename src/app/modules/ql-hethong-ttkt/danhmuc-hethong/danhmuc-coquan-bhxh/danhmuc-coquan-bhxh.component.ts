import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { NoiDmbhxhService } from '../../../../services/api/danh-muc/noi-dmbhxh/noi-dmbhxh.service';
import { Pagging } from '../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-danhmuc-coquan-bhxh',
  templateUrl: './danhmuc-coquan-bhxh.component.html',
  styleUrls: ['./danhmuc-coquan-bhxh.component.scss']
})
export class DanhmucCoquanBhxhComponent implements OnInit {
  pagging: Pagging = new Pagging();
  @ViewChild('modalDanhmucCoquan') modalDanhmucCoquan: ModalDirective;
  danhmucCqBhxhForm: FormGroup;
  statusOption: any;
  title_model: any;
  modalAddDanhmucCoquanForm: FormGroup;
  listTructhuocs: any[] = [];
  listDanhMucCoQuan: any[] = [];
  actionName: string = '';
  searchObject = {
    tenDonVi: '',
    maDonVi: ''
  };
  constructor(
    private fb: FormBuilder,
    private noiDmbhxhService: NoiDmbhxhService
  ) { }

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 10;
    this.getAll();
    this.danhmucCqBhxhForm = this.fb.group({
      maCoQuan: [''],
      tenCoQuan: ['']
    });
    this.modalAddDanhmucCoquanForm = this.fb.group({
      id: [''],
      maCoQuan: [''],
      tenCoQuan: ['', Validators.required],
      trucThuocCoQuan: ['0', Validators.required],
      soDt: [''],
      email: [''],
      diaChi: ['']
    });
  }
  getAll(setPage: boolean = false) {
    this.noiDmbhxhService.getAllDmBhxh(this.pagging.currentPage, this.pagging.itemsPerPage)
        .subscribe(res => {
          this.listDanhMucCoQuan = res['content'];
          this.pagging.totalItems = res.totalElements;
        }, err => {
        });
  }
  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.getAll();
  }
}
