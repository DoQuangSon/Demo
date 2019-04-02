
import { Component, OnInit, ViewChild,NgModule } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DmVbCancuXuphatService } from '../../../../services/api/danh-muc/noi-dmVBCanCuXuPhat/dm-vb-cancu-xuphat.service';
import { PaginationService } from '../../../../services/helper/pagination.service';

@Component({
  selector: 'ttkt-danhmuc-vb-cancu-xuphat',
  templateUrl: './danhmuc-vb-cancu-xuphat.component.html',
  styleUrls: ['./danhmuc-vb-cancu-xuphat.component.scss']
})
export class DanhmucVbCancuXuphatComponent implements OnInit {

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
    private DmVbCancuXuphatService: DmVbCancuXuphatService,
    private pagination: PaginationService
  ) { }

  ngOnInit() {
    this.getAll();
    this.modalActionDMCanCuForm = this.fb.group({
      id: [''],
      tenCanCu: ['', Validators.required],
      tenQuyetDinhXuPhat: ['', Validators.required],
    });
  }
  getAll(setPage: boolean = false) {
    this.DmVbCancuXuphatService.getAllVBCanCuXuPhat(this.currentPage, this.pageSize)
      .subscribe(res => {
        this.processDataToShow(res);
      }, err => {
      });
  }
  processDataToShow(data) {
    this.pager = this.pagination.getPager(this.currentPage, data.size, data.totalPages);
    this.listDanhMucCanCu = data.content;
    this.number = data.number ? data.number : 0;
  }
  setPage(number) {
    this.currentPage = number;
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
    this.title_model = this.actionName + ' danh mục văn bản căn cứ xử phạt';
    this.statusOption = task;
    this.modalActionDMCanCuForm.reset();
    if (task !== 'add') {
      const cq = this.listDanhMucCanCu.find(el => {
        return el.id === id;
      });
      this.modalActionDMCanCuForm.patchValue({
        id: cq.id,
        tenCanCu: cq.tenCanCu,
        tenQuyetDinhXuPhat: cq.tenQuyetDinhXuPhat
      });
    }
    this.blur = false;
    this.blurVB = false;
    this.modalDanhmucDonvi.show();
  }

  onSubmitAction(task) {
    const formValue = this.modalActionDMCanCuForm.value;
    if (!formValue.tenCanCu || formValue.tenCanCu.trim() == '') {
      this.blur = true;
      return;
    }

    if (!formValue.tenQuyetDinhXuPhat || formValue.tenQuyetDinhXuPhat.trim() == '') {
      this.blurVB = true;
      return;
    }

    if (formValue.tenCanCu.trim() !== null && formValue.tenQuyetDinhXuPhat.trim() !== null) {

      if (task === 'delete') {
        this.DmVbCancuXuphatService.deleteDMVBCanCuXuPhat(formValue.id)
          .subscribe(res => {
            this.getAll();
          }, err => {
          });
      } else {
        const formBody: any = {};
        formBody.tenCanCu = formValue.tenCanCu.trim();
        formBody.tenQuyetDinhXuPhat = formValue.tenQuyetDinhXuPhat.trim();
       
        if (task === 'add') {
          formBody.actived = true;
          this.DmVbCancuXuphatService.createDMVBCanCuXuPhat(formBody)
            .subscribe(res => {
              this.getAll();
            }, err => {
            });
        } else {
          formBody.id = formValue.id;
          this.DmVbCancuXuphatService.updateDMVBCanCuXuPhat(formBody)
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
