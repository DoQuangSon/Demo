import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NoiDmPhanLoaiTieuThucService } from '../../../../services/api/danh-muc/noi-dmPhanLoaiTieuThuc/noi-dm-phan-loai-tieu-thuc.service';
import { AlertService } from '../../../../services/api/alert.service';
import { FormService } from '../../../../shared/form-module/form.service';
import { convertToRomanNumber } from '../../../../services/api/utils/utils.service';
import { Pagging } from '../../../../shared/models/pagging.model';
import { DmCanCuService } from '../../../../services/api/danh-muc/noi-dm-can-cu/dm-can-cu.service';
import { NoiDmNoiDungTtktService } from '../../../../services/api/danh-muc/noi-dmNoiDungTTKT/noi-dm-noi-dung-ttkt.service';
import { TieuChiTTKTService } from '../../../../services/api/danh-muc/tieu-chi-ttkt/tieu-chi-ttkt.service';
import { LOAIHINH_TKKT } from '../../../../constants/status.constants';

@Component({
  selector: 'ttkt-danhmuc-phanloai-tieuthuc',
  templateUrl: './danhmuc-phanloai-tieuthuc.component.html',
  styleUrls: ['./danhmuc-phanloai-tieuthuc.component.scss']
})
export class DanhmucPhanloaiTieuthucComponent implements OnInit {
  @ViewChild('modalTieuThuc') modalTieuThuc: ModalDirective;
  @ViewChild('modalChiTietTieuThuc') modalChiTietTieuThuc: ModalDirective;
  @ViewChild('modalCRUDChiTietTieuThuc') modalCRUDChiTietTieuThuc: ModalDirective;
  @ViewChild('modalStatusChiTietTieuThuc') modalStatusChiTietTieuThuc: ModalDirective;
  pagging: Pagging = new Pagging();
  paggingTT: Pagging = new Pagging();
  // common
  statusOption: any;
  title_model: any;
  actionName: string = '';
  currentdmTieuThucId: number;

  // dmPhanLoaiTieuThuc
  tieuThucForm: FormGroup;
  listDmTieuThuc: any = [];
  listDmTieuThucMapping: Array<any> = [];
  tieuThucFormSubmited: boolean = false;
  currentPage: number = 0;
  pageSize: number = 10;
  pager: any = {};
  number: number = 0;
  //them option cho donvi
  tenDonVi: any = [
    { id: 1, name: 'Người/Tiền' },
    { id: 2, name: '(VNĐ)/Lượt' }
  ];

  // tenChiTietTTByDmPhanLoai
  chiTietTieuThucForm: FormGroup;
  listChiTietTieuThuc: any = [];
  chiTietTieuThucFormSubmited: boolean = false;
  currentPageTT: number = 0;
  pageSizeTT: number = 10;
  pagerTT: any = {};
  numberTT: number = 0;

  listNoiDungTT: Array<any> = [];
  listTieuChiTTKT: Array<any> = [];

  get listDmTieuThucOptions() {
    return this.listDmTieuThuc.filter(req => req.id != this.tieuThucForm.value.id);
  }
  
  constructor(
    private fb: FormBuilder,
    private noiDmPhanLoaiTieuThucService: NoiDmPhanLoaiTieuThucService,
    public _alert: AlertService,
    private formService: FormService,
    private noiDungTTKTService: NoiDmNoiDungTtktService,
    private tieuChiTTKT: TieuChiTTKTService
  ) { }

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.paggingTT.currentPage = 0;
    this.paggingTT.itemsPerPage = 10;

    this.getAllDmPhanLoaiTT();
    this.tieuChiTTKT.getAll(0, 1000).subscribe(res => {
      this.listTieuChiTTKT = res.map(res => {
        return {
          value: res.id,
          text: res.tenTieuChi
        }
      });
    });
    
    this.tieuThucForm = this.fb.group({
      id: [''],
      tenPhanLoai: ['', Validators.required],
      moTa: ['', [Validators.required,Validators.maxLength(255)]],
      actived: [''],
      parentId: ['']
    });
    this.chiTietTieuThucForm = this.fb.group({
      id: [''],
      tenTieuThuc: ['', Validators.required],
      dmChiTietND: [''],
      tieuChiTTKT: [''],
      actived: ['']
    });

    this.noiDungTTKTService.getAllChiTietND(0, 1000).subscribe(res => {
      this.listNoiDungTT = res.content.map(res => {
        res.tenChiTietNoiDung = res.tenChiTietNoiDung + ' - ' + ((res.loaiHinh == LOAIHINH_TKKT.STATUS_LOAI_HINH_THANH_TRA) ? 'Thanh Tra' : 'Kiểm Tra');
        return res;
      }); // NDTT include KT
    }, err => { });
  }

  getAllDmPhanLoaiTT(setPage: boolean = false) {
    //@Todo: Tree no paging
    console.log('get all');
    this.noiDmPhanLoaiTieuThucService.getDmPhanLoaiTT(this.pagging.currentPage, 100)//this.pageSize)
      .subscribe(res => {
        
        this.listDmTieuThuc = res['content'];
        this.pagging.totalItems = res.totalElements;

        this.listDmTieuThucMapping = res.content.filter(req => !req.parentId && req.id !== 5); //ẩn thêm Các biện pháp xử lý vi phạm
        
        this.listDmTieuThucMapping = this.listDmTieuThucMapping.map(item => {
          item.child = res.content.filter(req => req.parentId == item.id);

      return item;
      })
      }, err => {
      });
  }
 
  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.getAllDmPhanLoaiTT();
    }

  getChiTietTTByDm(dmPhanLoaiTieuThucId: number, pageChangedChiTietTT: boolean = false) {
    this.currentdmTieuThucId = dmPhanLoaiTieuThucId;
    this.noiDmPhanLoaiTieuThucService.getChiTietTTByDmPhanLoai(this.currentdmTieuThucId, this.paggingTT.currentPage, this.paggingTT.itemsPerPage)
      .subscribe(res => {
        this.listChiTietTieuThuc = res['content'].filter(el => el.id !== 99998); //ẩn fake data
        this.paggingTT.totalItems = res.totalElements;
      }, err => {
      });
  }
  
 pageChangedChiTietTT(event) {
  this.paggingTT.currentPage = event.page - 1;
  this.getChiTietTTByDm(this.currentdmTieuThucId);
  }

  // Action dmPhanLoaiTieuThuc
  actionDmPhanLoaiTT(task, id = '') {
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
    this.title_model = this.actionName + ' phân loại tiêu thức';
    this.statusOption = task;
    this.tieuThucForm.reset();
    this.tieuThucFormSubmited = false;
    if (task !== 'add') {
      const dm = this.listDmTieuThuc.find(el => {
        return el.id === id;
      });
      this.tieuThucForm.patchValue({
        id: dm.id,
        tenPhanLoai: dm.tenPhanLoai,
        moTa: dm.moTa,
        actived: dm.actived,
        parentId: dm.parentId
      });
    }

    this.modalTieuThuc.show();
  }

  onSubmitActionDmPhanLoaiTT(task) {
    this.formService.touchAllInput(this.tieuThucForm);
    if (this.tieuThucForm.invalid) {
      return;
    }
    const formValue = this.tieuThucForm.value;
    // console.log(formValue, this.tieuThucForm);
    this.tieuThucForm.updateValueAndValidity();
    if (!this.tieuThucForm.valid) {
      this.tieuThucFormSubmited = true;
      return;
    }
    if (formValue.tenPhanLoai.trim() !== '') {
        const formBody: any = {};
        formBody.tenPhanLoai = formValue.tenPhanLoai.trim();
        if(formValue.moTa === null){
          formBody.moTa = "";
        }else{
          formBody.moTa = formValue.moTa.trim();
        }
        formBody.actived = formValue.actived;
        formBody.parentId = formValue.parentId;
        if (task === 'add') {
          formBody.actived = true;
          this.noiDmPhanLoaiTieuThucService.creatDmPhanLoaiTT(formBody)
            .subscribe(res => {
              this._alert.success('Thêm thành công!', { delay: 1000 });
              this.getAllDmPhanLoaiTT();
            }, err => {
            });
        } else if (task === 'delete') {
          //@Todo: delete chitiet - server
          this.noiDmPhanLoaiTieuThucService.deleteDmPhanLoaiTT(formValue.id)
            .subscribe(res => {
              this._alert.success('Xóa thành công!', { delay: 1000 });
              this.currentPage = 0;
              this.getAllDmPhanLoaiTT();
            }, err => {
            });
        }else {
          formBody.id = formValue.id;
          this.noiDmPhanLoaiTieuThucService.updateDmPhanLoaiTT(formBody)
            .subscribe(res => {
              this._alert.success('Cập nhật thành công!', { delay: 1000 });
              this.getAllDmPhanLoaiTT();
            }, err => {
            });
        }
      this.modalTieuThuc.hide();
    }
  }

  bsModalRef: BsModalRef;
  // Action tenChiTietTTByDmPhanLoai
  showChiTietTieuThuc(id) {
    this.getChiTietTTByDm(id);
    this.currentPageTT = 0;
    this.modalChiTietTieuThuc.show();

  }

  actionChiTietTieuThuc(task, id = '') {
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
    this.title_model = this.actionName + ' chi tiết tiêu thức';
    this.statusOption = task;
    
    this.chiTietTieuThucFormSubmited = false;

    if (task !== 'add') {
      const tenTT = this.listChiTietTieuThuc.find(el => {
        return el.id === id;
      });
      this.chiTietTieuThucForm.patchValue({
        id: tenTT.id,
        tenTieuThuc: tenTT.tenTieuThuc, 
        dmChiTietND: tenTT.dmChiTietND || [], 
        actived: tenTT.actived,
        parentId: tenTT.parentId,
        tieuChiTTKT: tenTT.tieuChiTTKT ? tenTT.tieuChiTTKT.id : null
      });
    } else {
      this.chiTietTieuThucForm.patchValue({
        id: '',
        tenTieuThuc: '', 
        dmChiTietND: [], 
        actived: true,
        parentId: '',
        tieuChiTTKT: 1
      });
    }
    this.modalCRUDChiTietTieuThuc.show();
    this.modalChiTietTieuThuc.hide();
  }

  onSubmitActionChiTietTieuThuc(task) {
    const formValue = this.chiTietTieuThucForm.value;
    this.chiTietTieuThucForm.updateValueAndValidity();
    if (!this.chiTietTieuThucForm.valid) {
      this.chiTietTieuThucFormSubmited = true;
      return;
    }
    if (formValue.tenTieuThuc.trim() !== '') {
      if (task === 'delete') {
        this.noiDmPhanLoaiTieuThucService.deleteChiTietTTOfDmPhanLoai(formValue.id)
          .subscribe(res => {
            this.getChiTietTTByDm(this.currentdmTieuThucId);
          }, err => {
          });
      } else {
        const formBody: any = {};
        formBody.tenTieuThuc = formValue.tenTieuThuc.trim();
        formBody.actived = formValue.actived;
        formBody.dmPhanLoaiTtId = this.currentdmTieuThucId;
        formBody.dmChiTietND = formValue.dmChiTietND;
        formBody.tieuChiTTKT = {
          id: formValue.tieuChiTTKT
        };
        // console.log(formValue, formBody);
        if (task === 'add') {
          formBody.actived = true;
          this.noiDmPhanLoaiTieuThucService.creatChiTietTTOfDmPhanLoai(formBody)
            .subscribe(res => {
              this.getChiTietTTByDm(this.currentdmTieuThucId);
            }, err => {
            });
        } else if (task === 'delete') {
          formBody.actived = true;
          this.noiDmPhanLoaiTieuThucService.deleteChiTietTTOfDmPhanLoai(formValue.id)
            .subscribe(res => {
              this.getChiTietTTByDm(this.currentdmTieuThucId);
            }, err => {
            });
        }else {
          formBody.id = formValue.id;
          this.noiDmPhanLoaiTieuThucService.updateChiTietTTOfDmPhanLoai(formBody)
            .subscribe(res => {
              this.getChiTietTTByDm(this.currentdmTieuThucId);
            }, err => {
            });
        }
      }
      this.modalCRUDChiTietTieuThuc.hide();
      this.modalChiTietTieuThuc.show();
    }
  }

  closeCRUDChiTietTieuThuc() {
    this.modalChiTietTieuThuc.show();
    this.modalCRUDChiTietTieuThuc.hide();
  }

  // modalStatus
  showStatusChiTietTieuThuc() {
    this.modalStatusChiTietTieuThuc.show();
    this.modalChiTietTieuThuc.hide();
  }

  closeStatusChiTietTieuThuc() {
    this.modalChiTietTieuThuc.show();
    this.modalStatusChiTietTieuThuc.hide();
  }

  onSubmitStatus() {

  }

  convertToRomanNumber(num: number) {
    return convertToRomanNumber(num);
  }
}
