import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoiLydokhongthulytcService } from '../../../../services/api/noi-lydokhongthulytc/noi-lydokhongthulytc.service';
import { Pagging } from '../../../../shared/models/pagging.model';
@Component({
  selector: 'ttkt-danhmuc-tuchoi-tiepcd',
  templateUrl: './danhmuc-lydo-khong-thuly-tc.component.html',
  styleUrls: ['./danhmuc-lydo-khong-thuly-tc.component.scss']
})
export class DanhmucLyDoKhongThuLyTcComponent implements OnInit {
  pagging: Pagging = new Pagging();
  @ViewChild('modalDanhmucLydo') modalDanhmucLydo: ModalDirective;
  danhMucLyDoForm: FormGroup;
  statusOption: any;
  title_model: any;
  modalAddDanhmucLyDoForm: FormGroup;
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
    private noiLydokhongthulytcService: NoiLydokhongthulytcService,
  ) { }

  ngOnInit() {
    this.getAll('get');
    this.danhMucLyDoForm = this.fb.group({
      tenLyDo: ['']
    });
    this.modalAddDanhmucLyDoForm = this.fb.group({
      id: [''],
      tenLyDo: ['', Validators.required],
    });
  }
  getAll(task: string, name = '', setPage: boolean = false) {
    if (task === 'get' || task === 'delete') {
      if (task === 'delete') {
        if (this.listDanhMucLydo.length === 1) {
          this.currentPage -= 1;
        }
      }
      this.noiLydokhongthulytcService.getAllLydoKhongthulytc(this.currentPage, this.pageSize)
        .subscribe(res => {
          this.isSearching = false;
          this.listDanhMucLydo = res['content'];
          this.pagging.totalItems = res.totalElements;
        }, err => {
        });
    } else if (task === 'search') {
      const bodyData: any = {};
      bodyData.tenLyDo = name;
      bodyData.page = this.currentPage;
      bodyData.size = this.pageSize;
      this.noiLydokhongthulytcService.searchLydoKhongthulytc(bodyData)
        .subscribe(res => {
          this.isSearching = true;
          if (setPage) {
            this.danhMucLyDoForm.patchValue({
              tenLyDo: this.searchName
            });
          }
          this.listDanhMucLydo = res['content'];
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
    this.title_model = this.actionName + ' danh mục chủ trì phối hợp';
    this.statusOption = task;
    this.modalAddDanhmucLyDoForm.reset();
    if (task !== 'add') {
      const cq = this.listDanhMucLydo.find(el => {
        return el.id === id;
      });
      this.modalAddDanhmucLyDoForm.patchValue({
        id: cq.id,
        tenLyDo: cq.tenLyDo,
      });
    }
    this.blur = false;
    this.modalDanhmucLydo.show();
  }
  onSubmitAction(task) {
    const formValue = this.modalAddDanhmucLyDoForm.value;
    if(!formValue.tenLyDo){
      this.blur = true
    }
    if (formValue.tenLyDo.trim() !== '') {
      if (task === 'delete') {
        this.noiLydokhongthulytcService.deleteLydoKhongthulytc(formValue.id)
          .subscribe(res => {
            this.getAll('delete');
          }, err => {
          });
      } else {
        const formBody: any = {};
        formBody.tenLyDo = formValue.tenLyDo.trim();
        if (task === 'add') {
          this.noiLydokhongthulytcService.createNewLydoKhongthulytc(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        } else {
          formBody.id = formValue.id;
          this.noiLydokhongthulytcService.updateLydoKhongthulytc(formBody)
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
