import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { AlertService } from '../../../../services/api/alert.service';
import { NoiDmtinhtrangtailieuService } from '../../../../services/api/danh-muc/noi-dmtinhtrangtailieu/noi-dmtinhtrangtailieu.service';
import { PaginationService } from '../../../../services/helper/pagination.service';

@Component({
  selector: 'ttkt-danhmuc-tinhtrang-tailieu',
  templateUrl: './danhmuc-tinhtrang-tailieu.component.html',
  styleUrls: ['./danhmuc-tinhtrang-tailieu.component.scss']
})
export class DanhmucTinhtrangTailieuComponent implements OnInit {

  @ViewChild('modalDanhmucTinhTrang') modalDanhmucTinhTrang: ModalDirective;
  danhmucCqBhxhForm: FormGroup;
  statusOption: any;
  title_model: any;
  modalAddDanhmucTinhtrangForm: FormGroup;
  listDanhMucTinhHuyen: any[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  pager: any = {};
  isSearching: boolean = false;
  actionName: string = '';
  searchName: string = '';
  blur: boolean = false;
  number: number = 0;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private noiDmtinhtrangtailieuService: NoiDmtinhtrangtailieuService,
    private pagination: PaginationService
  ) { }

  ngOnInit() {
    this.getAll('get');
    this.danhmucCqBhxhForm = this.fb.group({
      tenTinhTrang: [''],
      moTa: [''],
    });
    this.modalAddDanhmucTinhtrangForm = this.fb.group({
      id: [''],
      tenTinhTrang: ['', Validators.required],
      moTa: ['',Validators.maxLength(255)],
    });
  }
  getAll(task: string, name = '', setPage: boolean = false) {
    if (task === 'get' || task === 'delete') {
      if (task === 'delete') {
        if (this.listDanhMucTinhHuyen.length === 1) {
          this.currentPage -= 1;
        }
      }
      this.noiDmtinhtrangtailieuService.getAllDmTinhtrangtailieu(this.currentPage, this.pageSize)
        .subscribe(res => {
          this.isSearching = false;
          this.processDataToShow(res);
        }, err => {
        });
    } else if (task === 'search') {
      this.noiDmtinhtrangtailieuService.searchAllDmTinhtrangtailieu(name, this.currentPage, this.pageSize)
        .subscribe(res => {
          this.isSearching = true;
          if (setPage) {
            this.danhmucCqBhxhForm.patchValue({
              tenTinhTrang: this.searchName
            });
          }
          this.processDataToShow(res);
        }, err => {
        });
    }
  }
  processDataToShow(data) {
    this.pager = this.pagination.getPager(this.currentPage, data.size, data.totalPages);
    this.listDanhMucTinhHuyen = data.content;
    this.number = data.number ? data.number : 0;
  }
  setPage(number) {
    this.currentPage = number;
    if (this.isSearching) {
      this.getAll('search', this.searchName, true);
    } else {
      this.getAll('get');
    }
  }
  search(name) {
    if (name.trim() !== '') {
      this.currentPage = 0;
      this.searchName = name;
      this.getAll('search', name);
    } else {
      this.getAll('get');
    }
  }
  actionTinhTrang(task, id = '') {
    switch (task) {
      case 'edit':
        this.actionName = 'Cập nhật';
        break;
      case 'delete':
        this.actionName = 'Xóa';
        break;
      case 'add':
        this.actionName = 'Thêm';
        break;
    }
    this.title_model = this.actionName + ' danh mục tình trạng tài liệu';
    this.statusOption = task;
    this.modalAddDanhmucTinhtrangForm.reset();
    if (task !== 'add') {
      const cq = this.listDanhMucTinhHuyen.find(el => {
        return el.id === id;
      });
      this.modalAddDanhmucTinhtrangForm.patchValue({
        id: cq.id,
        tenTinhTrang: cq.tenTinhTrang,
        moTa: cq.moTa
      });
    }
    this.blur = false;
    this.modalDanhmucTinhTrang.show();
  }
  onSubmitAction(task) {
    const formValue = this.modalAddDanhmucTinhtrangForm.value;
    if (!formValue.tenTinhTrang) {
      this.blur = true;
    }
    if (formValue.tenTinhTrang.trim() !== '') {
      if (task === 'delete') {
        this.noiDmtinhtrangtailieuService.deleteAllDmTinhtrangtailieu(formValue.id)
          .subscribe(res => {
            this.getAll('delete');
          }, err => {
            this.alertService.error(err.title);
          });
      } else {
        const formBody: any = {};
        formBody.tenTinhTrang = formValue.tenTinhTrang.trim();
        formBody.moTa = formValue.moTa;
        formBody.tinhThanhId = null;
        if (task === 'add') {
          this.noiDmtinhtrangtailieuService.createAllDmTinhtrangtailieu(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        } else {
          formBody.id = formValue.id;
          this.noiDmtinhtrangtailieuService.updateAllDmTinhtrangtailieu(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        }
      }
      this.modalDanhmucTinhTrang.hide();
    }
  }
  onBlur() {
    this.blur = true;
  }
}
