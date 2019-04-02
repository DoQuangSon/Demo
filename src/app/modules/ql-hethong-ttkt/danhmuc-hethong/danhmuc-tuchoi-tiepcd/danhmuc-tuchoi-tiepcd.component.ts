import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { NoiLydotuchoitiepcdService } from '../../../../services/api/noi-lydotuchoitiepcds/noi-lydotuchoitiepcd.service';
import { PaginationService } from '../../../../services/helper/pagination.service';
import { AlertService } from '../../../../services/api/alert.service';

@Component({
  selector: 'ttkt-danhmuc-tuchoi-tiepcd',
  templateUrl: './danhmuc-tuchoi-tiepcd.component.html',
  styleUrls: ['./danhmuc-tuchoi-tiepcd.component.scss']
})
export class DanhmucTuchoiTiepcdComponent implements OnInit {

  @ViewChild('modalDanhmucLydo') modalDanhmucLydo: ModalDirective;
  danhmucCqBhxhForm: FormGroup;
  statusOption: any;
  title_model: any;
  modalAddDanhmucTinhtrangForm: FormGroup;
  listDanhMucLydo: any[] = [];
  listTructhuocs: any[] = [];
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
    private noiLydotuchoitiepcdService: NoiLydotuchoitiepcdService,
    private pagination: PaginationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getAll('get');
    this.danhmucCqBhxhForm = this.fb.group({
      noiDungLyDo: ['']
    });
    this.modalAddDanhmucTinhtrangForm = this.fb.group({
      id: [''],
      noiDungLyDo: ['', Validators.required],
    });
  }
  getAll(task: string, name = '', setPage: boolean = false) {
    if (task === 'get' || task === 'delete') {
      if (task === 'delete') {
        if (this.listDanhMucLydo.length === 1) {
          this.currentPage -= 1;
        }
      }
      this.noiLydotuchoitiepcdService.getAllLydotuchoitiepcds(this.currentPage, this.pageSize)
        .subscribe(res => {
          this.isSearching = false;
          this.processDataToShow(res);
        }, err => {
        });
    } else if (task === 'search') {
      this.noiLydotuchoitiepcdService.searchTuLydotuchoitiepcds(name, this.currentPage, this.pageSize)
        .subscribe(res => {
          this.isSearching = true;
          if (setPage) {
            this.danhmucCqBhxhForm.patchValue({
              noiDungLyDo: this.searchName
            });
          }
          this.processDataToShow(res);
        }, err => {
        });
    }
  }
  processDataToShow(data) {
    this.pager = this.pagination.getPager(this.currentPage, data.size, data.totalPages);
    this.listDanhMucLydo = data.content;
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
  actionTuChoi(task, id = '') {
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
    this.title_model = this.actionName + ' danh mục từ chối tiếp công dân';
    this.statusOption = task;
    this.modalAddDanhmucTinhtrangForm.reset();
    if (task !== 'add') {
      const cq = this.listDanhMucLydo.find(el => {
        return el.id === id;
      });
      this.modalAddDanhmucTinhtrangForm.patchValue({
        id: cq.id,
        noiDungLyDo: cq.noiDungLyDo,
      });
    }
    this.blur = false;
    this.modalDanhmucLydo.show();
  }
  onSubmitAction(task) {
    const formValue = this.modalAddDanhmucTinhtrangForm.value;
    if (!formValue.noiDungLyDo) {
      this.blur = true;
    }
    if (formValue.noiDungLyDo.trim() !== '') {
      if (task === 'delete') {
        this.noiLydotuchoitiepcdService.deleteLydotuchoitiepcds(formValue.id)
          .subscribe(res => {
            this.getAll('delete');
          }, err => {
          });
      } else {
        const formBody: any = {};
        formBody.noiDungLyDo = formValue.noiDungLyDo.trim();
        if (task === 'add') {
          this.noiLydotuchoitiepcdService.createLydotuchoitiepcds(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        } else {
          formBody.id = formValue.id;
          this.noiLydotuchoitiepcdService.updateLydotuchoitiepcds(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        }
      }
      this.modalDanhmucLydo.hide();
    }
  }
  onBlur() {
    this.blur = true;
  }
}
