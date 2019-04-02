import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { Pagging } from '../../../../shared/models/pagging.model';
import { NoiDmNoiDungTtktService } from '../../../../services/api/danh-muc/noi-dmNoiDungTTKT/noi-dm-noi-dung-ttkt.service';
import { AlertService } from '../../../../services/api/alert.service';
import { DM_LOAIHINH_TTKT } from '../../../../constants/dm-noiDungTTKT.constants';
@Component({
  selector: 'ttkt-danhmuc-noidung-ttkt',
  templateUrl: './danhmuc-noidung-ttkt.component.html',
  styleUrls: ['./danhmuc-noidung-ttkt.component.scss']
})
export class DanhmucNoidungTtktComponent implements OnInit {
  @ViewChild('modalNoiDungTTKT') modalNoiDungTTKT: ModalDirective;
  @ViewChild('modalChiTietNDTTKT') modalChiTietNDTTKT: ModalDirective;
  @ViewChild('modalCRUDChiTietNDTTKT') modalCRUDChiTietNDTTKT: ModalDirective;
  @ViewChild('modalStatusChiTietNDTTKT') modalStatusChiTietNDTTKT: ModalDirective;
  pagging: Pagging = new Pagging();
  // common
  statusOption: any;
  title_model: any;
  actionName: string = '';
  loaiHinh: string = '';
  listLoaiHinh: any = DM_LOAIHINH_TTKT;
  currentdmNoiDungTTKTId: number;

  noiDungTTKTForm: FormGroup;
  listNoiDungTTKT: any = [];
  listLevel1NoiDungTTKT: Array<any> = [];
  listA: any = [];
  noiDungTTKTFormSubmited: boolean = false;
  pager: any = {};
  number: number = 0;

  chiTietNDTTKTForm: FormGroup;
  listChiTietNDTTKT: any = [];
  chiTietNDTTKTFormSubmited: boolean = false;
  pagerND: any = {};
  numberND: number = 0;

  constructor(
    private fb: FormBuilder,
    private noiDmNoiDungTtktService: NoiDmNoiDungTtktService,
    private _alert: AlertService
  ) { }

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 10;
    this.getAllNoiDungTTKT();
    this.noiDungTTKTForm = this.fb.group({
      id: [''],
      tenNoiDung: ['', Validators.required],
      tenLoaiHinh: ['', Validators.required],
      moTa: ['', Validators.maxLength(255)],
      parentId: [''],
      isCskcb: ['']
    });
    this.chiTietNDTTKTForm = this.fb.group({
      id: [''],
      tenChiTietNoiDung: ['', Validators.required]
    });
  }

  checkLevel(idFake) {
    idFake = idFake.toString();
    const capDo = idFake.split(".").length;
    return capDo;
  }


  getAllNoiDungTTKT(setPage: boolean = false) {
    // get all, no - paging
    this.noiDmNoiDungTtktService.getDmNoiDungTTKT(0, 1000)
      .subscribe(res => {
        //@Todo: Refactor map level
        this.listLevel1NoiDungTTKT = res.content.filter(req => !req.parentId);
        this.listNoiDungTTKT = res.content; // server map
        // .filter(req => !req.parentId)
        //   .map(item => {
        //     item.child = res.content.filter(req => req.parentId == item.id)
        //         .map(item2 => {
        //           item2.child = res.content.filter(req => req.parentId == item2.id);
        //           return item2;
        //         });
        //   return item;
        // });

        console.log(this.listNoiDungTTKT);
        this.pagging.totalItems = res.totalElements;

        // let i=1;
        // this.listNoiDungTTKT.forEach(item=>{

        //   this.listA.push({'id': i, 'item': item});
          
        //   let j=1;

        //   item.children.forEach(item2=>{
        //     this.listA.push({'id': i+'.'+j, 'item': item2});
            
        //     let k=1;
        //     item2.children.forEach(item3=>{
        //       this.listA.push({'id': i+'.'+j+'.'+k, 'item': item3});
        //       k++;
        //     });

        //     j++;
        //   });
        //   i++;
        // });
        // debugger;
      }, err => {
      });
  }


  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.getAllNoiDungTTKT();
  }


  getChiTietNDByDm(dmNoiDungTTKTId: number, setPageChiTietND: boolean = false) {
    this.currentdmNoiDungTTKTId = dmNoiDungTTKTId;
    this.noiDmNoiDungTtktService.getChiTietNDByDmPhanLoai(this.currentdmNoiDungTTKTId, this.pagging.currentPage, this.pagging.itemsPerPage)
      .subscribe(res => {
        this.listChiTietNDTTKT = res['content'];
        this.pagging.totalItems = res.totalElements;
      }, err => {
      });
  }
  pageChangedChiTietND(event) {
    this.pagging.currentPage = event.page - 1;
    this.getChiTietNDByDm(this.currentdmNoiDungTTKTId);
  }


  // Action DmNoiDungTTKT
  actionDmNoiDungTTKT(task, dm?:any) {
    switch (task) {
      case 'edit':
        this.actionName = 'Cập nhật';
        break;
      case 'delete':
        this.actionName = 'Xóa';
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
    this.title_model = this.actionName + ' phân loại tiêu thức';
    this.statusOption = task;
    this.noiDungTTKTForm.reset();
    this.noiDungTTKTFormSubmited = false;
    if (task !== 'add') {
      
      this.noiDungTTKTForm.patchValue({
        id: dm.id,
        tenNoiDung: dm.tenNoiDung,
        actived: dm.actived,
        tenLoaiHinh: dm.loaiHinh,
        moTa: dm.moTa,
        parentId: dm.parentId,
        isCskcb: dm.isCskcb
      });
    }
    this.modalNoiDungTTKT.show();
  }

  onSubmitActionDmNoiDungTTKT(task) {
    const formValue = this.noiDungTTKTForm.value;
    this.noiDungTTKTForm.updateValueAndValidity();
    if (!this.noiDungTTKTForm.valid) {
      this.noiDungTTKTFormSubmited = true;
      return;
    }
    if (formValue.tenNoiDung.trim() !== '') {
      if (task === 'deactive') {
        this.noiDmNoiDungTtktService.deactiveDmNoiDungTTKT(formValue.id)
          .subscribe(res => {
            this.getAllNoiDungTTKT();
          }, err => {
          });
      } else if (task === 'active') {
        this.noiDmNoiDungTtktService.activeDmNoiDungTTKT(formValue.id)
          .subscribe(res => {
            this.getAllNoiDungTTKT();
          }, err => {
          });
        this.getAllNoiDungTTKT();
      } else {
        const formBody: any = {};
        formBody.tenNoiDung = formValue.tenNoiDung.trim();
        formBody.moTa = formValue.moTa;
        formBody.actived = formValue.actived;
        // tslint:disable-next-line:triple-equals
        // if (formValue.tenLoaiHinh == 1) {
        //   formBody.isNoiDungThanhTra = true;
        // } else {
        //   formBody.isNoiDungThanhTra = false;
        // }
        
        formBody.parentId = formValue.parentId;
        formBody.loaiHinh = formValue.tenLoaiHinh;
        formBody.isCskcb = formValue.isCskcb;
        if (task === 'add') {
          formBody.actived = true;
          this.noiDmNoiDungTtktService.creatDmNoiDungTTKT(formBody)
            .subscribe(res => {
              this._alert.success('Thêm thành công!', { delay: 1000 });
              this.getAllNoiDungTTKT();
            }, err => {
            });
        } else if (task === 'delete') {
          formBody.actived = true;
          this.noiDmNoiDungTtktService.deleteDmNoiDungTTKT(formValue.id)
            .subscribe(res => {
              this._alert.success('Xóa thành công!', { delay: 1000 });
              this.pagging.currentPage = 0;
              this.getAllNoiDungTTKT();

            }, err => {
            });
        } else {
          formBody.actived = true;
          formBody.id = formValue.id;
          this.noiDmNoiDungTtktService.updateDmNoiDungTTKT(formBody)
            .subscribe(res => {
              this._alert.success('Cập nhật thành công!', { delay: 1000 });
              this.getAllNoiDungTTKT();
            }, err => {
            });
        }
      }
      this.modalNoiDungTTKT.hide();
    }
  }

  // Action ChiTietNoiDung
  showChiTietNDTTKT(idFake, idReal) {
    idFake = idFake.toString();
    let n = idFake.length;
    let isShow = true;

    for(let i=0;i<this.listA.length;i++) {
      const str = this.listA[i].id.toString().substring(0, n);
      if (this.listA[i].id.toString().length > n && str.toString() === idFake ) {
        isShow = false;
        break;
      }
    }

    if(isShow) {
      this.modalChiTietNDTTKT.show();
      this.getChiTietNDByDm(idReal);
    }
  }

  actionChiTietNoiDung(task, id = '') {
    switch (task) {
      case 'edit':
        this.actionName = 'Cập nhật';
        break;
      case 'delete':
        this.actionName = 'Xóa';
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
    this.title_model = this.actionName + ' chi tiết nội dung TTKT';
    this.statusOption = task;
    this.chiTietNDTTKTForm.reset();
    this.chiTietNDTTKTFormSubmited = false;
    if (task !== 'add') {
      const tenTT = this.listChiTietNDTTKT.find(el => {
        return el.id === id;
      });
      this.chiTietNDTTKTForm.patchValue({
        id: tenTT.id,
        tenChiTietNoiDung: tenTT.tenChiTietNoiDung,
        actived: tenTT.actived
      });
    }
    this.modalCRUDChiTietNDTTKT.show();
    this.modalChiTietNDTTKT.hide();
  }

  onSubmitActionChiTietNoiDung(task) {
    const formValue = this.chiTietNDTTKTForm.value;
    this.chiTietNDTTKTForm.updateValueAndValidity();
    if (!this.chiTietNDTTKTForm.valid) {
      this.chiTietNDTTKTFormSubmited = true;
      return;
    }
    if (formValue.tenChiTietNoiDung.trim() !== '') {
      if (task === 'deactive') {
        this.noiDmNoiDungTtktService.deactiveChiTietNDOfDmPhanLoai(formValue.id)
          .subscribe(res => {
            this.getChiTietNDByDm(this.currentdmNoiDungTTKTId);
          }, err => {
          });
      } else if (task === 'active') {
        this.noiDmNoiDungTtktService.activeChiTietNDOfDmPhanLoai(formValue.id)
          .subscribe(res => {
            this.getChiTietNDByDm(this.currentdmNoiDungTTKTId);
          }, err => {
          });
        this.getChiTietNDByDm(this.currentdmNoiDungTTKTId);
      } else {
        const formBody: any = {};
        formBody.tenChiTietNoiDung = formValue.tenChiTietNoiDung.trim();
        formBody.actived = formValue.actived;
        formBody.dmNoiDungTTKTId = this.currentdmNoiDungTTKTId;
        if (task === 'add') {
          formBody.actived = true;
          this.noiDmNoiDungTtktService.creatChiTietNDOfDmPhanLoai(formBody)
            .subscribe(res => {
              this.getChiTietNDByDm(this.currentdmNoiDungTTKTId);
            }, err => {
            });
        } else if (task === 'delete') {
          formBody.actived = true;
          formBody.id = formValue.id;
          this.noiDmNoiDungTtktService.deleteChiTietNDOfDmPhanLoai(formBody.id)
            .subscribe(res => {
              this.getChiTietNDByDm(this.currentdmNoiDungTTKTId);
            }, err => {
            });
        } else {
          formBody.actived = true;
          formBody.id = formValue.id;
          this.noiDmNoiDungTtktService.updateChiTietNDOfDmPhanLoai(formBody)
            .subscribe(res => {
              this.getChiTietNDByDm(this.currentdmNoiDungTTKTId);
            }, err => {
            });
        }
      }
      this.modalCRUDChiTietNDTTKT.hide();
      this.modalChiTietNDTTKT.show();
    }
  }

  closeCRUDChiTietNDTTKT() {
    this.modalChiTietNDTTKT.show();
    this.modalCRUDChiTietNDTTKT.hide();
  }

  // modalStatus
  showStatusChiTietNDTTKT() {
    this.modalStatusChiTietNDTTKT.show();
    this.modalChiTietNDTTKT.hide();
  }

  closeStatusChiTietNDTTKT() {
    this.modalChiTietNDTTKT.show();
    this.modalStatusChiTietNDTTKT.hide();
  }

  onSubmitStatus() {

  }

}
