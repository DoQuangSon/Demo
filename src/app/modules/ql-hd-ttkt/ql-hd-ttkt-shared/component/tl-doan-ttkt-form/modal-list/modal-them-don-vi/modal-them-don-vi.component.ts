import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService, ModalDirective, PageChangedEvent, PaginationComponent} from 'ngx-bootstrap';
import { ThanhlapdoanCommonMethodService } from '../../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-tld-common/thanhlapdoan-common-method.service';
import { FormService } from '../../../../../../../shared/form-module/form.service';
import { AlertService } from '../../../../../../../services/api/alert.service';
import { NoiDmChucDanhService } from '../../../../../../../services/api/danh-muc/noi-dmChucDanh/noi-dm-chucdanh.service';
import { AuthService } from '../../../../../../../auth/auth.service';
import {FormBuilder, FormControl, FormControlDirective, FormGroup, Validators} from '@angular/forms';
import { BaseModal } from '../../../../../../../shared/modal/base-modal';
import { Pagging } from '../../../../../../../shared/models/pagging.model';
import { PhanLoaiDtService } from '../../../../../../../services/api/danh-muc/noi-dmPhanLoaiDt/phan-loai-dt.service';
import { NoiDmTinhHuyenService } from '../../../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { ThanhLapDoanService } from '../../../../../../../services/api/noi-quan-ly-doan-ttkt/noi-thanh-lap-doan/thanh-lap-doan.service';
@Component({
  selector: 'ttkt-modal-them-don-vi',
  templateUrl: './modal-them-don-vi.component.html',
  styleUrls: ['./modal-them-don-vi.component.scss']
})
export class ModalThemDonViComponent extends BaseModal implements OnInit {
  pagging: Pagging = new Pagging();
  formThemDonVi: FormGroup;
  tldoanForm: FormGroup;
  typeAccount: string;
  listDviDoiTuong: Array<any> = [];
  listChecked: Array<any> = [];
  listCheckedTemp: Array<any> = [];

  listQuanHuyen: Array<any> = [];
  listLoaiHinhDonVi: Array<any> = [];
  dsTinh: Array<any> = [];
  disableSearch = false;
  listNDTTDvi: Array<any> = [];
  listNDKTDvi: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private commonMethodTld: ThanhlapdoanCommonMethodService,
    public modalThemDonVi: BsModalRef,
    private modalService: BsModalService,
    private formService: FormService,
    private auth: AuthService,
    private phanLoaiDvi: PhanLoaiDtService,
    private alert: AlertService,
    private dmTinhHuyenService: NoiDmTinhHuyenService,
    private tlDoanService: ThanhLapDoanService
  ) {
    super();
  }

  ngOnInit(): void {
    this.pagging.currentPage = 0;
    this.pagging.itemsPerPage = 8;
    this.typeAccount = this.auth.accountType;
    this.formThemDonVi = this.commonMethodTld.creatFormThemDonVi();
    if (this.typeAccount == 'tw') {
      this.formThemDonVi.get('quanHuyen').valueChanges.subscribe(value => {
          this.pagging.currentPage = 0;
          this.listCheckedTemp = [];
          this.pageControl.setValue(1);
          this.searchDvDoiTuong(value);
      });
      this.dmTinhHuyenService.getDanhSachTinhThanh().subscribe(res => {
        this.dsTinh = res;
        this.formThemDonVi.patchValue({
          phamVi: this.dmTinhHuyenService.getTenPhamVi(this.tldoanForm.value.phamViId, this.dsTinh)
        });
      });
    }
  }

  init(tldForm: FormGroup, loaiHinh: any[], listChecked: any, listDoiTuong: any[], listTinhHuyen?: any) {
    this.tldoanForm = tldForm;

    // @Todo: check dup code
    this.listLoaiHinhDonVi = loaiHinh;
    // duplicate tenDanhMuc after init
    // this.listLoaiHinhDonVi.unshift({
    //   id: '',
    //   tenDanhMuc: 'Chọn loại hình'
    // });
    this.listChecked = listChecked ? listChecked : [];
    if (this.typeAccount != 'tw') {
      if (this.tldoanForm.controls.isTrongKeHoach.value) {
        this.updateValueAndValidity(this.formThemDonVi, 'loaiHinh', null);
        this.disableSearch = true;
      }
      this.listDviDoiTuong = listDoiTuong;      
    }
    if (this.tldoanForm.value.phamViId) {
      this.dmTinhHuyenService.getDsHuyenByTinh(this.tldoanForm.value.phamViId).subscribe(res => {
        this.listQuanHuyen = res;
      });
    }

    const isTrongKeHoach = this.tldoanForm.get('isTrongKeHoach').value;
    if (this.typeAccount !== 'tw' && this.tldoanForm.value.phamViId) {
      this.formThemDonVi.patchValue({
        quanHuyen: this.tldoanForm.value.phamViId
      }, { emitEvent: false });
    }

    if (this.typeAccount != 'tw') {
      this.formThemDonVi.patchValue({
        phamVi: this.dmTinhHuyenService.getTenPhamVi(this.tldoanForm.value.phamViId, listTinhHuyen)
      });
    }

    if (this.typeAccount == 'tw') {
      this.formThemDonVi.patchValue({
        phamVi: this.dmTinhHuyenService.getTenPhamVi(this.tldoanForm.value.phamViId, this.dsTinh)
      });
    }

    if (isTrongKeHoach) {
      this.phanLoaiDvi.getListPhanLoaiDt(0, 100).subscribe(res => {
        this.listLoaiHinhDonVi = res.content;
        console.log('ab', this.listLoaiHinhDonVi);
        this.listLoaiHinhDonVi.unshift({
          id: '',
          tenDanhMuc: 'Chọn loại hình'
        });
      }, err => { });
    }
    if (tldForm.value.listNoiDungTT) {
      this.listNDTTDvi = tldForm.value.listNoiDungTT;
    }
    if (tldForm.value.listNoiDungKT) {
      this.listNDKTDvi = tldForm.value.listNoiDungKT;
    }
  }

  // updatevalidate
  updateValueAndValidity(form: FormGroup, control: string, validators: any) {
    form.controls[control].setValidators(validators);
    form.controls[control].updateValueAndValidity();
  }

  pageControl = new FormControl(1);

  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.searchDvDoiTuong();
  }
  changeLoaiHinh() {
    this.listCheckedTemp = [];
    this.searchDvDoiTuong();
  }

  searchDvDoiTuong(dmTinhHuyenId?: any) {
    const body: any = {};
    const currentAccount = this.auth.currentUser;
    body.tenDoiTuong = this.formThemDonVi.value.searchName;
    body.maDonVi = this.formThemDonVi.value.maDonVi;

    body.page = this.pagging.currentPage;
    body.size = this.pagging.itemsPerPage;
    body.phanLoaiDtId = this.formThemDonVi.value.loaiHinh;

    if (this.typeAccount === 'tw') {
      body.maCha = this.listQuanHuyen[0].maCha;
      console.log(this.listQuanHuyen);
      body.dmTinhHuyenId = dmTinhHuyenId || this.formThemDonVi.value.quanHuyen;
    } else {
      body.maCha = currentAccount.maTinhHuyen;
      body.dmTinhHuyenId = dmTinhHuyenId || this.tldoanForm.value.phamViId;
    }
    console.log(this.formThemDonVi.value, body);

    // body.dmTinhHuyenId = this.auth.currentUser.dmTinhHuyenId;
    this.phanLoaiDvi.searchDtByTen(body).subscribe(res => {
      this.pagging.totalItems = res.totalElements;
      // this.pagging.currentPage = this.pagging.currentPage;
      this.listDviDoiTuong = res.content;
      // this.listDviDoiTuong.map(this.mappingChecked.bind(this));
      for (let item of this.listChecked) {
        for (const index of this.listDviDoiTuong) {
          if (item.maSuDungLaoDong == index.maSuDungLaoDong) {
            this.listDviDoiTuong.splice(this.listDviDoiTuong.indexOf(index), 1);
          }
        }
      }
    });
  }

  mappingChecked(el: any) {
    const checkedItem = this.listChecked.filter(req => req.id == el.id);
    el.active = checkedItem.length > 0;
  }

  checkItem(item: any) {
    item.noiDungTTName = this.formService.joinArray(this.formThemDonVi.value.noiDungTT, 'text', '; ');
    item.noiDungKTName = this.formService.joinArray(this.formThemDonVi.value.noiDungKT, 'text', '; ');
    item.active = !item.active;
    if (item.active) {
      this.listCheckedTemp.push(item);
    } else {
      this.listCheckedTemp = this.listCheckedTemp.filter(req => req.id != item.id);
    }
  }

  saveListDvi() {
    this.formService.touchAllInput(this.formThemDonVi);    
    if (this.formThemDonVi.invalid) {
      this.alert.error('Vui lòng nhập đầy đủ thông tin');
      console.log(this.formService.getErrorList(this.formThemDonVi));
      return;
    }
    if (this.listCheckedTemp.length <= 0) {
      this.alert.error('Vui lòng chọn đơn vị');
      return;
    }

    this.listCheckedTemp.map(item => {
      item.noiDungKT = this.formThemDonVi.value.noiDungKT ? this.formThemDonVi.value.noiDungKT.slice() : [];
      item.noiDungTT = this.formThemDonVi.value.noiDungTT ? this.formThemDonVi.value.noiDungTT.slice() : [];
      item.noiDungTTName = this.formService.joinArray(item.noiDungTT, 'text', '; ');
      item.noiDungKTName = this.formService.joinArray(item.noiDungKT, 'text', '; ');
    });
    this.listChecked.push(...this.listCheckedTemp);
    this.eventChange.next(this.listChecked);
    this.modalThemDonVi.hide();
  }

  // getDataFilterQuyetDinhThanhLapDoan() {
  //   let dataFilterTLDoan: any = {};
  //   dataFilterTLDoan.nam = new Date().getFullYear();
  //   dataFilterTLDoan.dmTinhHuyenId = Number(this.auth.currentUser.dmTinhHuyenId);
  //   dataFilterTLDoan.diaBanId = this.tldoanForm.value.phamViId !== '' ? this.tldoanForm.value.phamViId : null;
  //   // tslint:disable-next-line:no-unused-expression
  //   this.tlDoanService.filterQuyetDinhThanhLapDoan(dataFilterTLDoan).subscribe(
  //     data => {
  //       if (data.listTinhHuyen.length > 0) {
  //         this.dsTinh = data.listTinhHuyen;
  //         // if (this.dataFilterTLDoan.isThanhTra) {
  //         this.listDviDoiTuong = data.doiTuongTTKTTrongKHList;
  //         // this.listDviDoiTuong = [...this.listDviDoiTuong];
  //         this.listDviDoiTuong.map(this.mappingChecked);
  //         // }
  //       } else {
  //         this.dsTinh = [];
  //       }
  //     });
  // }
}
