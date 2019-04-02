import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { NoiDmPhanLoaiTieuThucService } from '../../../../../services/api/danh-muc/noi-dmPhanLoaiTieuThuc/noi-dm-phan-loai-tieu-thuc.service';
import { AlertService } from '../../../../../services/api/alert.service';
import { FormService } from '../../../../../shared/form-module/form.service';
import { Pagging } from '../../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-thuc-hien-ket-luan',
  templateUrl: './thuc-hien-ket-luan.component.html',
  styleUrls: ['./thuc-hien-ket-luan.component.scss']
})
export class ThucHienKetLuanComponent implements OnInit {
  @ViewChild('modalChiTiet') modalChiTiet: ModalDirective;
  @ViewChild('modalThemMoi') modalThemMoi: ModalDirective;
  @ViewChild('modalCRUDChiTietTieuThuc') modalCRUDChiTietTieuThuc: ModalDirective;
  paggingTT: Pagging = new Pagging();
  paggingCT: Pagging = new Pagging();
  pagging: Pagging = new Pagging();

  number: number = 0;
  listChiTietKetLuan: any = [];
  tieuthucKetLuan: any;
  tieuthucKetLuanId: number;

  listChonTieuThuc: any = [];
  tieuThuc: any;

  listTieuThucCon: any = [];

  listTieuThucSubmit: any = [];
  ttKetLuanId: number;

  listChiTiet: any = [];
  chiTietId: number;

  actionName: string;
  title_model: string;
  statusOption: any;
  chiTietTieuThucForm: FormGroup;
  chiTietTieuThucFormSubmited: boolean = false;

  listTtDaChon: any = [];
  constructor(
    private fb: FormBuilder,
    private noiDmPhanLoaiTieuThucService: NoiDmPhanLoaiTieuThucService,
    public _alert: AlertService,
    private formService: FormService
  ) { }

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 5;

    this.paggingCT.currentPage = 0;
    this.paggingCT.itemsPerPage = 5;

    this.paggingTT.currentPage = 0;
    this.paggingTT.itemsPerPage = 5;

    this.getKetLuan();
    this.getListTieuThuc();
    this.chiTietTieuThucForm = this.fb.group({
      id: [''],
      tenTieuThuc: ['', Validators.required],
      actived: ['']
    });
  }


  getChiTietTTKetLuan(dmPhanLoaiTieuThucId) {
    this.noiDmPhanLoaiTieuThucService.getChiTietTTKetLuan(dmPhanLoaiTieuThucId, this.pagging.currentPage, this.pagging.itemsPerPage)
      .subscribe(res => {
      
        this.listChiTietKetLuan = res['content'];
        this.pagging.totalItems = res.totalElements;
      }, err => {
      });
  }


	pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.getChiTietTTKetLuan(this.tieuthucKetLuan.id);
  }

  getKetLuan() {
    this.noiDmPhanLoaiTieuThucService.getKetLuan('ketluan').subscribe(
      res => {
        this.tieuthucKetLuan = res;
        this.getChiTietTTKetLuan(this.tieuthucKetLuan.id);
      }, err => {
      });
  }

  getListTieuThucDaChon(tieuThucId) {
    this.noiDmPhanLoaiTieuThucService.getListDmTieuThuc().subscribe(
      res => {
        this.listTtDaChon = res;
        console.log('daChon', this.listTtDaChon);
      }
    );
  }

  showThemMoiTieuThuc() {
    this.modalChiTiet.hide();
    this.ttKetLuanId = this.chiTietId;
    this.getListTieuThucDaChon(this.chiTietId);
    this.modalThemMoi.show();
  }

  closeThemMoiTieuThuc() {
    this.modalThemMoi.hide();
    this.tieuThuc = '';
    this.listTieuThucCon = [];
    this.listTieuThucSubmit = [];
    this.modalChiTiet.show();
    this.getList(this.chiTietId);
  }

  searchTieuThuc(event) {
    this.tieuThuc = event;
    this.getListTieuThucCon(this.tieuThuc.id);
  }

  getListTieuThuc() {
    this.noiDmPhanLoaiTieuThucService.getDmPhanLoaiTT(0, 100)
      .subscribe(res => {
        // res.content = res.content.filter( response => response.isKetLuan !== 'ketluan');
        this.listChonTieuThuc = res.content;
        this.listChonTieuThuc.map(resonse => {
          resonse.text = resonse.tenPhanLoai;
        });
      }, err => {
      });
  }

  getListTieuThucCon(dmPhanLoaiTieuThucId) {
    this.noiDmPhanLoaiTieuThucService.getChiTietTTKetLuan(dmPhanLoaiTieuThucId, this.paggingTT.currentPage, this.paggingTT.itemsPerPage)
      .subscribe(res => {
        this.listTieuThucCon = res.content.filter(element => {
          const temp: any[] = this.listTtDaChon.filter(req => req.id === element.id);
          if (temp.length > 0) {
            return false;
          }
          return true;
        });
        this.paggingTT.totalItems = this.listTieuThucCon.length;

      }, err => {
      });
  }

  pageChangedTT(event) {
    this.paggingTT.currentPage = event.page - 1;
    this.getListTieuThucCon(this.tieuThuc.id);
  }

  changeCheckBox(id: number, event) {
    const ttkl = {
      ttKetLuanId: this.ttKetLuanId,
      dmTieuThucId: id
    };
    if (event.target.checked === true) {
      this.listTieuThucSubmit.push(ttkl);
    } else {
      const indexTT = this.listTieuThucSubmit.findIndex(a => JSON.stringify(a) === JSON.stringify(ttkl));
      this.listTieuThucSubmit.splice(indexTT, 1);
    }
  }

  onSubmitAction() {
    this.noiDmPhanLoaiTieuThucService.saveListChiTietTTKetLuan(this.listTieuThucSubmit)
      .subscribe(res => {
      }, err => {
      });
    this.closeThemMoiTieuThuc();
    this.showChiTietTieuThuc(this.chiTietId);
  }

  getList(ccId, callback?: (data) => void) {

    this.noiDmPhanLoaiTieuThucService.getChiTiet(ccId, this.paggingCT.currentPage, this.paggingCT.itemsPerPage)
      .subscribe(res => {
        this.listChiTiet = res['content'];
        console.log(res);
        this.paggingCT.totalItems = res.totalElements;
        if (callback) {
          callback(res);
        }
      }, err => {
      });
  }

 
  pageChangedCT(event) {
    this.paggingCT.currentPage = event.page - 1;
    this.getList(this.chiTietId);
  }

  showChiTietTieuThuc(id) {
    this.chiTietId = id;
    this.modalChiTiet.show();
    this.getList(id);
  }

  closeChiTietTieuThuc() {
    this.modalChiTiet.hide();
  }

  removeTieuThuc(id) {
    this.noiDmPhanLoaiTieuThucService.removeChiTiet(this.chiTietId, id)
      .subscribe(res => {
        this.getList(this.chiTietId, (data) => {
          if (data.content.length === 0) {
            this.paggingCT.currentPage = this.paggingCT.currentPage - 1;
            if (this.paggingCT.currentPage < 0) {
              this.paggingCT.currentPage = 0;
            }
            this.getList(this.chiTietId);
          }
        });
      }, err => {
      });
  }

  actionChiTietTieuThuc(task, id = '') {
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
    this.title_model = this.actionName + ' chi tiết tiêu thức';
    this.statusOption = task;
    this.chiTietTieuThucForm.reset();
    this.chiTietTieuThucFormSubmited = false;
    if (task !== 'add') {
      const tenTT = this.listChiTietKetLuan.find(el => {
        return el.id === id;
      });
      this.chiTietTieuThucForm.patchValue({
        id: tenTT.id,
        tenTieuThuc: tenTT.tenTieuThuc,
        actived: tenTT.actived
      });
    }
    this.modalCRUDChiTietTieuThuc.show();
    this.modalChiTiet.hide();
  }

  onSubmitActionChiTietTieuThuc(task) {
    this.formService.touchAllInput(this.chiTietTieuThucForm);
    if (this.chiTietTieuThucForm.invalid) {
      return;
    }
    
    const formValue = this.chiTietTieuThucForm.value;
    this.chiTietTieuThucForm.updateValueAndValidity();
    if (!this.chiTietTieuThucForm.valid) {
      this.chiTietTieuThucFormSubmited = true;
      return;
    }
    if (formValue.tenTieuThuc.trim() !== '') {
      if (task === 'deactive') {
        this.noiDmPhanLoaiTieuThucService.deactiveChiTietTTOfDmPhanLoai(formValue.id)
          .subscribe(res => {
            this.getChiTietTTKetLuan(this.tieuthucKetLuan.id);
          }, err => {
          });
      } else if (task === 'active') {
        this.noiDmPhanLoaiTieuThucService.activeChiTietTTOfDmPhanLoai(formValue.id)
          .subscribe(res => {
            this.getChiTietTTKetLuan(this.tieuthucKetLuan.id);
          }, err => {
          });
        this.getChiTietTTKetLuan(this.tieuthucKetLuan.id);
      } else {
        const formBody: any = {};
        formBody.tenTieuThuc = formValue.tenTieuThuc.trim();
        formBody.actived = formValue.actived;
        formBody.dmPhanLoaiTtId = this.tieuthucKetLuan.id;
        if (task === 'add') {
          formBody.actived = true;
          this.noiDmPhanLoaiTieuThucService.creatChiTietTTOfDmPhanLoai(formBody)
            .subscribe(res => {
              this._alert.success('Thêm thành công!', { delay: 1000 });
              this.getChiTietTTKetLuan(this.tieuthucKetLuan.id);
            }, err => {
            });
        } else if (task === 'delete') {
          this.noiDmPhanLoaiTieuThucService.deleteChiTietTTOfDmPhanLoai(formValue.id)
            .subscribe(res =>{
              this._alert.success('Xóa thành công!', { delay: 1000 });
              this.paggingTT.currentPage = 0;
              this.getChiTietTTKetLuan(this.tieuthucKetLuan.id);
            }
            , err => {
            });
        }else {
          formBody.id = formValue.id;
          this.noiDmPhanLoaiTieuThucService.updateChiTietTTOfDmPhanLoai(formBody)
            .subscribe(res => {
              this._alert.success('Cập nhật thành công!', { delay: 1000 });
              this.getChiTietTTKetLuan(this.tieuthucKetLuan.id);
              
            }, err => {
            });
        }
      }
      this.modalCRUDChiTietTieuThuc.hide();
    }
  }
  closeCRUDChiTietTieuThuc() {
    this.modalCRUDChiTietTieuThuc.hide();
  }
}
