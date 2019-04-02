import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { KeHoachToanNganhService } from '../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { AlertService } from '../../../../../../services/api/alert.service';
import { NoiAccountService } from '../../../../../../services/api/noi-account/noi-account.service';
import { COMMON_SUCCESS_MESS } from '../../../../../../constants/message.constants';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-ds-tinh-dieuchinh',
  templateUrl: './ds-tinh-dieuchinh.component.html',
  styleUrls: ['./ds-tinh-dieuchinh.component.scss']
})
export class DsTinhDieuchinhComponent implements OnInit {
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('tuChoiModal') public tuChoiModal: ModalDirective;

  duyetKehoachForm: FormGroup;
  tuChoiKehoachForm: FormGroup;
  formTimKiem: FormGroup;
  public selectYear: string;
  index: number;
  // lyDoTuChoi: string;
  currentYear = (new Date()).getFullYear();
  listTinhThanh: any[] = [];
  dsTinhDieuChinh = [];
  dmbhxhid: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private alertService: AlertService,
    private noiAccountService: NoiAccountService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.dmbhxhid = this.auth.currentUser.donViId;
    if (!this.dmbhxhid) {
      this.noiAccountService.getAcount()
        .subscribe(res => {
          this.dmbhxhid = res.dmTinhHuyenId;
        }, err => { });
    }
    this.duyetKehoachForm = this.fb.group({
      id: ['']
    });
    this.tuChoiKehoachForm = this.fb.group({
      id: [''],
      lyDoTuChoi: ['', Validators.required]
    });
    this.formTimKiem = this.fb.group({
      searchKey: ['']
    });
    this.keHoachToanNganhService.getListKHDieuChinhChoDuyet()
      .subscribe(res => {
        this.dsTinhDieuChinh = res;
      }, err => { });
  }

  duyetKH(id) {
    this.duyetModal.show();
    this.index = id;
    this.duyetKehoachForm.patchValue({
      id: id
    });
  }

  duyet() {
    const formValue = this.duyetKehoachForm.value;
    this.keHoachToanNganhService.twDuyetDieuChinhKeHoachTinh([formValue.id])
      .subscribe(res => {
        this.getListKeHoach();
        this.duyetModal.hide();
        this.alertService.success(COMMON_SUCCESS_MESS.DUYET);
        if (this.dsTinhDieuChinh.length === 0) {
          this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn-giao/ke-hoach-da-giao-cho-tinh']);
        }
      }, err => {
        console.log(err);
      });
  }

  tuChoiKH(id) {
    this.tuChoiKehoachForm.reset();
    this.tuChoiModal.show();
    this.index = id;
    this.tuChoiKehoachForm.patchValue({
      id: id
    });
  }

  tuChoi() {
    if (this.tuChoiKehoachForm.invalid) {
      this.alertService.error("Bạn cần nhập lý do từ chối");
      return;
    } else {

      const formValue = this.tuChoiKehoachForm.value;
      const formBody = {
        id: formValue.id,
        lyDoTuChoiKh: formValue.lyDoTuChoi
      };
      this.tuChoiModal.hide();
      this.keHoachToanNganhService.twTuChoiDieuChinhKeHoachTinh(formBody)
        .subscribe(res => {
          this.getListKeHoach();
          this.alertService.success('Từ chối kế hoạch');
        }, err => {
          console.log(err);
        });
    }
  }

  getListKeHoach() {
    this.keHoachToanNganhService.getListKHDieuChinhChoDuyet()
      .subscribe(res => {
        this.dsTinhDieuChinh = res;
      }, err => { });
  }
  getTinhThanh(id) {
    const tt = this.listTinhThanh.find(el => {
      return el.id === id;
    });
    return tt;
  }
  onTimKiem() {
    const result = [];
    const searchKey = this.formTimKiem.value.searchKey.toLowerCase();
    if (searchKey == null || searchKey === '') {
      this.getListKeHoach();
    } else {
      for (const i in this.dsTinhDieuChinh) {
        if (this.dsTinhDieuChinh[i].tenTinhHuyen.toLowerCase().includes(searchKey)) {
          result.push(this.dsTinhDieuChinh[i]);
        }
      }
      this.dsTinhDieuChinh = result;
      // console.log(result);
    }
  }
  detailKehoach(id) {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn-giao/ds-tinh-dieuchinh/chitiet/' + id]);
  }

}
