import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pagging } from '../../../../shared/models/pagging.model';
import { NoiDmphanloainoidungService } from '../../../../services/api/danh-muc/noi-dmphanloainoidung/noi-dmphanloainoidung.service';
@Component({
  selector: 'ttkt-danhmuc-phanloai-noidung',
  templateUrl: './danhmuc-phanloai-noidung.component.html',
  styleUrls: ['./danhmuc-phanloai-noidung.component.scss']
})
export class DanhmucPhanloaiNoidungComponent implements OnInit {
  pagging: Pagging = new Pagging();
  @ViewChild('modalDanhmucNoiDung') modalDanhmucNoiDung: ModalDirective;
  danhmucCqBhxhForm: FormGroup;
  statusOption: any;
  title_model: any;
  modalAddDanhmucNoiDungForm: FormGroup;
  listDanhMucTinhHuyen: any[] = [];
  listTructhuocs: any[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  pager: any = {};
  actionName: string = '';
  number: number = 0;

  constructor(
    private fb: FormBuilder,
    private noiDmphanloainoidungService: NoiDmphanloainoidungService,
  ) { }

  ngOnInit() {
    this.getAll();
    this.danhmucCqBhxhForm = this.fb.group({
      tenNoiDung: ['']
    });
    this.modalAddDanhmucNoiDungForm = this.fb.group({
      id: [''],
      tenNoiDung: ['', Validators.required],
    });
  }
  getAll() {
    this.noiDmphanloainoidungService.getAllDmPhanloainoidung(this.currentPage, this.pageSize)
      .subscribe(res => {
        this.listDanhMucTinhHuyen = res['content'];
        this.pagging.totalItems = res.totalElements;
      }, err => {
      });
  }

  
  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.getAll();
  }
}
