import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeHoachToanNganhService } from '../../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { PaginationService } from '../../../../../../services/helper/pagination.service';
import { STATUS } from '../../../../../../constants/status.constants';
import { NoiAccountService } from '../../../../../../services/api/noi-account/noi-account.service';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-tuchoi-dieuchinh-khbhxh',
  templateUrl: './tuchoi-dieuchinh-khbhxh.component.html',
  styleUrls: ['./tuchoi-dieuchinh-khbhxh.component.scss']
})
export class TuchoiDieuchinhKhbhxhComponent implements OnInit {

  dskehoach: any[] = [];
  length: any = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  pager: any = {};
  listKhTuchoiDieuChinh: any[] = [];
  dmbhxhid: any;
  account: any = {};
  constructor(
    private router: Router,
    private keHoachToanNganhService: KeHoachToanNganhService,
    private pagination: PaginationService,
    private noiAccountService: NoiAccountService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.account = this.auth.currentUser;
    this.dmbhxhid = this.account.dmTinhHuyenId;
    this.getListKeHoach();
  }
  getListKeHoach() {
    const year = (new Date()).getFullYear();
    const status = STATUS.STATUS_KHDUTHAO_TINH_TW_TU_CHOI_DIEU_CHINH;
    this.keHoachToanNganhService.getListKeHoach(year, status, this.dmbhxhid, this.currentPage, this.pageSize)
      .subscribe(res => {
        this.pager = this.pagination.getPager(this.currentPage, res.size, res.totalPages);
        this.dskehoach = res['content'];
        console.log(res);
        this.length = Object.keys(res).length;
      }, err => {
        console.log(err);
      });
  }

  detailKehoach(id) {
    console.log(id);
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/tinh/kh-bhxh-vn/chitiet/' + id]);
  }

  // onSend() {
  //   this.modal.show();
  // }


  setPage(number) {
    this.currentPage = number;
    this.getListKeHoach();
  }

}
