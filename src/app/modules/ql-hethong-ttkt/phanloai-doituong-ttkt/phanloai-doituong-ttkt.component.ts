import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { concatAll } from 'rxjs/operator/concatAll';
import { NullAstVisitor } from '@angular/compiler';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ISearchLoaiDoiTuong } from '../../../services/api/noi-phanloai-doituong/search-loai-doi-tuong.interface';
import { NoiPhanloaiDoituongService } from '../../../services/api/noi-phanloai-doituong/noi-phanloai-doituong.service';
import { PaginationService } from '../../../services/helper/pagination.service';
import { AuthService } from '../../../auth/auth.service';
import { Pagging } from '../../../shared/models/pagging.model';
import { BsModalService } from 'ngx-bootstrap';
import { AddLoaiDoiTuongComponent } from './add-loai-doi-tuong/add-loai-doi-tuong.component';
@Component({
  selector: 'ttkt-phanloai-doituong-ttkt',
  templateUrl: './phanloai-doituong-ttkt.component.html',
  styleUrls: ['./phanloai-doituong-ttkt.component.scss']
})
export class PhanloaiDoituongTtktComponent implements OnInit {
  listDoiTuong: any[] = [];
  listNhomDV: any[];
  isActiveCheckbox: boolean;
  listSelect: Array<Object> = [];
  isActiveBtn: boolean;
  // listThemMoi: Array<any> = [];
  listHuyen: Array<any> = [];
  listTinh: Array<any> = [];
  tenTinhHuyen: any;
  chuaCoNhom = { id: -1, tenDanhMuc: 'Nhóm đối tượng khác', actived: true };
  isHideTinh: boolean;
  isDisableMaHuyen: boolean;
  searchForm: FormGroup;
  paging: Pagging = new Pagging();

  constructor(
    private noiPhanloaiDoituongService: NoiPhanloaiDoituongService,
    private auth: AuthService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      tenDoiTuong: [],
      maDonVi: [],
      tinhId: [],
      huyenId: [],
      phanLoaiDtId: []
    });

    this.searchForm.get('tinhId').valueChanges.subscribe(vl => {
      this.selectDataTinh(vl);
    })
    console.log(123);
    this.isActiveCheckbox = false;
    this.getNhomDonViInfo();
    if (this.auth.accountType === 'tw') {
      this.isHideTinh = false;
      this.getTinhHuyen(this.auth.currentUser.maTinhHuyen, '', 'tinh');
    } else {
      this.isHideTinh = true;
      this.searchForm.get('tinhId').setValue(this.auth.currentUser.dmTinhHuyenId)
    }
    this.search();
  }

  getNhomDonViInfo() {
    this.noiPhanloaiDoituongService.getNhomDonVi(0, 10).subscribe(
      res => {
        this.listNhomDV = res['content'];
        this.listNhomDV.push(this.chuaCoNhom);
        // tslint:disable-next-line:no-shadowed-variable
        this.listNhomDV.map(resonse => {
          resonse.text = resonse.tenDanhMuc;
        });
      }
    );
  }
  getTinhHuyen(macha, value = null, tinhOrHuyen) {
    console.log(tinhOrHuyen);
    this.noiPhanloaiDoituongService.getTinhHuyen(macha, value, 0, 1000).subscribe(
      res => {
        if (tinhOrHuyen === 'tinh') {
          this.listTinh = res['content'];
          this.listTinh.map(resonse => {
            resonse.text = resonse.tenTinhHuyen;
          });
        } else if (tinhOrHuyen === 'huyen') {
          const listHuyenRes = res['content'];
          this.listHuyen = listHuyenRes.map(response => ({
            id: response.id,
            text: response.tenTinhHuyen
          }) // resonse.text = resonse.tenTinhHuyen;
          );
          console.log(this.listHuyen);
        }
      }
    );
  }

  addPhanLoaiDt() {
    let modal = this.modalService.show(AddLoaiDoiTuongComponent);
    modal.content.eventChange.subscribe(req => {
      // set to table
      this.search();
    });
  }

  editPhanLoaiDt(item: any) {
    let modal = this.modalService.show(AddLoaiDoiTuongComponent);
    modal.content.init(item);
    modal.content.eventChange.subscribe(req => {
      // set to table
      this.search();
    });
  }

  search(page: any = 1) {
    let body = this.searchForm.value;
    body.dmTinhHuyenId = body.huyenId || body.tinhId;
    body.page = page - 1; //index 0
    body.size = this.paging.itemsPerPage;

    this.noiPhanloaiDoituongService.searchByTenDoiTuong(body).subscribe(
      res => {
        this.listDoiTuong = res.content;
        this.paging.totalItems = res.totalElements;
        this.paging.currentPage = page;
      }
    );
  }

  pageChanged(event: any) {
    this.search(event.page);
  }
  selectDataTinh(value: any) {
    this.listHuyen = [];
    console.log(value);
    if (value) {
      this.getTinhHuyen(this.listTinh.find( res => res.id == value).maTinhHuyen, '', 'huyen');
    }
  }

  checkDisableBtn() {
    if (this.listSelect.length > 0) {
      this.isActiveBtn = true;
    } else {
      this.isActiveBtn = false;
    }
  }
  changeCheckboxThemMoi(item) {
    item.active = !item.active;
    if (item.active) {
      item.active = true;
      this.listSelect.push(item);
    } else {
      const index = this.listSelect.findIndex(el => el['id'] === item.id);
      this.listSelect.splice(index, 1);
    }
    this.listSelect = [...this.listSelect];
    this.checkDisableBtn();
  }
  closeDialog(event) {
    if (event) {
      this.search();
    }
  }

}
