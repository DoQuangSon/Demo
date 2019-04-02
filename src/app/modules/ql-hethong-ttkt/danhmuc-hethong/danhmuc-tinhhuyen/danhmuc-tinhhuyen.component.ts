import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoiDmTinhHuyenService } from '../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { Pagging } from '../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-danhmuc-tinhhuyen',
  templateUrl: './danhmuc-tinhhuyen.component.html',
  styleUrls: ['./danhmuc-tinhhuyen.component.scss']
})
export class DanhmucTinhhuyenComponent implements OnInit {
  pagging: Pagging = new Pagging();
  @ViewChild('modalDanhmucTinhhuyen') modalDanhmucTinhhuyen: ModalDirective;
  danhmucCqBhxhForm: FormGroup;
  statusOption: any;
  title_model: any;
  modalAddDanhmucTinhhuyenForm: FormGroup;
  listDanhMucTinhHuyen: any[] = [];
  currentPage: number = 0;
  pageSize: number = 30;
  pager: any = {};
  isSearching: boolean = false;
  actionName: string = '';
  searchObject = {
    tenTinhHuyen: '',
    maTinhHuyen: ''
  };
  blur = {
    maTinhHuyen: false,
    tenTinhHuyen: false
  };

  constructor(
    private fb: FormBuilder,
    private noiDmTinhHuyenService: NoiDmTinhHuyenService,
  ) { }

  ngOnInit() {
    this.getAll('get');
    this.danhmucCqBhxhForm = this.fb.group({
      maTinhHuyen: [''],
      tenTinhHuyen: ['']
    });
    this.modalAddDanhmucTinhhuyenForm = this.fb.group({
      id: [''],
      maTinhHuyen: [''],
      tenTinhHuyen: ['', Validators.required],
    });
  }
  getAll(task: string, search = { tenTinhHuyen: '', maTinhHuyen: '' }, setPage: boolean = false) {
    if (task === 'get' || task === 'delete') {
      if (task === 'delete') {
        if (this.listDanhMucTinhHuyen.length === 1) {
          this.currentPage -= 1;
        }
      }
      this.noiDmTinhHuyenService.getAllDmTinhHuyen(this.currentPage, this.pageSize)
        .subscribe(res => {
          this.isSearching = false;
          this.listDanhMucTinhHuyen = res['content'];
    this.pagging.totalItems = res.totalElements;
        }, err => {
        });
    } else if (task === 'search') {
      this.noiDmTinhHuyenService.searchDmTinhHuyen(search.tenTinhHuyen, search.maTinhHuyen, this.currentPage, this.pageSize)
        .subscribe(res => {
          this.isSearching = true;
          if (setPage) {
            this.danhmucCqBhxhForm.patchValue({
              maTinhHuyen: this.searchObject.maTinhHuyen,
              tenTinhHuyen: this.searchObject.tenTinhHuyen
            });
          }
          this.listDanhMucTinhHuyen = res['content'];
          this.pagging.totalItems = res.totalElements;
        }, err => {
        });
    }
  }
 
  setPage(number) {
    this.currentPage = number;
    if (this.isSearching) {
      this.getAll('search', this.searchObject, true);
    } else {
      this.getAll('get');
    }
  }
 
 pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    if (this.isSearching) {
      this.getAll('search', this.searchObject, true);
    } else {
      this.getAll('get');
    }
}
  search(maTinhHuyen, tenTinhHuyen) {
    if (maTinhHuyen.trim() !== '' || tenTinhHuyen.trim() !== '') {
      this.currentPage = 0;
      this.searchObject = {
        tenTinhHuyen: tenTinhHuyen,
        maTinhHuyen: maTinhHuyen
      };
      this.getAll('search', this.searchObject);
    } else {
      this.getAll('get');
    }
  }
  actionMauDon(task, id = '') {
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
    this.title_model = this.actionName + ' danh mục tỉnh huyên';
    this.statusOption = task;
    this.modalAddDanhmucTinhhuyenForm.reset();
    if (task !== 'add') {
      const cq = this.listDanhMucTinhHuyen.find(el => {
        return el.id === id;
      });
      this.modalAddDanhmucTinhhuyenForm.patchValue({
        id: cq.id,
        maTinhHuyen: cq.maTinhHuyen,
        tenTinhHuyen: cq.tenTinhHuyen
      });
    }
    this.blur.maTinhHuyen = false;
    this.blur.tenTinhHuyen = false;
    this.modalDanhmucTinhhuyen.show();
  }
  onSubmitAction(task) {
    const formValue = this.modalAddDanhmucTinhhuyenForm.value;
    if (formValue.maTinhHuyen.trim() !== '' && formValue.tenTinhHuyen.trim() !== '') {
      if (task === 'delete') {
        this.noiDmTinhHuyenService.deleteDmTinhHuyen(formValue.id)
          .subscribe(res => {
            this.getAll('delete');
          }, err => {
          });
      } else {
        const formBody: any = {};
        formBody.maTinhHuyen = formValue.maTinhHuyen.trim();
        formBody.tenTinhHuyen = formValue.tenTinhHuyen.trim();
        formBody.tinhThanhId = null;
        if (task === 'add') {
          this.noiDmTinhHuyenService.createDmTinhHuyen(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        } else {
          formBody.id = formValue.id;
          this.noiDmTinhHuyenService.updateDmTinhHuyen(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        }
      }
      this.modalDanhmucTinhhuyen.hide();
    }
  }
  onBlur(name) {
    if (name === 'maTinhHuyen') {
      this.blur.maTinhHuyen = true;
    } else if (name === 'tenTinhHuyen') {
      this.blur.tenTinhHuyen = true;
    }
  }
}
