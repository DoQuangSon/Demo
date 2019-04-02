import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '../../../../../../../node_modules/@angular/forms';
import { NoiKehoachDuthaoService } from '../../../../../services/api/noi-kehoach-duthao/noi-kehoach-duthao.service';
import { TRANG_THAI_KH } from '../../../../../constants/ke-hoach-ttkt.constants';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-kh-bhxh-vn-tinh',
  templateUrl: './kh-bhxh-vn-tinh.component.html',
  styleUrls: ['./kh-bhxh-vn-tinh.component.scss']
})
export class KhBhxhVnTinhComponent implements OnInit {
  dskehoach: any[] = [];
  dskhdieuchinh: any;
  length: any = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  pager: any = {};
  listKhTuchoiDieuChinh: any[] = [];
  dmbhxhid: any;
  account: any = {};
  listYear: any[] = [];
  selectYear: FormControl = new FormControl('');
  currentYear = (new Date()).getFullYear();
  ALLYEAR: string = 'ALLYEAR';
  constructor(
    private router: Router,
    private noiKehoachDuthaoService: NoiKehoachDuthaoService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.account= this.auth.currentUser;
    this.getListKeHoach();
    this.getListKeHoachDieuChinh();
    this.getListYear();
  }

  getListKeHoach() {
    this.noiKehoachDuthaoService.getKeHoachTWGiao(this.account.dmTinhHuyenId, 0, 10)
      .subscribe(res => {
        this.dskehoach = res['content'];
      }, err => { });
  }
  // TODO

  getListKeHoachDieuChinh() {
    this.noiKehoachDuthaoService.getKHTinh(this.account.dmTinhHuyenId)
      .subscribe(res => {
        this.dskhdieuchinh = res;
      }, err => { });
  }

  detailKehoach(id) {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-vn/chitiet/' + id]);
  }

  setPage(number) {
    this.currentPage = number;
    this.getListKeHoach();
  }
  getStatus(code) {
    const status = TRANG_THAI_KH.find(el => {
      return el.code === code;
    });
    return status;
  }
  getListYear() {
    for (let i = -3; i < 20; i++) {
      const year = this.currentYear.valueOf() + i;
      this.listYear.push(year);
    }
  }
  searchKHTinh() {
    if (this.selectYear.value === this.ALLYEAR) {
      this.noiKehoachDuthaoService.searchKHAllTinhAllYear(this.account.dmTinhHuyenId).subscribe(
        res => {
            this.dskhdieuchinh = res;
        }, err => {}
      );
    } else {
      this.noiKehoachDuthaoService.searchKHTinh(this.account.dmTinhHuyenId, this.selectYear.value).subscribe(
      res => {
        this.dskhdieuchinh = res;
      }, err => { });
    }
  }
  changeYear() {
    this.searchKHTinh();
  }
}
