import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { Pagging } from '../../../../shared/models/pagging.model';
import { NoiDmmaudonService } from '../../../../services/api/danh-muc/noi-dmmaudon/noi-dmmaudon.service';
@Component({
  selector: 'ttkt-danhmuc-maudon',
  templateUrl: './danhmuc-maudon.component.html',
  styleUrls: ['./danhmuc-maudon.component.scss']
})
export class DanhmucMaudonComponent implements OnInit {
  pagging: Pagging = new Pagging();
  @ViewChild('modalDanhmucMaudon') modalDanhmucMaudon: ModalDirective;
  danhmucCqBhxhForm: FormGroup;
  statusOption: any;
  title_model: any;
  modalAddDanhmucMaudonForm: FormGroup;
  listDanhMucMaudon: any[] = [];
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
    private noiDmmaudonService: NoiDmmaudonService,
  ) { }

  ngOnInit() {
    this.getAll('get');
    this.danhmucCqBhxhForm = this.fb.group({
      tenMau: ['']
    });
    this.modalAddDanhmucMaudonForm = this.fb.group({
      id: [''],
      tenMau: ['', Validators.required],
    });
  }
  getAll(task: string, name = '', setPage: boolean = false) {
    if (task === 'get' || task === 'delete') {
      if (task === 'delete') {
        if (this.listDanhMucMaudon.length === 1) {
          this.currentPage -= 1;
        }
      }
      this.noiDmmaudonService.getAllDmMaudon(this.currentPage, this.pageSize)
        .subscribe(res => {
          this.isSearching = false;
          this.listDanhMucMaudon = res['content'];
          this.pagging.totalItems = res.totalElements;
        }, err => {
        });
    } else if (task === 'search') {
      this.noiDmmaudonService.searchDmMaudon(name, this.currentPage, this.pageSize)
        .subscribe(res => {
          this.isSearching = true;
          if (setPage) {
            this.danhmucCqBhxhForm.patchValue({
              tenMau: this.searchName
            });
          }
          this.listDanhMucMaudon = res['content'];
          this.pagging.totalItems = res.totalElements;
        }, err => {
        });
    }
  }
 
  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
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
    this.title_model = this.actionName + ' danh mục mẫu đơn';
    this.statusOption = task;
    this.modalAddDanhmucMaudonForm.reset();
    if (task !== 'add') {
      const cq = this.listDanhMucMaudon.find(el => {
        return el.id === id;
      });
      this.modalAddDanhmucMaudonForm.patchValue({
        id: cq.id,
        tenMau: cq.tenMau,
      });
    }
    this.blur = false;
    this.modalDanhmucMaudon.show();
  }
  onSubmitAction(task) {
    const formValue = this.modalAddDanhmucMaudonForm.value;
    if (!formValue.tenMau) {
      this.blur = true;
    }
    if (formValue.tenMau.trim() !== '') {
      if (task === 'delete') {
        this.noiDmmaudonService.deleteDmMaudon(formValue.id)
          .subscribe(res => {
            this.getAll('delete');
          }, err => {
          });
      } else {
        const formBody: any = {};
        formBody.tenMau = formValue.tenMau.trim();
        if (task === 'add') {
          this.noiDmmaudonService.createDmMaudon(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        } else {
          formBody.id = formValue.id;
          this.noiDmmaudonService.updateDmMaudon(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        }
      }
      this.modalDanhmucMaudon.hide();
    }
  }
  onBlur() {
    this.blur = true;
  }
}
