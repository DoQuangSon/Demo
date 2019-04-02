import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { NoiDmChutriPhoiHopService } from '../../../../services/api/danh-muc/noi-dmChutriPhoihop/noi-dm-chutri-phoi-hop.service';
import { Pagging } from '../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-danhmuc-chutri-phoihop',
  templateUrl: './danhmuc-chutri-phoihop.component.html',
  styleUrls: ['./danhmuc-chutri-phoihop.component.scss']
})
export class DanhmucChutriPhoihopComponent implements OnInit {
  pagging: Pagging = new Pagging();
  @ViewChild('modalDanhmucDonvi') modalDanhmucDonvi: ModalDirective;
  danhmucDvCtriPHopForm: FormGroup;
  statusOption: any;
  title_model: any;
  modalAddDanhmucNoiDungForm: FormGroup;
  listDanhMucChuTriPhoiHop: any[] = [];
  isSearching: boolean = false;
  actionName: string = '';
  searchName: string = '';
  blur: boolean = false;
  number: number = 0;

  constructor(
    private fb: FormBuilder,
    private noiDmChutriPhoiHopService: NoiDmChutriPhoiHopService
  
  ) { }

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 10;

    this.getAll('get');
    this.danhmucDvCtriPHopForm = this.fb.group({
      tenDonViChuTriPhoiHop: ['']
    });
    this.modalAddDanhmucNoiDungForm = this.fb.group({
      id: [''],
      tenDonViChuTriPhoiHop: ['', Validators.required],
    });
  }
  getAll(task: string, name = '', setPage: boolean = false) {
    if (task === 'get' || task === 'delete') {
      if (task === 'delete') {
        if (this.listDanhMucChuTriPhoiHop.length === 1) {
          this.pagging.currentPage -= 1;
        }
      }
      this.noiDmChutriPhoiHopService.getAllDmChutriPhoihopByType(this.pagging.currentPage, this.pagging.itemsPerPage)
        .subscribe(res => {
          this.isSearching = false;
          this.listDanhMucChuTriPhoiHop = res['content'];
          this.pagging.totalItems = res.totalElements;
        }, err => {
        });
    } else if (task === 'search') {
      this.noiDmChutriPhoiHopService.searchAllDmChutriPhoihop(name, this.pagging.currentPage, this.pagging.itemsPerPage)
        .subscribe(res => {
          this.isSearching = true;
          if (setPage) {
            this.danhmucDvCtriPHopForm.patchValue({
              tenDonViChuTriPhoiHop: this.searchName
            });
          }
          this.listDanhMucChuTriPhoiHop = res['content'];
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
      this.pagging.currentPage = 0;
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
    this.modalAddDanhmucNoiDungForm.reset();
    if (task !== 'add') {
      const cq = this.listDanhMucChuTriPhoiHop.find(el => {
        return el.id === id;
      });
      this.modalAddDanhmucNoiDungForm.patchValue({
        id: cq.id,
        tenDonViChuTriPhoiHop: cq.tenDonViChuTriPhoiHop,
      });
    }
    this.blur = false;
    this.modalDanhmucDonvi.show();
  }
  onSubmitAction(task) {
    const formValue = this.modalAddDanhmucNoiDungForm.value;
    if (!formValue.tenDonViChuTriPhoiHop) {
      this.blur = true;
    }
    if (formValue.tenDonViChuTriPhoiHop.trim() !== '') {
      if (task === 'delete') {
        this.noiDmChutriPhoiHopService.deleteDmChutriPhoihop(formValue.id)
          .subscribe(res => {
            this.getAll('delete');
          }, err => {
          });
      } else {
        const formBody: any = {};
        formBody.tenDonViChuTriPhoiHop = formValue.tenDonViChuTriPhoiHop.trim();
        if (task === 'add') {
          this.noiDmChutriPhoiHopService.createDmChutriPhoihop(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        } else {
          formBody.id = formValue.id;
          this.noiDmChutriPhoiHopService.updateDmChutriPhoihop(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        }
      }
      this.modalDanhmucDonvi.hide();
    }
  }
  onBlur() {
    this.blur = true;
  }
}
