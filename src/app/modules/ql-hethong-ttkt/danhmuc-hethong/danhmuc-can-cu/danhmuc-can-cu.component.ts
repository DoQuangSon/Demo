import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DmCanCuService } from '../../../../services/api/danh-muc/noi-dm-can-cu/dm-can-cu.service';
import { Pagging } from '../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-danhmuc-can-cu',
  templateUrl: './danhmuc-can-cu.component.html',
  styleUrls: ['./danhmuc-can-cu.component.scss']
})
export class DanhmucCanCuComponent implements OnInit {
  @ViewChild('modalDanhmucDonvi') modalDanhmucDonvi: ModalDirective;
  pagging: Pagging = new Pagging();
  statusOption: any;
  title_model: any;
  modalActionDMCanCuForm: FormGroup;
  listDanhMucCanCu: any[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  pager: any = {};
  actionName: string = '';
  blur: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private canCuService: DmCanCuService,
    
  ) { }

  ngOnInit() {
    this.getAll();
    this.modalActionDMCanCuForm = this.fb.group({
      id: [''],
      tenCanCu: ['', Validators.required],
      actived: ['']
    });
  }
  getAll(setPage: boolean = false) {
    this.canCuService.getDmCanCuTTKT(this.currentPage, this.pageSize)
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
      // case 'deactive':
      //   this.actionName = 'Deactive';
      //   break;
      case 'add':
        this.actionName = 'Thêm';
        break;
      // case 'active':
      //   this.actionName = 'Active';
      //   break;
    }
    this.title_model = this.actionName + ' danh mục căn cứ';
    this.statusOption = task;
    this.modalActionDMCanCuForm.reset();
    if (task !== 'add') {
      const cq = this.listDanhMucCanCu.find(el => {
        return el.id === id;
      });
      this.modalActionDMCanCuForm.patchValue({
        id: cq.id,
        tenCanCu: cq.tenCanCu,
        actived: cq.actived
      });
    }
    this.blur = false;
    this.modalDanhmucDonvi.show();
  }

  onSubmitAction(task) {
    const formValue = this.modalActionDMCanCuForm.value;
    if (!formValue.tenCanCu) {
      this.blur = true;
    }
    if (formValue.tenCanCu.trim() !== '') {
      // if (task === 'deactive') {
      //   this.canCuService.deactiveDmCanCu(formValue.id)
      //     .subscribe(res => {
      //       this.getAll();
      //     }, err => {
      //     });
      // } else if (task === 'active') {
      //   this.canCuService.activeDmCanCu(formValue.id)
      //     .subscribe(res => {
      //       this.getAll();
      //     }, err => {
      //     });
      // }

      if (task === 'delete') {
        this.canCuService.deleteDMCanCu(formValue.id)
          .subscribe(res => {
            this.getAll();
          }, err => {
          });
      } else {
        const formBody: any = {};
        formBody.tenCanCu = formValue.tenCanCu.trim();
        formBody.actived = formValue.actived;
        if (task === 'add') {
          formBody.actived = true;
          this.canCuService.createDmCanCu(formBody)
            .subscribe(res => {
              this.getAll();
            }, err => {
            });
        } else {
          formBody.id = formValue.id;
          this.canCuService.updateDmCanCu(formBody)
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
