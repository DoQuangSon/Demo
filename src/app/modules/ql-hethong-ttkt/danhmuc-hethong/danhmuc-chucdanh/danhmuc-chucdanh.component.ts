import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoiDmChucDanhService } from '../../../../services/api/danh-muc/noi-dmChucDanh/noi-dm-chucdanh.service';
import { NoiAccountService } from '../../../../services/api/noi-account/noi-account.service';
import { StatesService } from '../../../../services/api/state.service';
import { Pagging } from '../../../../shared/models/pagging.model';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'ttkt-danhmuc-chucdanh',
  templateUrl: './danhmuc-chucdanh.component.html',
  styleUrls: ['./danhmuc-chucdanh.component.scss']
})
export class DanhmucChucdanhComponent implements OnInit {
  pagging: Pagging = new Pagging();
  @ViewChild('modalDanhmucChucdanh') modalDanhmucChucdanh: ModalDirective;
  danhMucChucDanhForm: FormGroup;
  statusOption: any;
  title_model: any;
  modalAddDanhmucChucdanhForm: FormGroup;
  listDanhMucChucDanh: any[] = [];
  dmBHXHId: any;
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
    private noiDmChucDanhService: NoiDmChucDanhService,
    private noiAccountService: NoiAccountService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.danhMucChucDanhForm = this.fb.group({
      chucDanh: ['']
    });
    this.modalAddDanhmucChucdanhForm = this.fb.group({
      id: [''],
      dmbhxh: [''],
      chucDanh: ['', Validators.required],
    });
    this.dmBHXHId = this.auth.currentUser.donViId;
    this.getAll('get');
  }

  getAll(task: string, name = '', setPage: boolean = false) {
    if (this.dmBHXHId) {
      if (task === 'get' || task === 'delete') {
        if (task === 'delete') {
          if (this.listDanhMucChucDanh.length === 1) {
            this.pagging.currentPage -= 1;
          }
        }
        this.noiDmChucDanhService.getAllDmChucDanh(this.pagging.currentPage - 1, this.pageSize, this.dmBHXHId)
          .subscribe(res => {
            this.isSearching = false;
            this.listDanhMucChucDanh = res['content'];
            this.pagging.totalItems = res.totalElements;
            this.pagging.itemsPerPage = this.pageSize;
          }, err => {
          });
      } else if (task === 'search') {
        const bodyData: any = {};
        bodyData.dMBHXHId = this.dmBHXHId;
        bodyData.page = this.currentPage;
        bodyData.size = this.pageSize;
        bodyData.tenChucDanh = name;
        this.noiDmChucDanhService.searchDmChucDanh(bodyData)
          .subscribe(res => {
            this.isSearching = true;
            if (setPage) {
              this.danhMucChucDanhForm.patchValue({
                chucDanh: this.searchName
              });
            }
            this.listDanhMucChucDanh = res['content'];
            this.pagging.totalItems = res.totalElements;
            this.pagging.itemsPerPage = this.pageSize;
          }, err => {
          });
      }
    }
  }
  

  pageChanged(event) {
    this.pagging.currentPage = event.page;
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
  action(task, id = '') {
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
    this.title_model = this.actionName + ' danh mục chức danh';
    this.statusOption = task;
    this.modalAddDanhmucChucdanhForm.reset();
    if (task !== 'add') {
      const cq = this.listDanhMucChucDanh.find(el => {
        return el.id === id;
      });
      this.modalAddDanhmucChucdanhForm.patchValue({
        id: cq.id,
        chucDanh: cq.chucDanh,
        dmbhxh: { id: this.dmBHXHId }
      });
    }
    this.blur = false;
    this.modalDanhmucChucdanh.show();
  }
  onSubmitAction(task) {
    const formValue = this.modalAddDanhmucChucdanhForm.value;
    if (!formValue.chucdanh) {
      this.blur = true;
    }
    if (formValue.chucDanh.trim() !== '') {
      if (task === 'delete') {
        this.noiDmChucDanhService.deleteDmChucDanh(formValue.id)
          .subscribe(res => {
            this.getAll('delete');
          }, err => {
          });
      } else {
        const formBody: any = {};
        formBody.chucDanh = formValue.chucDanh.trim();
        formBody.dmbhxh = { id: this.dmBHXHId };
        if (task === 'add') {
          this.noiDmChucDanhService.createNewDmChucDanh(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        } else {
          formBody.id = formValue.id;
          this.noiDmChucDanhService.updateDmChucDanh(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        }
      }
      this.modalDanhmucChucdanh.hide();
    }
  }
  onBlur() {
    this.blur = true;
  }
}
