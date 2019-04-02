///<reference path="../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';
import { DmPhongBanService } from '../../../../services/api/danh-muc/noi-dmPhongBan/dm-phong-ban.service';
import { PaginationService } from '../../../../services/helper/pagination.service';
import { NoiAccountService } from '../../../../services/api/noi-account/noi-account.service';
import { NoiDmbhxhService } from '../../../../services/api/danh-muc/noi-dmbhxh/noi-dmbhxh.service';
import { StatesService } from '../../../../services/api/state.service';
import { Pagging } from '../../../../shared/models/pagging.model';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'ttkt-danhmuc-phong-ban',
  templateUrl: './danhmuc-phong-ban.component.html',
  styleUrls: ['./danhmuc-phong-ban.component.scss']
})
export class DanhmucPhongBanComponent implements OnInit {
  pagging: Pagging = new Pagging();
  @ViewChild('modalDanhmucPhongBan') modalDanhmucPhongBan: ModalDirective;
  addDanhmucPhongBanForm: FormGroup;
  danhmucPhongBanForm: FormGroup;
  actionName: string = '';
  title_model: string = '';
  statusOption: any;
  blur: boolean = false;
  checkValidCoQuan: boolean = false;

  public listCoQuanToChuc: Array<any> = [];

  account: any;
  isSearching: boolean = false;
  searchName: string = '';

  listPhongBan: any[] = [];

  constructor(
    private fb: FormBuilder,
    private noiDmPhongBanService: DmPhongBanService,
    private pagination: PaginationService,
    private noiDmbhxhService: NoiDmbhxhService,
    private noiAccountService: NoiAccountService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 10;

    this.getAll('get');
    this.danhmucPhongBanForm = this.fb.group({
      // tenPhongBan: ['']
    });

    this.account = this.auth.currentUser;

    this.addDanhmucPhongBanForm = this.fb.group({
      id: [''],
      tenPhongBan: ['',[Validators.required,Validators.pattern(/[^-\s]/)]],
      dmbhxhId:['', Validators.required],
    });

    this.noiDmbhxhService.getDmBHXHBymaCha(this.account.maDonVi).subscribe(req => {
        this.listCoQuanToChuc = req;
        
    });
  }

 

  getAll(task: string, name = '', setPage: boolean = false) {
    if (task === 'get' || task === 'delete') {
      if (task === 'delete') {
        if (this.listPhongBan.length === 1) {
          this.pagging.currentPage -= 1;
        }
      }
      this.noiDmPhongBanService.getAllPhongBan(this.pagging.currentPage, this.pagging.itemsPerPage)
        .subscribe(res => {
          // this.isSearching = false;
          this.listPhongBan = res['content'];
           this.pagging.totalItems = res.totalElements;
        }, err => {
        });
    } else if (task === 'search') {
    
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
  actionPhongBan(task, id = '') {
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
    this.title_model = this.actionName + ' danh mục đơn vị';
    this.statusOption = task;
    this.addDanhmucPhongBanForm.reset();
    if (task !== 'add') {

      const phongBan = this.listPhongBan.find(item => item.id === id );

      this.addDanhmucPhongBanForm.patchValue({
        id: phongBan.id,
        tenPhongBan: phongBan.tenPhongBan,
        dmbhxhId: phongBan.dmbhxhId

      });
    }
    this.blur = false;
    this.checkValidCoQuan = false;
    this.modalDanhmucPhongBan.show();
  }

  actionTinhTrang(task, id = '') {
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
    this.title_model = this.actionName + ' danh mục phòng ban';
    this.statusOption = task;
    this.addDanhmucPhongBanForm.reset();
    if (task !== 'add') {
      const phongBan = this.listPhongBan.find(item => item.id === id );
      this.addDanhmucPhongBanForm.patchValue({
        id: phongBan.id,
        tenPhongBan: phongBan.tenPhongBan,
        dmbhxhId:phongBan.dmbhxhId,
      });
    }
    this.blur = false;
    this.checkValidCoQuan = false;
    this.modalDanhmucPhongBan.show();
  }

  onSubmitAction(task) {
    const formValue = this.addDanhmucPhongBanForm.value;
    if (!formValue.tenPhongBan) {
      this.blur = true;
    }
    if (this.addDanhmucPhongBanForm.controls.dmbhxhId.value == null) {
      this.checkValidCoQuan = true;
      return;
    }
    
    if (formValue.tenPhongBan.trim() !== '') {
      if (task === 'delete') {
        this.noiDmPhongBanService.deleteDMPhongBan(formValue.id)
          .subscribe(res => {
            this.getAll('get');
          }, err => {
          });
      } else {
        const formBody: any = {};
        formBody.tenPhongBan = formValue.tenPhongBan.trim();
        formBody.dmbhxhId = formValue.dmbhxhId;
        formBody.id = -1;
        if (task === 'add') {
          this.noiDmPhongBanService.createDMPhongBan(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        } else {
          formBody.id = formValue.id;
          this.noiDmPhongBanService.updateDMPhongBan(formBody)
            .subscribe(res => {
              this.getAll('get');
            }, err => {
            });
        }
      }
    }
    this.checkValidCoQuan = false;
    this.modalDanhmucPhongBan.hide();
  }

  onBlur() {
    this.blur = true;
  }

}
