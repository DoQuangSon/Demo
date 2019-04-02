import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pagging } from '../../../../shared/models/pagging.model';
import { PhanLoaiDtService } from '../../../../services/api/danh-muc/noi-dmPhanLoaiDt/phan-loai-dt.service';
@Component({
  selector: 'ttkt-danhmuc-phanloai-dt',
  templateUrl: './danhmuc-phanloai-dt.component.html',
  styleUrls: ['./danhmuc-phanloai-dt.component.scss']
})
export class DanhmucPhanloaiDtComponent implements OnInit {
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
  number: number = 0;

  constructor(
    private fb: FormBuilder,
    private phanLoaiDtService: PhanLoaiDtService,
  ) { }

  ngOnInit() {
    this.modalActionDMCanCuForm = this.fb.group({
      id: [''],
      tenDanhMuc: ['', Validators.required],
      actived: ['']
    });
    this.getAll();
  }
  getAll(setPage: boolean = false) {
    this.phanLoaiDtService.getListPhanLoaiDt(this.currentPage, this.pageSize)
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
      case 'deactive':
        this.actionName = 'Deactive';
        break;
      case 'add':
        this.actionName = 'Thêm';
        break;
      case 'active':
        this.actionName = 'Active';
        break;
    }
    this.title_model = this.actionName + ' danh mục phân loại đối tượng';
    this.statusOption = task;
    this.modalActionDMCanCuForm.reset();
    if (task !== 'add') {
      const cq = this.listDanhMucCanCu.find(el => {
        return el.id === id;
      });
      this.modalActionDMCanCuForm.patchValue({
        id: cq.id,
        tenDanhMuc: cq.tenDanhMuc,
        actived: cq.actived
      });
    }
    this.blur = false;
    this.modalDanhmucDonvi.show();
  }
  onSubmitAction(task) {
    const formValue = this.modalActionDMCanCuForm.value;
    if (formValue.tenDanhMuc.trim() !== '') {
      if (task === 'deactive') {
        this.phanLoaiDtService.deactivePhanLoaiDt(formValue.id)
          .subscribe(res => {
            this.getAll();
          }, err => {
          });
      } else if (task === 'active') {
        // something...
        this.getAll();
      } else {
        const formBody: any = {};
        formBody.tenDanhMuc = formValue.tenDanhMuc.trim();
        formBody.actived = formValue.actived;
        if (task === 'add') {
          formBody.actived = true;
          this.phanLoaiDtService.createPhanLoaiDt(formBody)
            .subscribe(res => {
              this.getAll();
            }, err => {
            });
        } else {
          formBody.id = formValue.id;
          this.phanLoaiDtService.updatePhanLoaiDt(formBody)
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
}
