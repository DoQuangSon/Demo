import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DmHanhviService } from '../../../../services/api/danh-muc/noi-dmHanhVi/dm-hanhvi.service';
import { Pagging } from '../../../../shared/models/pagging.model';
@Component({
  selector: 'ttkt-danhmuc-hanhvi',
  templateUrl: './danhmuc-hanhvi.component.html',
  styleUrls: ['./danhmuc-hanhvi.component.scss']
})
export class DanhmucHanhviComponent implements OnInit {
  pagging: Pagging = new Pagging();
  @ViewChild('modalDanhmucDonvi') modalDanhmucDonvi: ModalDirective;
  statusOption: any;
  title_model: any;
  modalActionDMCanCuForm: FormGroup;
  listDanhMucCanCu: any[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  pager: any = {};
  actionName: string = '';
  blur: boolean = false;
  blurVB: boolean = false;
  number: number = 0;

  constructor(
    private fb: FormBuilder,
    private DmHanhviService: DmHanhviService,
  ) { }

  ngOnInit() {
    this.getAll();
    this.modalActionDMCanCuForm = this.fb.group({
      id: [''],
      tenHanhVi: ['', Validators.required],
      vanBanQuyDinh: ['', Validators.required],
    });
  }
  getAll(setPage: boolean = false) {
    this.DmHanhviService.getAllHanhVi(this.currentPage, this.pageSize)
      .subscribe(res => {
        this.listDanhMucCanCu = res['content'];
        this.pagging.totalItems = res.totalElements;
      }, err => {
      });
  }
  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.getAll();
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
    this.title_model = this.actionName + ' danh mục hành vi';
    this.statusOption = task;
    this.modalActionDMCanCuForm.reset();
    if (task !== 'add') {
      const cq = this.listDanhMucCanCu.find(el => {
        return el.id === id;
      });
      this.modalActionDMCanCuForm.patchValue({
        id: cq.id,
        tenHanhVi: cq.tenHanhVi,
        vanBanQuyDinh: cq.vanBanQuyDinh
      });
    }
    this.blur = false;
    this.blurVB = false;
    this.modalDanhmucDonvi.show();
  }

  onSubmitAction(task) {
    const formValue = this.modalActionDMCanCuForm.value;
    if (!formValue.tenHanhVi || formValue.tenHanhVi.trim() == '') {
      this.blur = true;
      return;
    }

    if (!formValue.vanBanQuyDinh || formValue.vanBanQuyDinh.trim() == '') {
      this.blurVB = true;
      return;
    }

    if (formValue.tenHanhVi.trim() !== null && formValue.vanBanQuyDinh.trim() !== null) {

      if (task === 'delete') {
        this.DmHanhviService.deleteDMHanhVi(formValue.id)
          .subscribe(res => {
            this.getAll();
          }, err => {
          });
      } else {
        const formBody: any = {};
        formBody.tenHanhVi = formValue.tenHanhVi.trim();
        formBody.vanBanQuyDinh = formValue.vanBanQuyDinh.trim();
       
        if (task === 'add') {
          formBody.actived = true;
          this.DmHanhviService.createDMHanhVi(formBody)
            .subscribe(res => {
              this.getAll();
            }, err => {
            });
        } else {
          formBody.id = formValue.id;
          this.DmHanhviService.updateDMPHanhVi(formBody)
            .subscribe(res => {
              this.getAll();
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
  onBlurVB() {
    this.blurVB = true;
  }

}
